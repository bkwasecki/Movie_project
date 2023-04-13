import React from "react";
import { Link } from "react-router-dom";
const Error = () => {
    return (
        <div className="error-container">
            <div className="div-middle">
            <h1>Something went wrong. Please go back to our main page!</h1>
            
            </div>
            <p className="div-middle">
                <Link to="/" className="btn">
                    back home
                </Link>
            </p>
        </div>
    )

}

export default Error;