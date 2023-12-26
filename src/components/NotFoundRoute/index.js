import SavedContext from '../../context/SavedContext'
import Header from '../Header'
import SideNav from '../SideNav'

const NotFoundRoute = () => {
  const renderFailureView = notFoundImage => (
    <div className="no-result-container">
      <img src={notFoundImage} alt="not found" className="no-videos" />
      <h1 className="no-result-heading">Page Not Found</h1>
      <p className="no-result-desc">
        we are sorry, the page you requested could not be found.
      </p>
    </div>
  )

  return (
    <SavedContext.Consumer>
      {value => {
        const {isLightMode} = value
        const trendingContainer = isLightMode
          ? 'trending-container'
          : 'trending-container dark-trending'
        const notFoundImage = !isLightMode
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
        return (
          <div className="home-route-container">
            <Header />
            <div className="body-container">
              <SideNav />
              <div className={trendingContainer}>
                {renderFailureView(notFoundImage)}
              </div>
            </div>
          </div>
        )
      }}
    </SavedContext.Consumer>
  )
}

export default NotFoundRoute
