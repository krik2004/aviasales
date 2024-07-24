import React, { useEffect } from 'react'
import styles from './card-list.module.css'
import { useDispatch, useSelector } from 'react-redux'
//Импортируем хуки `useDispatch` и `useSelector` из библиотеки Redux. `useDispatch` позволяет отправлять действия (actions) в хранилище (store), а `useSelector` позволяет извлекать данные из хранилища.
import Card from '../card/card.jsx'
import { Spin, Alert } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { v4 as uuidv4 } from 'uuid'


const CardList = () => {
  const dispatch = useDispatch()
  const cards = useSelector((state) => state.filter.data.tickets)
  const { status, error } = useSelector((state) => state.filter)

  let content
  if (status === 'loading') {
    content = <Spin indicator={<LoadingOutlined spin />} size="large" />
  } else if (status === 'resolved') {
    content = cards.map((card) => <Card key={uuidv4()} card={card} />)

  } else if (error) {
    content = <Alert message="Error" description={error} type="error" showIcon className={styles['alert-message']} />
  }
  return (
    <div>
      {content}
    </div>
  )
}
export default CardList
