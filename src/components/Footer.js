import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-success text-light py-4 mt-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h5>About Us</h5>
                        <p>Your source for the latest news and updates from around the world.</p>
                    </div>
                    <div className="col-md-6">
                        <h5>Follow Us</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light">
                                    <i className="fab fa-facebook-square"></i> Facebook
                                </a>
                            </li>
                            <li>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-light">
                                    <i className="fab fa-twitter-square"></i> Twitter
                                </a>
                            </li>
                            <li>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light">
                                    <i className="fab fa-instagram-square"></i> Instagram
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="text-center mt-3">
                    <p className="mb-0">© {new Date().getFullYear()} Your News App. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
