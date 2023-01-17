import React from 'react'
import Nav from '../Nav/Nav'
import './NotFound.css'

const NotFound = () => {
    return (
        <div> 
            <Nav />
            <div className='not-found'>
                <p>
                    Sorry! The page you are looking for does not exist.
                </p>
                </div>
        </div>
    )
}

export default NotFound