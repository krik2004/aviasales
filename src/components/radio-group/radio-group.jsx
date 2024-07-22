import React, { useState } from 'react'
import styles from './radio-group.module.css'

const RadioGroup = () => {
  const [size, setSize] = useState('small')

  const onChange = (e) => {
    setSize(e.target.value)
  }

  return (
    <div className={styles['radio-container']}>
      <input className={styles.radio} type="radio" name="browser" value="ie" id="ie" />
      <label className={`${styles['radio-label']} ${styles['radio-label-left']}`} htmlFor="ie">
        <span className="radio-title">Самый дешевый</span>
      </label>
      <input className={styles.radio} type="radio" name="browser" value="opera" id="opera" />
      <label className={`${styles['radio-label']} ${styles['radio-label-center']}`} htmlFor="opera">
        <span className="radio-title">Самый быстрый</span>
      </label>
      <input className={styles.radio} type="radio" name="browser" value="firefox" id="firefox" />
      <label className={`${styles['radio-label']} ${styles['radio-label-right']}`} htmlFor="firefox">
        <span className="radio-title">Оптимальный</span>
      </label>
    </div>
  )
}

export default RadioGroup
