import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {SiYoutubegaming} from 'react-icons/si'
import {Link} from 'react-router-dom'
import SavedContext from '../../context/SavedContext'
import Header from '../Header'
import SideNav from '../SideNav'
import './index.css'

class Gaming extends Component {
  state = {apiStatus: 'initial', videosList: []}

  componentDidMount = () => {
    this.getVideoList()
  }

  getVideoList = async () => {
    this.setState({apiStatus: 'loader'})
    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/videos/gaming'
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
        viewCount: each.view_count,
      }))
      this.setState({videosList: updatedData, apiStatus: 'success'})
    } else {
      this.setState({apiStatus: 'failure'})
    }
  }

  renderLoaderView = () => (
    <div className="trending-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#212121" height="50" width="50" />
    </div>
  )

  renderSuccessView = isLightMode => {
    const {videosList} = this.state
    const fireIcon = isLightMode ? 'game-icon' : 'game-icon dark-game'
    const gamingHeading = isLightMode
      ? 'gaming-heading'
      : 'gaming-heading dark-gaming-heading'
    const aboutGaming = isLightMode
      ? 'about-gaming-thumbnail'
      : 'about-gaming-thumbnail dark-gaming-thumbnail'
    return (
      <div data-testid="gaming">
        <div className="heading-container">
          <div className={fireIcon}>
            <SiYoutubegaming size="25" color="#ff0000" />
          </div>
          <h1 className={gamingHeading}> Gaming </h1>
        </div>
        <ul className="gaming-list-container">
          {videosList.map(each => (
            <li className="gaming-product-container" key={each.id}>
              <Link className="gaming-link-item" to={`/videos/${each.id}`}>
                <img
                  src={each.thumbnailUrl}
                  className="gaming-image"
                  alt="video thumbnail"
                />
                <p className={aboutGaming}>{each.title}</p>
                <p className="publish">{each.viewCount} Watching Worldwide</p>
              </Link>
            </li>
          ))}
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
        className="failure view"
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
            ? 'trending-container'
            : 'trending-container dark-trending'

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

export default Gaming
