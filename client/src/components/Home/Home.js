
import Nav from "../Nav/Nav"

import './Home.css'

import logo from './Images/logo.png'

const Home = () => {
  

  return (
    <div className="bg">
      <Nav></Nav>
       <img src={logo} alt='logo' className="home-logo"></img>
    </div>
  )
}

export default Home
