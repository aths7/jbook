import './home-page.css'
import React from 'react';
import { Link } from 'react-router-dom';


const HomePage: React.FC = () => {
    return (
        <div >
            <div className='block'>
                <div className="container has-text-centered m5">
                    <h1 className='title m-5'>Custom Editor</h1>
                </div>
            </div>
            <div className='block'>
                <div className='container has-text-centered'>
                    <p className='m-5'>Try the dynamic editor - use it to test your code or your MD files </p>
                </div>
            </div>
            <div className='block'>
                <div className="container has-text-centered">
                    <Link to="/editor" className="button is-primary is-large">
                        Go to Editor
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default HomePage