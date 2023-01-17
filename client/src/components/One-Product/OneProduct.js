import Nav from '../Nav/Nav'
import './OneProduct.css'
import axios from "axios";
import { useNavigate, useParams,Link } from "react-router-dom";
import React, { useEffect, useState} from "react";

const RecipeCard = (props) => {

    const { id } = useParams();

    const [product, setProduct] = useState([]);
    const [notFoundError, setNotFoundError] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/product/${id}`, {
            withCredentials: true,
            })
            .then((res) => {
            console.log(res);
            setProduct(res.data);
            })
            .catch((err) => {
            console.log(err);
            setNotFoundError("The product you are looking for does not exist.");
            });
        }, [id]);
   

        const handleDelete = () =>{
            axios.delete(`http://localhost:8000/api/delete/${id}`)
            .then((res)=>{
                navigate('/')
                console.log(`Deleted ${product.title} from DB`)
            }).catch((err)=>{
                console.log(`Unable to delete ${product.title}`)
                console.log(err)
            })
        }

        var gross = product.retailPrice - product.cost 

    return (
        <div className='bg'>
            <Nav></Nav>
            {/* Overall Container  */}
            {notFoundError?
            <div className='not-found'>
                <p>A product with that ID was not found.</p>
            </div>
            :
            <>
            <div class="container">
                <div class="row">
                    <div class="col one">
                    <p>Product Name:</p>
                     <h2>{product.title}</h2>
                     <p>Sku:</p>
                     <h3>{product._id}</h3>
                     <p>Purchase Link:</p>
                     <a href={product.purchaseLink} target="_blank" rel='noreferrer'>{product.purchaseLink}</a>
                     <p>Sell Link:</p>
                     <a href={product.sellLink} target="_blank" rel='noreferrer'>{product.sellLink}</a>
                    </div>
                    <div class="col-6 two">
                        <img src={product.mainImage}
                            className='two-image'
                            onError={event => {
                                event.target.src = "https://images.unsplash.com/photo-1569350080887-dd38c27caad0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fHdhbGx8ZW58MHx8MHx8&auto=format&fit=crop&w=1000&q=60"
                                event.onerror = null
                            }}
                            alt='main' >
                        </img>
                    </div>
                    <div class="col col-lg-2 three" id='cost-container'>
                    <p>Product Cost:</p>
                     <h2>${product.cost}</h2>
                    <p>Retail Price:</p>
                     <h2>${product.retailPrice}</h2>
                     <p>Gross Profit:</p>
                     <h2>${gross}</h2>
                     <Link className='link' to={`/edit/${product._id}`}>Edit Product</Link>
                     <button className='btn btn-danger delete' onClick={handleDelete}>Delete Product</button>
                    </div>
                </div>
            </div>
            </>
            }

        </div>
    )
}

export default RecipeCard