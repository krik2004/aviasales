import React from 'react'
import styles from './card-list.module.css'
import { useSelector, useDispatch } from 'react-redux'
import Card from '../card/card.jsx'
import { Spin, Alert } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { v4 as uuidv4 } from 'uuid'
import { selectFilteredCards } from '../redux-toolkit/toolkit-slice.js'
import { Progress } from 'antd'
import { handleShowMore } from '../redux-toolkit/toolkit-slice.js'
import { Button } from 'antd'

const CardList = () => {
  const dispatch = useDispatch()
  const filteredCards = useSelector(selectFilteredCards)
  const { status, error, loadingCount, preError, visibleCount } = useSelector((state) => state.filter)
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
            className={styles['progress-container']}
          />
          {filteredCards.slice(0, visibleCount).map((card) => (
            <Card key={uuidv4()} card={card} />
          ))}
          <Button onClick={() => dispatch(handleShowMore())} type="primary" className={styles['button__show-more']}>
            Показать еще 5 билетов!
          </Button>
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
  } else if (filteredCards.length > 0) {
    content = (
      <div style={{ position: 'relative' }}>
        {filteredCards.slice(0, visibleCount).map((card) => (
          <Card key={uuidv4()} card={card} />
        ))}
        <Button onClick={() => dispatch(handleShowMore())} type="primary" className={styles['button__show-more']}>
          Показать еще 5 билетов!
        </Button>
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
  return <div>{content}</div>
}

export default CardList
