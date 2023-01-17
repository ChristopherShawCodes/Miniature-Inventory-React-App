import React, { useState, useEffect } from "react"
import axios from "axios"
import ProductTile from "../Product-Tile/ProductCard"
import Nav from "../Nav/Nav"
import "./Explore.css"

const Explore = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/allProducts", {
        withCredentials: true,
        credentials: "include",
      })
      .then((res) => {
        console.log(res)
        setProducts(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      <Nav />

      <div className="all-inventory-container">
        <h2 className="all-inventory-title">All Inventory</h2>

        {products.map((product) => (
          <div key={product._id} className='product-wrapper'>
            <ProductTile product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Explore
