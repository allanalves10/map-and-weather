import ReactDOM from 'react-dom/client'
import { App } from './App'
import { MapProvider } from './contexts/mapContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <MapProvider>
    <App />
  </MapProvider>
  // </React.StrictMode>
)
