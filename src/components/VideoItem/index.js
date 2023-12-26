import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
import SavedContext from '../../context/SavedContext'
import './index.css'

const VideoItem = props => {
  const {dataObject} = props
  const {
    thumbnailUrl,
    title,
    profileImageUrl,
    channelName,
    publishedAt,
    viewCount,
    id,
  } = dataObject
  const years = formatDistanceToNow(new Date(publishedAt))
  const index = years.indexOf(' ')
  const year = years.slice(index + 1)
  return (
    <SavedContext.Consumer>
      {value => {
        const {isLightMode} = value
        const aboutThumbnail = isLightMode
          ? 'about-thumbnail'
          : 'about-thumbnail thumbnail-dark'
        return (
          <li className="list-container">
            <Link className="link-item" to={`/videos/${id}`}>
              <img
                src={thumbnailUrl}
                className="thumbnail"
                alt="video thumbnail"
              />
              <div className="thumbnail-container">
                <img
                  src={profileImageUrl}
                  className="video-profile"
                  alt="channel logo"
                />
                <div className="thumbnail-desc">
                  <p className={aboutThumbnail}>{title}</p>
                  <p className="publish">{channelName}</p>
                  <p className="publish">
                    {viewCount}Views . {year} ago
                  </p>
                </div>
              </div>
            </Link>
          </li>
        )
      }}
    </SavedContext.Consumer>
  )
}

export default VideoItem
