import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import style from './NavBar.module.css';

const NavBar = () => {
  return (
    <div className={style.NavBarCont}>
      <div className={style.NavBarImgCont}>
        <Link to={"/"}>
          <img
            src="https://as2.ftcdn.net/v2/jpg/06/20/60/07/1000_F_620600766_pga5MnvdbG5SHjeqcPqJD67zsrAZBgV9.webp"
            alt=""
          />
        </Link>
      </div>
      <div className={style.NavBarLinkCont}>
        <Link to="/home" className={style.NavBarLink}>
          Home
        </Link>
        <Link to="/form" className={style.NavBarLink}>
          Form
        </Link>
      </div>
      <div className={style.NavBarSearchCont}>
        <SearchBar />
      </div>
    </div>
  );
};

export default NavBar;
