import {Switch, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'
import ProtectedRoute from './components/ProtectedRoute'
import LoginFormRoute from './components/LoginFormRoute'
import VideoItemDetailRoute from './components/VideoItemDetailRoute'
import HomeRoute from './components/HomeRoute'
import GamingRoute from './components/GamingRoute'
import TrendingRoute from './components/TrendingRoute'
import SavedContext from './context/SavedContext'
import SavedVideosRoute from './components/SavedVideosRoute'
import NotFoundRoute from './components/NotFoundRoute'

import './App.css'
// Replace your code here
class App extends Component {
  state = {isLightMode: true, savedList: []}

  changeMode = () => {
    this.setState(prev => ({isLightMode: !prev.isLightMode}))
  }

  addSavedObject = obj => {
    this.setState(prev => ({savedList: [...prev.savedList, obj]}))
  }

  removeSavedObject = obj => {
    const {savedList} = this.state
    const updatedList = savedList.filter(each => each.id !== obj.id)
    this.setState({savedList: updatedList})
  }

  render() {
    const {isLightMode, savedList} = this.state

    return (
      <SavedContext.Provider
        value={{
          isLightMode,
          savedList,
          changeMode: this.changeMode,
          addSavedObject: this.addSavedObject,
          removeSavedObject: this.removeSavedObject,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginFormRoute} />
          <ProtectedRoute exact path="/" component={HomeRoute} />
          <ProtectedRoute exact path="/gaming" component={GamingRoute} />
          <ProtectedRoute exact path="/trending" component={TrendingRoute} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetailRoute}
          />
          <ProtectedRoute
            exact
            path="/saved-videos"
            component={SavedVideosRoute}
          />
          <Route path="/not-found" component={NotFoundRoute} />
          <Redirect to="not-found" />
        </Switch>
      </SavedContext.Provider>
    )
  }
}
export default App
