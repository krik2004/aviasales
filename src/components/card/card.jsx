import React from 'react'
import styles from './card.module.css'
import airlineLogo from '../../images/S7 Logo.svg'
import PropTypes from 'prop-types'

const Card = (props) => {
  const { card } = props
  function convertTime(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60) // Получаем полные часы
    const minutes = totalMinutes % 60 // Получаем оставшиеся минуты
    return (
      <span>
        {hours}ч {minutes}м
      </span>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.card__header}>
        <h1 className={styles.card__price}>{card.price} Р</h1>
        <img src={`https://pics.avs.io/55/28/${card.carrier}@2x.png`} alt={card.carrier} />
      </div>
      <div className={styles.card__item}>
        <div className={styles.card__route}>
          <span className={styles.card__textDescription}>
            {card.segments[0].origin} – {card.segments[0].destination}
          </span>
          <span className={styles.card__textValue}>10:45 – 08:00</span>
        </div>
        <div className={styles.card__lenght}>
          <span className={styles.card__textDescription}>В пути</span>
          <span className={styles.card__textValue}>{convertTime(card.segments[0].duration)}</span>
        </div>
        <div className={styles.card__stops}>
          <span className={styles.card__textDescription}>
            {card.segments[0].stops.length === 0
              ? 'Без пересадок'
              : card.segments[0].stops.length === 1
                ? '1 пересадка'
                : `${card.segments[0].stops.length} пересадки`}
          </span>
          <span className={styles.card__textValue}>10:45 – 08:00</span>
        </div>
      </div>
      <div className={styles.card__item}>
        <div className={styles.card__route}>
          <span className={styles.card__textDescription}>
            {card.segments[1].origin} – {card.segments[1].destination}
          </span>
          <span className={styles.card__textValue}>10:45 – 08:00</span>
        </div>
        <div className={styles.card__lenght}>
          <span className={styles.card__textDescription}>В пути</span>
          <span className={styles.card__textValue}>{convertTime(card.segments[1].duration)}</span>
        </div>
        <div className={styles.card__stops}>
          <span className={styles.card__textDescription}>
            {' '}
            {card.segments[1].stops.length === 0
              ? 'Без пересадок'
              : card.segments[1].stops.length === 1
                ? '1 пересадка'
                : `${card.segments[1].stops.length} пересадки`}
          </span>
          <span className={styles.card__textValue}>10:45 – 08:00</span>
        </div>
      </div>
    </div>
  )
}

export default Card

Card.propTypes = {
  card: PropTypes.array,
}
