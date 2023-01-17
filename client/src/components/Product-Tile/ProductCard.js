import './ProductCard.css'
import {Link} from 'react-router-dom'



const ProductTile = (props) => {

    const {product} = props


    return (
        <div class="product-tile-container">
            <div class="product-tile-card">
                <img
                    class="product-tile-image"
                    src={product.mainImage} 
                    onError={event => {
                        event.target.src = "https://images.unsplash.com/photo-1569350080887-dd38c27caad0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fHdhbGx8ZW58MHx8MHx8&auto=format&fit=crop&w=1000&q=60"
                        event.onerror = null
                    }}
                    alt='product'>
                </img>
                
                <div class="product-tile-text">
                    <div class="card--title">
                    {product.title}
                    <p className='sku'>SKU: {product._id}</p>
                    <div className='etsy'>Active On Etsy?
                    {product.status === 'Yes' &&
                    <p className='active'> {product.status}</p>
                    }
                    {product.status === 'No' &&
                    <p className='inactive'> {product.status}</p>
                    }
                    </div>
                    </div>
                    <div className='card-ingredients-container'>
                        <span className='ingredients-span'>Where we buy the item </span>
                        <hr></hr>
                        <a href={product.purchaseLink} target="_blank" rel="noreferrer" className='card-buy-link'>{product.purchaseLink}</a>
                    </div>
                    <div class="card--sub">
                        <span className='directions-span'>Where we sell the item</span> 
                        <hr></hr>
                        <a href={product.sellLink} target="_blank" rel="noreferrer" className='card-buy-link'>{product.sellLink}</a>
                    </div>
                    <Link to={`/product/${product._id}`} className='view-item'>View Item</Link>
                </div>
            </div>
        </div>
    )
}

export default ProductTile