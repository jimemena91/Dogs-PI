import React from "react";
import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = ({ id, name, image, weight_min, weight_max, temperaments }) => {
  return (
    <div className={style.cardCont}>
      <div className={style.cardContTitle}>
        <Link to={`/detail/${id}`}>
          <h4>{name}</h4>
        </Link>
      </div>
      <div className={style.cardContInfo}>
        <div className={style.cardImgCont}>
          <img src={image} alt="image dog" />
        </div>
        <h5>Weight_min: {weight_min} </h5>
        <h5>Weight_max: {weight_max} </h5>
        

        <div>
          <h5>Temperaments: </h5>
          <ul>
            {temperaments && temperaments.length > 0 ? (
              temperaments.map((temp, index) => <li key={index}>{temp}</li>)
            ) : (
              <li>No temperaments</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Card;
