/**
 * Streetmix
 *
 */
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

// Fonts
import '@fontsource-variable/manrope'
import '@fontsource-variable/overpass'
import '@fontsource-variable/rubik'
import '@fontsource-variable/rubik/wght-italic.css'

// Stylesheets
import 'leaflet/dist/leaflet.css'
import '~/styles/styles.css'

// Redux
import store from '~/src/store'

// Main object
import { initialize } from '~/src/app/initialization'
import App from '~/src/app/App'

// Mount React components
const container = document.getElementById('react-app')
if (!container) throw new Error('no element to mount to')

const root = createRoot(container)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

initialize()
