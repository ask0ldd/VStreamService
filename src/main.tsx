import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import CustomRouter from './components/Router.tsx'
import { Provider } from 'react-redux'
import store from './redux/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <CustomRouter />
    </Provider>
  </React.StrictMode>,
)
