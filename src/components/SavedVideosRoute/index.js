import {Link} from 'react-router-dom'
import {FaFire} from 'react-icons/fa'
import {formatDistanceToNow} from 'date-fns'
import SavedContext from '../../context/SavedContext'
import Header from '../Header'
import SideNav from '../SideNav'

import './index.css'

const SavedVideosRoute = () => {
  const renderSuccessView = () => (
    <SavedContext.Consumer>
      {value => {
        const {isLightMode, savedList} = value
        const videosList = savedList

        const trendHeading = isLightMode
          ? 'trending-heading'
          : 'trending-heading dark-trending-heading'
        const aboutTrending = isLightMode
          ? 'about-trending-thumbnail'
          : 'about-trending-thumbnail dark-about-thumbnail'
        const fireIcon = isLightMode ? 'fire-icon' : 'fire-icon dark-fire'

        return (
          <div data-testid="savedVideos">
            <div className="heading-container">
              <div className={fireIcon}>
                <FaFire size="25" color="#ff0000" />
              </div>
              <h1 className={trendHeading}> Saved Videos </h1>
            </div>
            <ul className="trending-list-container">
              {videosList.map(each => {
                const years = formatDistanceToNow(new Date(each.publishedAt))
                const index = years.indexOf(' ')
                const year = years.slice(index + 1)
                return (
                  <li className="trending-product-container" key={each.id}>
                    <Link
                      className="trending-link-item"
                      to={`/videos/${each.id}`}
                    >
                      <img
                        src={each.thumbnailUrl}
                        className="trending-image"
                        alt="video thumbnail"
                      />
                      <div className="thumbnail-container">
                        <div className="thumbnail-desc">
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
      }}
    </SavedContext.Consumer>
  )

  const renderFailureView = () => (
    <div className="no-result-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
        className="no-videos"
      />
      <h1 className="no-result-heading">No saved videos found</h1>
      <p className="no-result-desc">Save your videos by clicking a button</p>
    </div>
  )

  return (
    <SavedContext.Consumer>
      {value => {
        const {isLightMode, savedList} = value
        const trendingContainer = isLightMode
          ? 'trending-container'
          : 'trending-container dark-trending'

        const savedCount = savedList.length
        const noList = savedCount === 0

        return (
          <div className="home-route-container">
            <Header />
            <div className="body-container">
              <SideNav />
              <div className={trendingContainer}>
                {noList ? renderFailureView() : renderSuccessView()}
              </div>
            </div>
          </div>
        )
      }}
    </SavedContext.Consumer>
  )
}

export default SavedVideosRoute
