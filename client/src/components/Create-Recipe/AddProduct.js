import React, { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Nav from "../Nav/Nav";
import './AddProduct.css'

const AddInventory = () => {


    const {loggedUser} = useContext(UserContext)

    const navigate = useNavigate()

    const [newProduct,setNewProduct] = useState([])
    const [title,setTitle] = useState('')
    const [purchaseLink,setPurchaseLink] = useState('')
    const [sellLink,setSellLink] = useState('')
    const [cost,setCost] = useState('')
    const [retailPrice,setRetailPrice] = useState('')
    const [mainImage,setMainImage] = useState('')
    const [status,setStatus] = useState('')
    const [sku,setSku] = useState('')


    const [errors, setErrors] = useState([])

    const addProduct = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/addProduct', {
            title,
            purchaseLink,
            sellLink,
            cost,
            retailPrice,
            status,
            sku,
            mainImage,
            creatorName:loggedUser.username,
            creator: loggedUser.id
        },{withCredentials:true, credentials:'include'})
        .then(response => {
            console.log(response.data)
            setNewProduct([...newProduct,response.data])
            navigate('/allProducts')
        })
        .catch((err)=>{
            console.log(err)
            setErrors(err.response.data.errors)
        })
    }


  return (
    <>
    <Nav/>
    <div className='row form-container'>
    <div className='col-6 mx-auto'>
        <form className='form-control form' onSubmit={addProduct}>
            <label className='form-label' >Product Title</label>
                <input className='form-control ' placeholder="Product Title" type='text' onChange={(e)=>setTitle(e.target.value)} value={title}></input>
            <label className='form-label'>Link to purchase this item</label>
                <input className='form-control' placeholder="Purchase Link" type='text' onChange={(e)=>setPurchaseLink(e.target.value)} value={purchaseLink}></input>
            <label className='form-label'>Link to etsy listing</label>
                <input className='form-control' placeholder="Sell Link"  onChange={(e) =>setSellLink(e.target.value)} value={sellLink}/>
            <label className='form-label'>Our Cost</label>
            <input className='form-control' placeholder="Our Cost" type="number" onChange={(e) =>setCost(e.target.value)} value={cost}/>
            <label className='form-label'>Retail Price</label>
            <input className='form-control' placeholder="Retail Price" type="number" onChange={(e) =>setRetailPrice(e.target.value)} value={retailPrice}/>
            <label className='form-label'></label>
            {/* <label className='form-label'>SKU</label>
                <input className='form-control' placeholder='Product number' type='text' onChange={(e)=>setSku(e.target.value)} value={sku}></input> */}
            <label className='form-label'>Image</label>
            <input className='form-control' placeholder='copy & paste image address here' type='text' onChange={(e)=>setMainImage(e.target.value)} value={mainImage}></input>
            <label className='form-label'>Etsy Listing Currently Active?</label>
            <select className='form-control selector' onChange={(e) =>setStatus(e.target.value)} value={status}>
                <option value='Yes'>Yes</option>
                <option value='No'>No</option>
            </select>
                    <button className='btn btn-primary mt-5 mb-3' type='submit'>Add Product To Inventory</button>
  
    <div>{errors.title ? <span className='text-danger error' >{errors.title.message}</span> : null}</div>
    <div>{errors.purchaseLink ? <span className='text-danger error' >{errors.purchaseLink.message}</span> : null}</div>
    <div>{errors.sellLink ? <span className='text-danger error' >{errors.sellLink.message}</span> : null}</div>
    <div>{errors.cost ? <span className='text-danger error' >{errors.cost.message}</span> : null}</div>
    <div>{errors.retailPrice ? <span className='text-danger error' >{errors.retailPrice.message}</span> : null}</div>
            </form>
        </div>
    </div>
    </>
  )
}

export default AddInventory