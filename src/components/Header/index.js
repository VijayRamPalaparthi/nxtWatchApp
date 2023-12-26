import {Link, withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'
import {IoCloudyNightSharp, IoLogOutOutline, IoMenu} from 'react-icons/io5'
import {MdHighlight} from 'react-icons/md'
import Cookies from 'js-cookie'
import SavedContext from '../../context/SavedContext'

import {PopupButton} from './styledComponents'

import './index.css'

const overlayStyles = {backgroundColor: '#ebebeb50'}

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <SavedContext.Consumer>
      {value => {
        const {isLightMode, changeMode} = value
        const headerInMode = isLightMode
          ? 'header-container'
          : 'header-container dark-header-mode'

        const headerLogout = isLightMode
          ? 'logout-button'
          : 'logout-button dark-logout'
        const logoImage = isLightMode
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

        return (
          <div className={headerInMode}>
            <Link to="/" className="link">
              <img src={logoImage} alt="website logo" className="logo-image" />
            </Link>

            <div className="header">
              <button
                className="mode"
                type="button"
                onClick={changeMode}
                data-testid="theme"
              >
                {isLightMode ? (
                  <IoCloudyNightSharp size="30" />
                ) : (
                  <MdHighlight size="30" color="#ffffff" />
                )}
              </button>

              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
                className="profile-photo"
              />
              <IoMenu size="25" className="menu-icon" />
              <Popup
                modal
                trigger={
                  <div>
                    <button type="submit" className={headerLogout}>
                      Logout
                    </button>
                    <IoLogOutOutline className="menu-icon" size="25" />
                  </div>
                }
                overlayStyle={overlayStyles}
              >
                {close => (
                  <div className="popup-container">
                    <p className="popup-desc">
                      {' '}
                      Are you sure, you want to logout
                    </p>
                    <div className="popup-button-container">
                      <PopupButton outline onClick={close}>
                        Cancel
                      </PopupButton>
                      <PopupButton onClick={onClickLogout}>Confirm</PopupButton>
                    </div>
                  </div>
                )}
              </Popup>
            </div>
          </div>
        )
      }}
    </SavedContext.Consumer>
  )
}
export default withRouter(Header)
