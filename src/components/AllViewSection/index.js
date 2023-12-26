import {Component} from 'react'
import Cookies from 'js-cookie'
import {IoIosClose, IoIosSearch} from 'react-icons/io'
import Loader from 'react-loader-spinner'
import VideoItem from '../VideoItem'
import SavedContext from '../../context/SavedContext'
import './index.css'

class AllViewSection extends Component {
  state = {apiStatus: 'initial', showAdd: false, search: '', videosList: []}

  componentDidMount = () => {
    this.getVideoList()
  }

  getVideoList = async () => {
    this.setState({apiStatus: 'loader'})
    const {search} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/videos/all?search=${search}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.videos.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        channelName: each.channel.name,
        profileImageUrl: each.channel.profile_image_url,
        viewCount: each.view_count,
        publishedAt: each.published_at,
      }))
      this.setState({videosList: updatedData, apiStatus: 'success'})
    } else {
      this.setState({apiStatus: 'failure'})
    }
  }

  removeAdd = () => {
    this.setState({showAdd: true})
  }

  renderAdd = () => {
    const {showAdd} = this.state

    if (showAdd === false) {
      return (
        <div className="add-container" data-testid="banner">
          <div className="add-top-section">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="nxt watch logo"
              className="logo-image"
            />
            <button
              type="button"
              className="close-button"
              onClick={this.removeAdd}
              data-testid="close"
            >
              {}
              <IoIosClose size="25" />
            </button>
          </div>
          <p className="add-heading">
            Buy Nxt Watch Premium prepaid plans with UPI
          </p>
          <button className="add-button" type="button">
            GET IT NOW
          </button>
        </div>
      )
    }
    return null
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#212121" height="50" width="50" />
    </div>
  )

  onChangeSearch = event => {
    this.setState({search: event.target.value})
    if (event.target.value === '') {
      this.setState({search: event.target.value}, this.getVideoList)
    }
  }

  onClickSearch = () => {
    this.getVideoList()
  }

  onClickRetry = () => {
    this.setState({search: ''}, this.getVideoList)
  }

  renderSuccessView = () => {
    const {videosList} = this.state
    const listLength = videosList.length

    if (listLength > 1) {
      return (
        <ul className="success-container">
          {videosList.map(each => (
            <VideoItem key={each.id} dataObject={each} />
          ))}
        </ul>
      )
    }
    return (
      <div className="no-result-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
          className="no-videos"
        />
        <h1 className="no-result-heading">No Search results found</h1>
        <p className="no-result-desc">
          Try different key words or remove search filter
        </p>
        <button
          className="retry-button"
          type="button"
          onClick={this.onClickRetry}
        >
          Retry
        </button>
      </div>
    )
  }

  retry = () => {
    this.getVideoList()
  }

  renderFailureView = () => (
    <div className="no-result-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="no-videos"
      />
      <h1 className="no-result-heading"> Oops! Something went wrong</h1>
      <p className="no-result-desc">
        we are having some trouble to complete your request <br /> Please Try
        Again
      </p>
      <button className="retry-button" type="button" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

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
    const {search} = this.state
    return (
      <SavedContext.Consumer>
        {value => {
          const {isLightMode} = value
          const allViewSection = isLightMode
            ? 'all-view-section'
            : 'all-view-section dark-mode'
          return (
            <div className={allViewSection} data-testid="home">
              {this.renderAdd()}
              <div className="search-container">
                <input
                  type="search"
                  className="search"
                  value={search}
                  placeholder="Search"
                  onChange={this.onChangeSearch}
                />
                <button
                  type="button"
                  className="search-button"
                  onClick={this.onClickSearch}
                  data-testid="searchButton"
                >
                  {}
                  <IoIosSearch size="20" color="#313131" />
                </button>
              </div>
              {this.renderSwitchResult()}
            </div>
          )
        }}
      </SavedContext.Consumer>
    )
  }
}

export default AllViewSection
