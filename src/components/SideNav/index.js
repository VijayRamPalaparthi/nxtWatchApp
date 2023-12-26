import {Link} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {FaFire} from 'react-icons/fa'
import {MdPlaylistAdd} from 'react-icons/md'
import {SiYoutubegaming} from 'react-icons/si'
import SavedContext from '../../context/SavedContext'
import './index.css'

const SideNav = () => (
  <SavedContext.Consumer>
    {value => {
      const {isLightMode} = value
      const navContainer = isLightMode
        ? 'side-nav-container'
        : 'side-nav-container dark-nav'
      const contact = isLightMode ? 'contact' : 'contact dark-contact'
      return (
        <div className={navContainer}>
          <div className="nav-tab-container">
            <Link to="/" className="nav-link">
              <IoMdHome className="icon" size="25" color="#64748b" />
              <h1 className="nav-name"> Home </h1>
            </Link>

            <Link to="/trending" className="nav-link">
              <FaFire className="icon" size="25" color="#64748b" />
              <h1 className="nav-name"> Trending </h1>
            </Link>

            <Link to="/gaming" className="nav-link">
              <SiYoutubegaming className="icon" size="25" color="#64748b" />
              <h1 className="nav-name"> Gaming </h1>
            </Link>

            <Link to="/saved-videos" className="nav-link">
              <MdPlaylistAdd className="icon" size="25" color="#64748b" />
              <h1 className="nav-name"> Saved Videos </h1>
            </Link>
          </div>
          <div className="contact-container">
            <p className={contact}>CONTACT US </p>
            <div className="media-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
                className="media-logo"
              />

              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
                className="media-logo"
              />

              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
                className="media-logo"
              />
            </div>
            <p className={contact}>
              {' '}
              Enjoy! Now to see your channels and recommendations!
            </p>
          </div>
        </div>
      )
    }}
  </SavedContext.Consumer>
)

export default SideNav
