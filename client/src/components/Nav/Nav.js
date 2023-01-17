import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { NavLink, useNavigate } from 'react-router-dom';
import './Nav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import logo from './Images/logo.png'
import axios from 'axios'



const Nav = () => {

const { loggedUser, setLoggedUser} = useContext(UserContext);

const navigate = useNavigate()

useEffect(() => {
  axios
    .get("http://localhost:8000/api/getLoggedUser", { withCredentials: true })
    .then(
      (res) => (
        setLoggedUser({
          id: res.data.user._id,
          username: res.data.user.username,
        })
      )
    )
    .catch((err) => console.log(err));
}, []);

  const handleClick = () =>{
    const showBtn = document.querySelector(".btn-bars"),
    closeBtn = document.querySelector(".btn-close"),
    navMenu = document.querySelector(".navbar-collapse");
    showBtn.addEventListener("click", () => {
    navMenu.classList.add("showMenu");
  });
  closeBtn.addEventListener("click", () => {
    navMenu.classList.remove("showMenu");
  });
  }

  const handleLogout = (e) => {
    axios
    .get("http://localhost:8000/api/logout", { withCredentials: true })
    .then((res) => {
      console.log("Logged out on front end");
      setLoggedUser("");
      navigate("/");
    })
    .catch((err) => {
      console.log(err);
    });
  }


  return (
    <div className='nav-bar'>
      <nav className="navbar">
        <button type="button" className="btn-bars" onClick={handleClick}> 
          <span><FontAwesomeIcon icon={faBars}/></span>
        </button>
      <div className="navbar-collapse">
        <span className="btn-close">
          <i className='bx bx-x'></i>
        </span>
        <ul className="navbar-nav">
          <p className="logged-user">{loggedUser.username}</p>
            <li className="nav-item">
              <NavLink to='/' className='nav-link'>Home</NavLink>
            </li>
          <li className="nav-item">
          <NavLink to='/allProducts' className='nav-link'>All Inventory</NavLink>
          </li>
          {loggedUser&&
            <li className="nav-item">
              <NavLink to='/addProduct' className='nav-link'>Add Inventory</NavLink>
            </li>
          }
          {!loggedUser? 
          <li className="nav-item">
            <NavLink to='/login' className='nav-link'>Login</NavLink>
          </li>
          :
          <li className="nav-item">
            <a href="#" onClick={handleLogout} className="nav-link">Log Out</a>
          </li>
          }
        </ul>
      <div className="nav-social-icon">
        <a href="https://www.etsy.com/shop/CozyCottageMiniature?ref=simple-shop-header-name&listing_id=1385277771" target="_blank" rel='noreferrer'><i class='bx bxl-etsy'></i></a>
        <a href="https://www.instagram.com/cozycottageminiatures/"><i class='bx bxl-instagram' target="_blank" rel='noreferrer'></i></a>
        <a href="https://twitter.com/cozycottagemini" target="_blank" rel='noreferrer'><i class='bx bxl-twitter'></i></a>
    </div>
  </div>
  </nav>
    <section className="main">
      <a href="/" className="site-name">
        Cozy Cottage
        <span>Inventory</span>
      </a>
    </section>
    </div>
  )
}

export default Nav