import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import { MapProvider } from './contexts/mapContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <MapProvider>
    <App />
  </MapProvider>
  // </React.StrictMode>
)
