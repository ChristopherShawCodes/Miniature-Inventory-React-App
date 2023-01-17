import "./App.css";

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useState, useEffect } from "react";
import { UserContext } from "./contexts/UserContext";
import axios from 'axios'
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from './components/Home/Home'
import Explore from "./components/All-Inventory/Explore";

import AddProduct from "./components/Create-Recipe/AddProduct";

import ProductCard from "./components/One-Product/OneProduct";
import {UpdateProduct}  from "./components/Update-Product/UpdateProduct";
import NotFound from "./components/Not-Found/NotFound";



function App() {
  const [loggedUser, setLoggedUser] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/getLoggedUser", { withCredentials: true })
      .then(
        (res) => (
          console.log("logged user info", res),
          setLoggedUser({
            id: res.data.user._id,
            username: res.data.user.username
          })
        )
      )
      .catch((err) => console.log("logged user error", err));
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{loggedUser, setLoggedUser}}>
      <BrowserRouter>
        <Routes>
          {loggedUser!=null?
          <>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/allProducts' element={<Explore/>} />
            <Route path='/product/:id' element={<ProductCard/>}/>
            <Route path='/addProduct' element={<AddProduct/>}/>
            <Route path='/edit/:id' element={<UpdateProduct/>}/>
            <Route path="*" element={<NotFound/>} />
          </>
          :
          <>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/allProducts' element={<Explore/>} />
            <Route path="*" element={<Navigate replace to='/' />}/>
          </>
          }

        </Routes>
      </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
