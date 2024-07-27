import React from 'react'
import styles from './card.module.css'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { v4 as uuidv4 } from 'uuid'

const Card = (props) => {
  const { card } = props
  function convertTime(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return (
      <span>
        {hours}ч {minutes}м
      </span>
    )
  }
  function departureTime(departureDate) {
    const date = new Date(departureDate)
    return format(date, 'HH:mm')
  }
  function arrivalTime(departureDate, minutesDuration) {
    const date = new Date(departureDate)
    date.setMinutes(date.getMinutes() + minutesDuration)
    return format(date, 'HH:mm')
  }

  return (
    <div className={styles.container}>
      <div className={styles.card__header}>
        <h1 className={styles.card__price}>{card.price.toLocaleString('ru-RU')} Р</h1>
        <img src={`https://pics.avs.io/55/28/${card.carrier}@2x.png`} alt={card.carrier} />
      </div>

      <div className={styles.card__item}>
        <div className={styles.card__route}>
          <span className={styles.card__textDescription}>
            {card.segments[0].origin} - {card.segments[0].destination} {/* пункт отправления - пункт прибытия  */}
          </span>
          <span className={styles.card__textValue}>
            {departureTime('2024-08-14T14:03:22.902Z')} –{' '}
            {arrivalTime(card.segments[0].date, card.segments[0].duration)} {/* время отправления - время прибытия  */}
          </span>
        </div>
        <div className={styles.card__lenght}>
          <span className={styles.card__textDescription}>В пути</span>
          {/* продолжительность полета  */}
          <span className={styles.card__textValue}>{convertTime(card.segments[0].duration)}</span>{' '}
        </div>
        <div className={styles.card__stops}>
          <span className={styles.card__textDescription}>
            {card.segments[0].stops.length === 0
              ? 'Без пересадок'
              : card.segments[0].stops.length === 1
                ? '1 пересадка'
                : `${card.segments[0].stops.length} пересадки`}
          </span>
          <span className={styles.card__textValue}>
            {/* пункты пересадок  */}
            {card.segments[0].stops.length === 0
              ? '-'
              : card.segments[0].stops.map((stop, index) => (
                  <span key={uuidv4()}>
                    {stop}
                    {index < card.segments[0].stops.length - 1 ? ', ' : ''}
                  </span>
                ))}
          </span>
        </div>
      </div>
      {/* технический долг */}
      <div className={styles.card__item}>
        <div className={styles.card__route}>
          <span className={styles.card__textDescription}>
            {card.segments[1].origin} - {card.segments[1].destination} {/* пункт отправления - пункт прибытия  */}
          </span>
          <span className={styles.card__textValue}>
            {departureTime('2024-08-14T14:03:22.902Z')} –{' '}
            {arrivalTime(card.segments[1].date, card.segments[1].duration)} {/* время отправления - время прибытия  */}
          </span>
        </div>
        <div className={styles.card__lenght}>
          <span className={styles.card__textDescription}>В пути</span>
          {/* продолжительность полета  */}
          <span className={styles.card__textValue}>{convertTime(card.segments[1].duration)}</span>{' '}
        </div>
        <div className={styles.card__stops}>
          <span className={styles.card__textDescription}>
            {card.segments[1].stops.length === 0
              ? 'Без пересадок'
              : card.segments[1].stops.length === 1
                ? '1 пересадка'
                : `${card.segments[1].stops.length} пересадки`}
          </span>
          <span className={styles.card__textValue}>
            {/* пункты пересадок  */}
            {card.segments[1].stops.length === 0
              ? '-'
              : card.segments[1].stops.map((stop, index) => (
                  <span key={uuidv4()}>
                    {stop}
                    {index < card.segments[1].stops.length - 1 ? ', ' : ''}
                  </span>
                ))}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Card

Card.propTypes = {
  card: PropTypes.object,
}
