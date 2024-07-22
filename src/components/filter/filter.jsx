import React from 'react'
import styles from './filter.module.css'

const Filter = () => {
  return (
    <div className={styles.filter__wrapper}>
      <h1 className={styles.filter__title}>Количество пересадок </h1>
      <div className={styles.filter__checkboxContainer}>
        <input type="checkbox" className={styles.filter__checkbox} id="myCheckbox1" />
        <label className={styles.filter__label} htmlFor="myCheckbox">
          Все
        </label>

        <input type="checkbox" className={styles.filter__checkbox} id="myCheckbox2" />
        <label className={styles.filter__label} htmlFor="myCheckbox2">
          Без пересадок
        </label>
        <input type="checkbox" className={styles.filter__checkbox} id="myCheckbox3" />
        <label className={styles.filter__label} htmlFor="myCheckbox3">
          1 пересадка
        </label>
        <input type="checkbox" className={styles.filter__checkbox} id="myCheckbox4" />
        <label className={styles.filter__label} htmlFor="myCheckbox4">
          2 пересадки
        </label>
        <input type="checkbox" className={styles.filter__checkbox} id="myCheckbox5" />
        <label className={styles.filter__label} htmlFor="myCheckbox5">
          3 пересадки
        </label>
      </div>
    </div>
  )
}

export default Filter
