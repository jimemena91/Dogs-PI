import React from 'react';
import { Link } from 'react-router-dom';
import style from './Landing.module.css';

const Landing = () => {
  return (
    <div className={style.landingCont}>
      <div className={style.header}>
        <h1>all YOU need is DOG</h1>
      </div>
      <div className={style.content}>
        <Link to="/home">HOME        
        </Link>
      </div>
    </div>
  );
};

export default Landing;
