import ReactDOM from 'react-dom/client'
import { App } from './App'
import { MapProvider } from './contexts/mapContext'
import { LoaderProvider } from './contexts/loaderContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <LoaderProvider>
    <MapProvider>
      <App />
    </MapProvider>
  </LoaderProvider>
  // </React.StrictMode>
)
