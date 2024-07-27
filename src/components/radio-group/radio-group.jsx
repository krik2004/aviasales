import React from 'react'
import styles from './radio-group.module.css'

import { useSelector, useDispatch } from 'react-redux'
import { setSort } from '../redux-toolkit/toolkit-slice.js'

const RadioGroup = () => {
  const dispatch = useDispatch()
  return (
    <div className={styles['radio-container']}>
      <input
        className={styles.radio}
        type="radio"
        name="radio-filter"
        value="cheapest"
        id="cheapest"
        onChange={(e) => dispatch(setSort(e.target.value))}
      />
      <label className={`${styles['radio-label']} ${styles['radio-label-left']}`} htmlFor="cheapest">
        <span className="radio-title">Самый дешевый</span>
      </label>
      <input
        className={styles.radio}
        type="radio"
        name="radio-filter"
        value="fastest"
        id="fastest"
        onChange={(e) => dispatch(setSort(e.target.value))}
      />
      <label className={`${styles['radio-label']} ${styles['radio-label-center']}`} htmlFor="fastest">
        <span className="radio-title">Самый быстрый</span>
      </label>
      <input
        className={styles.radio}
        type="radio"
        name="radio-filter"
        value="optimal"
        id="optimal"
        onChange={(e) => dispatch(setSort(e.target.value))}
      />
      <label className={`${styles['radio-label']} ${styles['radio-label-right']}`} htmlFor="optimal">
        <span className="radio-title">Оптимальный</span>
      </label>
    </div>
  )
}

export default RadioGroup
