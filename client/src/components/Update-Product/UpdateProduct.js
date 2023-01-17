import React, { useEffect, useState } from 'react'
import { UserContext } from "../../contexts/UserContext";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Nav/Nav'
import './UpdateProduct.css'

export const UpdateProduct = () => {
    const {id} = useParams()
    const [title,setTitle] = useState('')

    const [purchaseLink,setPurchaseLink] = useState('')
    const [sellLink,setSellLink] = useState('')
    const [cost,setCost] = useState('')
    const [retailPrice,setRetailPrice] = useState('')
    const [mainImage,setMainImage] = useState('')
    const [status,setStatus] = useState('')
    
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/product/${id}`, {withCredentials:true})
        .then(response => {
            console.log(response)
            setTitle(response.data.title)
            setPurchaseLink(response.data.purchaseLink)
            setSellLink(response.data.sellLink)
            setCost(response.data.cost)
            setRetailPrice(response.data.retailPrice)
            setStatus(response.data.status)
            setMainImage(response.data.mainImage)
        })
        .catch(error => {
            console.log(error)
        })
    },[id])

    const updateProduct = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/edit/${id}`, {
            title,
            purchaseLink,
            sellLink,
            cost,
            retailPrice,
            status,
            mainImage
        },{withCredentials:true, credentials:'include'})
        .then(response => {
            console.log(response)
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
    <div className='row form-container bg'>
    <div className='col-6 mx-auto '>
        <form className='form-control form' onSubmit={updateProduct}>
            <label className='form-label' >Product Title</label>
                <input className='form-control ' placeholder="Product Title" type='text' onChange={(e)=>setTitle(e.target.value)} value={title}></input>
            <label className='form-label'>Link to purchase this item</label>
                <input className='form-control' placeholder="Purchase Link" type='text' onChange={(e)=>setPurchaseLink(e.target.value)} value={purchaseLink}></input>
            <label className='form-label'>Link to etsy listing</label>
                <input className='form-control' placeholder="Sell Link"  onChange={(e) =>setSellLink(e.target.value)} value={sellLink}/>
            <label className='form-label'>What we pay for the item</label>
            <input className='form-control' placeholder="Our Cost" onChange={(e) =>setCost(e.target.value)} value={cost}/>
            <label className='form-label'>How much we sell the item for</label>
            <input className='form-control' placeholder="Retail Price" onChange={(e) =>setRetailPrice(e.target.value)} value={retailPrice}/>
            <label className='form-label'></label>
            {/* <label className='form-label'>SKU</label>
                <input className='form-control' placeholder='Product number' type='text' onChange={(e)=>setSku(e.target.value)} value={sku}></input> */}
            <label className='form-label'>Image</label>
            <input className='form-control' placeholder='copy & paste image address here' type='text' onChange={(e)=>setMainImage(e.target.value)} value={mainImage}></input>
            <label className='form-label'>Product Live On Etsy?</label>
            <select className='form-control selector' onChange={(e) =>setStatus(e.target.value)} value={status}>
                <option value='Yes'>Yes</option>
                <option value='No'>No</option>
            </select>
            <button className='btn btn-primary mt-5 mb-3' type='submit'>Update Product</button>
        </form>
    </div>
    <div>{errors.title ? <span className='text-danger error' >{errors.title.message}</span> : null}</div>
    <div>{errors.purchaseLink ? <span className='text-danger error' >{errors.purchaseLink.message}</span> : null}</div>
    <div>{errors.sellLink ? <span className='text-danger error' >{errors.sellLink.message}</span> : null}</div>
    <div>{errors.cost ? <span className='text-danger error' >{errors.cost.message}</span> : null}</div>
    <div>{errors.retailPrice ? <span className='text-danger error' >{errors.retailPrice.message}</span> : null}</div>
    </div>
    </>
    )
}
