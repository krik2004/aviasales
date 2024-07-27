import React from 'react'
import styles from './card-list.module.css'
import { useSelector } from 'react-redux'
import Card from '../card/card.jsx'
import { Spin, Alert } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { v4 as uuidv4 } from 'uuid'
import { selectFilteredCards } from '../redux-toolkit/toolkit-slice.js'
import { Progress } from 'antd'

const CardList = () => {
  const filteredCards = useSelector(selectFilteredCards)
  const { status, error, loadingCount, preError } = useSelector((state) => state.filter)
  let content
  let progressStatus
  if (preError) {
    progressStatus = 'exception'
  } else {
    progressStatus = 'active'
  }
  if (status === 'loading') {
    content = <Spin indicator={<LoadingOutlined spin />} size="large" />
    if (filteredCards.length > 0) {
      content = (
        <div style={{ position: 'relative' }}>
          <Progress
            percent={loadingCount}
            status={progressStatus}
            showInfo={false}
            style={{ position: 'absolute', top: -20, left: 0, width: '100%' }}
          />
          {filteredCards.slice(0, 5).map((card) => (
            <Card key={uuidv4()} card={card} />
          ))}
        </div>
      )
    } else {
      content = (
        <Alert
          message="Информация:"
          description="Рейсов, подходящих под заданные фильтры, не найдено. В следующий раз повезет =)"
          type="info"
          showIcon
          className={styles['alert-message']}
        />
      )
    }
  } else if (error) {
    content = <Alert message="Error" description={error} type="error" showIcon className={styles['alert-message']} />
  } else {
    content = filteredCards.slice(0, 5).map((card) => <Card key={uuidv4()} card={card} />)
  }
  return <div>{content}</div>
}

export default CardList
