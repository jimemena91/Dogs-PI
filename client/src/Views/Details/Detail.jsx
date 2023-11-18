// Detail.jsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDog } from "../../Redux/Actions/actions";
import styles from "./Detail.module.css";

const Detail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const dogDetail = useSelector((state) => state.dogDetail);

  useEffect(() => {
   
    dispatch(getDog(params.id));
  }, [dispatch, params.id]);

  return (
    <div className={styles.detailContainer}>
      <div>
        <h1 className={styles.title}>{dogDetail.name}</h1>
      </div>
      <div>
        <img src={dogDetail.image} alt="imagen" className={styles.dogImage} />
      </div>
      <div className={styles.detailsSection}>
        <div>
          <span className={styles.detailsLabel}>Height Min:</span>
          <p className={styles.detailsValue}>{dogDetail.height_min}</p>
        </div>
        <div>
          <span className={styles.detailsLabel}>Height Max:</span>
          <p className={styles.detailsValue}>{dogDetail.height_max}</p>
        </div>
        <div>
          <span className={styles.detailsLabel}>Weight Min:</span>
          <p className={styles.detailsValue}>{dogDetail.weight_min}</p>
        </div>
        <div>
          <span className={styles.detailsLabel}>Weight Max:</span>
          <p className={styles.detailsValue}>{dogDetail.weight_max}</p>
        </div>
        <div>
          <span className={styles.detailsLabel}>Life Span Min:</span>
          <p className={styles.detailsValue}>{dogDetail.life_span_min}</p>
        </div>
        <div>
          <span className={styles.detailsLabel}>Life Span Max:</span>
          <p className={styles.detailsValue}>{dogDetail.life_span_max}</p>
        </div>
        <div>
  <span className={styles.detailsLabel}>Temperaments:</span>
  <ul className={styles.temperamentList}>
    {dogDetail.temperaments &&
      dogDetail.temperaments.map((temp, index) => (
        <li key={index} className={styles.temperamentItem}>
          {temp}
        </li>
      ))}
  </ul>
</div>
<div>
        <span className={styles.detailsLabel}>createInDb:</span>
        <p className={styles.detailsValue}>{dogDetail.createInDb ? 'True' : 'False'}</p>
      </div>
      </div>
    </div>
  );
};

export default Detail;
