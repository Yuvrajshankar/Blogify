import React, { useState } from 'react';
import "./auth.css";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordText = showPassword ? 'Hide' : 'Show';
    const [formData, setFormData] = useState({
        profileImage: '',
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const register = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/auth/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error('Email is already in use.');
            } else {
                console.error('Registration failed:', error.message);
            }
        }
    };

    // Password Toggle
    const handleTogglePassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    // Image
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            setImage(URL.createObjectURL(selectedImage));
            setFormData({ ...formData, profileImage: selectedImage });
        }
    };

    const handleAddPhotoClick = () => {
        document.getElementById('imageInput').click();
    };

    return (
        <div className="registration__container">
            <ToastContainer />
            <div className="item__container">
                <h1>Signup</h1>
                <form onSubmit={register}>

                    <div className="image__container" onClick={handleAddPhotoClick}>
                        {image ? (
                            <img src={image} alt="Selected" className='selectedImage' />
                        ) : (
                            <AddAPhotoIcon className='addimage' />
                        )}
                    </div>

                    <input type="file" id="imageInput" accept='image/*' onChange={handleImageChange} style={{ display: 'none' }} required />
                    <input type="text" className='auth__input' placeholder='User Name' name='name' onChange={handleChange} required />
                    <input type="email" className='auth__input' placeholder='Email' name='email' onChange={handleChange} required />

                    <div className="password-container">
                        <input type={showPassword ? 'text' : 'password'} className="auth__input" placeholder='Password' name='password' onChange={handleChange} required />
                        <span className="toggle-password" onClick={handleTogglePassword}>
                            {togglePasswordText}
                        </span>
                    </div>

                    <button type="submit">Register</button>
                </form>
            </div>

            <p className="transfer">
                Already a user?
                <Link to="/login" style={{ textDecoration: "none", color: "rgb(72, 67, 67)" }}><span> Log in</span></Link>
            </p>
        </div>
    )
}

export default Register;