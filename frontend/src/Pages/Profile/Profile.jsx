import React, { useEffect, useState } from 'react';
import "./Profile.css";
import axios from "axios";
import Blog12 from '../../Components/Blog/Blog12';
import Loader from '../../Components/Loader/Loader';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({});
    const [userBlogs, setUserBlogs] = useState([]);

    const fetchUserBlogs = async () => {
        try {
            const response = await axios.get('/blog/blogs', { withCredentials: true });
            setUserBlogs(response.data);
        } catch (error) {
            console.error('Error fetching User blogs:', error);
        }
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('/auth/profile', { withCredentials: true });
                setProfileData(response.data);
            } catch (error) {
                navigate("/login");
                console.error('Error fetching User Blogs:', error);
            }
        }

        fetchUserProfile();
        fetchUserBlogs();
    }, []);

    const handleDelete = async (blogId) => {
        try {
            await axios.delete(`/blog/${blogId}`, { withCredentials: true });
            // After successful deletion, fetch updated user blogs
            fetchUserBlogs();
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    return (
        <div className='profile'>
            <div className="container">
                <img src="https://cdn.pixabay.com/photo/2021/10/23/07/27/forest-6734296_640.jpg" alt="banner" className="banner" />

                {profileData ? (
                    <div className="profile__details">
                        <img src={profileData.profileImage} alt="profile-img" />

                        <div className="profile__info">
                            <h1>{profileData.name}</h1>
                            <h5>{profileData.email}</h5>
                        </div>
                    </div>
                ) : (
                    <Loader />
                )}
            </div>

            <div className="blog">
                <h2>Your Blogs</h2>
                {userBlogs.length > 0 ? (
                    userBlogs.map((blog) => (
                        <Blog12
                            key={blog._id}
                            image={blog.image}
                            title={blog.title}
                            writer={blog.userName}
                            summary={blog.summary}
                            blogId={blog._id}
                            onDelete={() => handleDelete(blog._id)}
                        />
                    ))
                ) : (
                    <p style={{ textAlign: "center", color: "grey" }}>No blogs created.</p>
                )}
            </div>
        </div>
    )
}

export default Profile;