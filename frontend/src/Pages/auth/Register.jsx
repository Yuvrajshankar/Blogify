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

    const handleAddPhotoClick = () => {
        document.getElementById('imageInput').click();
    };

    const handleChange = async (e) => {
        if (e.target.name === 'profileImage') {
            const file = e.target.files[0];
            if (file) {
                try {
                    setImage(URL.createObjectURL(file));
                    const data = new FormData();
                    data.append('file', file);
                    data.append("upload_preset", "yuvraj");
                    data.append("cloud_name", "dkh984g6c");

                    const response = await fetch("https://api.cloudinary.com/v1_1/dkh984g6c/image/upload", {
                        method: "POST",
                        body: data,
                    });
                    const result = await response.json();
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        profileImage: result.url,
                    }));
                } catch (error) {
                    console.error('Image upload failed:', error);
                }
            }
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                [e.target.name]: e.target.value,
            }));
        }
    }

    const register = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/auth/register", formData, {
                headers: {
                    "Content-type": "application/json",
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
    // const handleImageChange = (e) => {
    //     const selectedImage = e.target.files[0];
    //     if (selectedImage) {
    //         setImage(URL.createObjectURL(selectedImage));
    //         setFormData({ ...formData, profileImage: selectedImage });
    //     }
    // };


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

                    <input type="file" name='profileImage' id="imageInput" accept='image/*' onChange={handleChange} style={{ display: 'none' }} required />
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