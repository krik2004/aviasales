import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import Header from './components/header/header.jsx'
import Filter from './components/filter/filter.jsx'
import RadioGroup from './components/radio-group/radio-group.jsx'
import CardList from './components/card-list/card-list.jsx'
import styles from './index.module.css'
import { Provider, useDispatch } from 'react-redux'
import store from './components/store.js'
import { fetchApi, fetchID } from './components/redux-toolkit/toolkit-slice.js'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      const id = await dispatch(fetchID()).unwrap()
      dispatch(fetchApi(id))
    }
    fetchData()
  }, [dispatch])

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={`${styles.column} ${styles.leftColumn}`}>
          <Filter />
        </div>
        <div className={`${styles.column} ${styles.rightColumn}`}>
          <RadioGroup />
          <CardList />
        </div>
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
