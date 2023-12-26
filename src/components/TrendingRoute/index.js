import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaFire} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import SavedContext from '../../context/SavedContext'
import Header from '../Header'
import SideNav from '../SideNav'
import './index.css'

class TrendingRoute extends Component {
  state = {apiStatus: 'initial', videosList: []}

  componentDidMount = () => {
    this.getVideoList()
  }

  getVideoList = async () => {
    this.setState({apiStatus: 'loader'})
    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/videos/trending'
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

  renderLoaderView = () => (
    <div className="trending-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#181818" height="50" width="50" />
    </div>
  )

  renderSuccessView = isLightMode => {
    const {videosList} = this.state
    const trendHeading = isLightMode
      ? 'trending-heading'
      : 'trending-heading dark-trending-heading'
    const aboutTrending = isLightMode
      ? 'about-trending-thumbnail'
      : 'about-trending-thumbnail dark-about-thumbnail'
    const fireIcon = isLightMode ? 'fire-icon' : 'fire-icon dark-fire'

    return (
      <div data-testid="trending">
        <div className="heading-container">
          <div className={fireIcon}>
            <FaFire size="25" color="#ff0000" />
          </div>
          <h1 className={trendHeading}> Trending </h1>
        </div>
        <ul className="trending-list-container">
          {videosList.map(each => {
            const years = formatDistanceToNow(new Date(each.publishedAt))
            const index = years.indexOf(' ')
            const year = years.slice(index + 1)
            return (
              <li className="trending-product-container" key={each.id}>
                <Link className="trending-link-item" to={`/videos/${each.id}`}>
                  <img
                    src={each.thumbnailUrl}
                    className="trending-image"
                    alt="video thumbnail"
                  />
                  <div className="thumbnail-container">
                    <div className="thumbnail-desc">
                      <img
                        src={each.profileImageUrl}
                        className="trend-video-profile"
                        alt="channel logo"
                      />
                      <p className={aboutTrending}>{each.title}</p>
                      <p className="publish">{each.channelName}</p>
                      <p className="publish">
                        {each.viewCount}Views . {year} ago
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
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

  renderSwitchResult = isLightMode => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'loader':
        return this.renderLoaderView()
      case 'success':
        return this.renderSuccessView(isLightMode)
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
          const trendingContainer = isLightMode
            ? 'trending-container1'
            : 'trending-container1 dark-trending'
          return (
            <div className="home-route-container">
              <Header />
              <div className="body-container">
                <SideNav />
                <div className={trendingContainer}>
                  {this.renderSwitchResult(isLightMode)}
                </div>
              </div>
            </div>
          )
        }}
      </SavedContext.Consumer>
    )
  }
}

export default TrendingRoute
