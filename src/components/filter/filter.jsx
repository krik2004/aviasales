import React from 'react'
import styles from './filter.module.css'
import { useSelector, useDispatch } from 'react-redux'
import {
  toggleCheckAll,
  toggleCheckNone,
  toggleCheckOneTransfer,
  toggleCheckTwoTransfer,
  toggleCheckThreeTransfers,
} from '../redux-toolkit/toolkit-slice.js'

const Filter = () => {
  const isCheckedAll = useSelector((state) => state.filter.isCheckedAll)
  const isCheckedNone = useSelector((state) => state.filter.isCheckedNone)
  const isCheckedOneTransfer = useSelector((state) => state.filter.isCheckedOneTransfer)
  const isCheckedTwoTransfer = useSelector((state) => state.filter.isCheckedTwoTransfer)
  const isCheckedThreeTransfers = useSelector((state) => state.filter.isCheckedThreeTransfers)

  const dispatch = useDispatch()
  console.log(isCheckedAll)
  return (
    <div className={styles.filter__wrapper}>
      <h1 className={styles.filter__title}>Количество пересадок </h1>

      <div className={styles.filter__checkboxContainer}>
        <input
          type="checkbox"
          className={styles.filter__checkbox}
          id="myCheckbox1"
          // onChange={(e) => console.log(e.target.checked)}
          onChange={(e) => dispatch(toggleCheckAll(e.target.checked))}
          checked={isCheckedAll}
        />
        <label className={styles.filter__label} htmlFor="myCheckbox1">
          Все
        </label>

        <input
          type="checkbox"
          className={styles.filter__checkbox}
          id="myCheckbox2"
          onChange={(e) => dispatch(toggleCheckNone(e.target.checked))}
          checked={isCheckedNone}
        />
        <label className={styles.filter__label} htmlFor="myCheckbox2">
          Без пересадок
        </label>

        <input
          type="checkbox"
          className={styles.filter__checkbox}
          id="myCheckbox3"
          onChange={(e) => dispatch(toggleCheckOneTransfer(e.target.checked))}
          checked={isCheckedOneTransfer}
        />
        <label className={styles.filter__label} htmlFor="myCheckbox3">
          1 пересадка
        </label>

        <input
          type="checkbox"
          className={styles.filter__checkbox}
          id="myCheckbox4"
          onChange={(e) => dispatch(toggleCheckTwoTransfer(e.target.checked))}
          checked={isCheckedTwoTransfer}
        />
        <label className={styles.filter__label} htmlFor="myCheckbox4">
          2 пересадки
        </label>

        <input
          type="checkbox"
          className={styles.filter__checkbox}
          id="myCheckbox5"
          onChange={(e) => dispatch(toggleCheckThreeTransfers(e.target.checked))}
          checked={isCheckedThreeTransfers}
        />
        <label className={styles.filter__label} htmlFor="myCheckbox5">
          3 пересадки
        </label>
      </div>
    </div>
  )
}

export default Filter
