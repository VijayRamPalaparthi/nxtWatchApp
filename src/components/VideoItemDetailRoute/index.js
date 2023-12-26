import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'
import {BiLike, BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'
import SavedContext from '../../context/SavedContext'

import SideNav from '../SideNav'
import Header from '../Header'

import './index.css'

class VideoItemDetailRoute extends Component {
  state = {
    apiStatus: 'initial',
    productDetails: {},
  }

  componentDidMount = () => {
    this.getProductDetails()
  }

  getProductDetails = async () => {
    this.setState({apiStatus: 'loader'})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const vd = data.video_details
    if (response.ok) {
      const updatedData = {
        id: vd.id,
        title: vd.title,
        videoUrl: vd.video_url,
        thumbnailUrl: vd.thumbnail_url,
        channelName: vd.channel.name,
        profileImageUrl: vd.channel.profile_image_url,
        subscriberCount: vd.channel.subscriber_count,
        viewCount: vd.view_count,
        publishedAt: vd.published_at,
        description: vd.description,
        saved: false,
        liked: false,
        disliked: false,
      }
      this.setState({apiStatus: 'success', productDetails: updatedData})
    } else {
      this.setState({apiStatus: 'failure'})
    }
  }

  renderLoaderView = () => (
    <div className="videoDetail-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="no-result-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="no-videos"
      />
      <h1 className="no-result-heading"> Oops! Something went wrong</h1>
      <p className="no-result-desc">
        We are having some trouble to complete your request. Please try again.
      </p>
      <button
        className="retry-button"
        type="button"
        onClick={this.getProductDetails}
      >
        Retry
      </button>
    </div>
  )

  ToggleLike = () => {
    const {productDetails} = this.state
    const {liked} = productDetails
    this.setState({
      productDetails: {...productDetails, liked: !liked, disliked: false},
    })
    // this.setState(prev => ({liked: !prev.liked, disliked: false}))
  }

  ToggleDislike = () => {
    const {productDetails} = this.state
    const {disliked} = productDetails
    this.setState({
      productDetails: {...productDetails, liked: false, disliked: !disliked},
    })
    // this.setState(prev => ({disliked: !prev.disliked, liked: false}))
  }

  ToggleSaved = () => {
    this.setState(prev => ({
      productDetails: {...prev.productDetails, saved: !prev.saved},
    }))
    this.setState(prev => ({
      saved: !prev.saved,
    }))
  }

  updateProductDetails = obj => {
    this.setState({productDetails: obj})
  }

  renderSuccessView = () => {
    const {productDetails} = this.state
    const {
      videoUrl,
      id,
      title,
      publishedAt,
      viewCount,
      profileImageUrl,
      subscriberCount,
      description,
      channelName,
      liked,
      disliked,
    } = productDetails

    const years = formatDistanceToNow(new Date(publishedAt))
    const index = years.indexOf(' ')
    const year = years.slice(index + 1)

    return (
      <SavedContext.Consumer>
        {value => {
          const {
            addSavedObject,
            isLightMode,
            removeSavedObject,
            savedList,
          } = value

          const existed = savedList.find(each => each.id === id)
          let saved = false

          if (existed !== undefined) {
            saved = true
          }

          const like = liked ? 'action-text action-active' : 'action-text'
          const dislike = disliked ? 'action-text action-active' : 'action-text'
          const save = saved ? 'action-text action-active' : 'action-text'

          const likeIcon = liked ? '#2563eb' : '#64748b'
          const dislikeIcon = disliked ? '#2563eb' : '#64748b'
          const saveIcon = saved ? '#2563eb' : '#64748b'

          const savedObject = () => {
            this.ToggleSaved()
            if (saved) {
              removeSavedObject(productDetails)
            } else {
              addSavedObject({...productDetails, saved: true})
            }
          }
          const channel = isLightMode
            ? 'channel-name'
            : 'channel-name dark-channel'
          const vdTitle = isLightMode ? 'vd-title' : 'vd-title dark-vd'

          return (
            <div>
              <ReactPlayer url={videoUrl} width="100%" height="450px" />
              <p className={vdTitle}>{title}</p>
              <div className="vd-info-container">
                <p className="publish">
                  {viewCount}Views . {year} ago
                </p>
                <div className="action-container">
                  <button
                    className="action-button"
                    type="button"
                    onClick={this.ToggleLike}
                  >
                    <BiLike color={likeIcon} size="20" />
                    <p className={like}>Like</p>
                  </button>

                  <button
                    className="action-button"
                    type="button"
                    onClick={this.ToggleDislike}
                  >
                    <BiDislike color={dislikeIcon} size="20" />
                    <p className={dislike}>Dislike</p>
                  </button>

                  <button
                    className="action-button"
                    type="button"
                    onClick={savedObject}
                  >
                    <MdPlaylistAdd color={saveIcon} size="20" />
                    <p className={save}>{saved ? 'Saved' : 'Save'}</p>
                  </button>
                </div>
              </div>
              <hr className="line" />
              <div className="thumbnail-container">
                <img
                  src={profileImageUrl}
                  className="video-profile"
                  alt="channel logo"
                />
                <div className="thumbnail-desc">
                  <p className={channel}>{channelName}</p>
                  <p className="subscriber">{subscriberCount} subscribers</p>
                  <p className={channel}>{description}</p>
                </div>
              </div>
            </div>
          )
        }}
      </SavedContext.Consumer>
    )
  }

  renderSwitchResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'loader':
        return this.renderLoaderView()
      case 'success':
        return this.renderSuccessView()
      case 'failure':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <SavedContext.Consumer>
        {value => {
          const {isLightMode} = value

          const videoContainer = isLightMode
            ? 'video-details-container'
            : 'video-details-container video-dark'

          return (
            <div className="home-route-container">
              <Header />
              <div className="body-container">
                <SideNav />
                <div className={videoContainer} data-testid="videoItemDetails">
                  {this.renderSwitchResult()}
                </div>
              </div>
            </div>
          )
        }}
      </SavedContext.Consumer>
    )
  }
}

export default VideoItemDetailRoute
