import React from "react";
import Card from "../Card/Card";
import style from "./CardsContainer.module.css";

const CardsContainer = ({ allDogs }) => {
  
 
  return (
    <div className={style.cardsContainerCont}>
      {allDogs.map((dog) => (
        <Card
          key={dog.id}
          id={dog.id}
          name={dog.name}
          image={dog.image}
          weight_min={dog.weight_min}
          weight_max={dog.weight_max}
          temperaments={dog.temperaments}
          createInDb={dog.createInDb}
        />
      ))}
    </div>
  );
};

export default CardsContainer;
