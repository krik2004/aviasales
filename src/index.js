import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './components/header/header.jsx'
import Card from './components/card/card.jsx'
import Filter from './components/filter/filter.jsx'
import RadioGroup from './components/radio-group/radio-group.jsx'

import styles from './index.module.css'
import { Radio, Tabs, ConfigProvider } from 'antd'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <div>
    <Header />

    <div className={styles.container}>
      <div className={`${styles.column} ${styles.leftColumn}`}>
        <Filter />
      </div>
      <div className={`${styles.column} ${styles.rightColumn}`}>
        <RadioGroup />
        <Card />
      </div>
    </div>
  </div>
)
