import React from "react";
import styles from "./card.module.css";
import airlineLogo from "../../images/S7 Logo.svg";

const Card = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card__header}>
        <h1 className={styles.card__price}> 13 400р </h1>
        <img src={airlineLogo} alt="Логотип" />
      </div>
      <div className={styles.card__item}>
        <div className={styles.card__route}>
          <span className={styles.card__textDescription}>MOW – HKT</span>
          <span className={styles.card__textValue}>10:45 – 08:00</span>
        </div>
        <div className={styles.card__lenght}>
          <span className={styles.card__textDescription}>MOW – HKT</span>
          <span className={styles.card__textValue}>10:45 – 08:00</span>
        </div>
        <div className={styles.card__stops}>
          <span className={styles.card__textDescription}>MOW – HKT</span>
          <span className={styles.card__textValue}>10:45 – 08:00</span>
        </div>
      </div>
      <div className={styles.card__item}>
        <div className={styles.card__route}>
          <span className={styles.card__textDescription}>MOW – HKT</span>
          <span className={styles.card__textValue}>10:45 – 08:00</span>
        </div>
        <div className={styles.card__lenght}>
          <span className={styles.card__textDescription}>MOW – HKT</span>
          <span className={styles.card__textValue}>10:45 – 08:00</span>
        </div>
        <div className={styles.card__stops}>
          <span className={styles.card__textDescription}>MOW – HKT</span>
          <span className={styles.card__textValue}>10:45 – 08:00</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
