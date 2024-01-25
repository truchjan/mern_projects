import * as ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { AuthContextProvider } from './context/AuthContext'
import { disableReactDevTools} from '@fvilers/disable-react-devtools'

if (process.env.NODE_ENV === 'production') disableReactDevTools()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
)