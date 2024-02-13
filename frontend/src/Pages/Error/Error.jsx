import React from 'react';
import { Link } from 'react-router-dom';

function Error() {
    return (
        <div className="error" >
            <h1>Go Back to
                <Link to="/">
                    Home
                </Link>
            </h1>
        </div>
    )
}

export default Error;