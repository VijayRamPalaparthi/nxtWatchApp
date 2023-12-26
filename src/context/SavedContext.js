import React from 'react'

const SavedContext = React.createContext({
  isLightMode: true,
  changeMode: () => {},
  savedList: [],
  addSavedObject: () => {},
  removeSavedObject: () => {},
})

export default SavedContext
