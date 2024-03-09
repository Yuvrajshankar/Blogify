import React, { useEffect, useState } from 'react';
import "./Profile.css";
import Blog from '../../Components/Blog/Blog';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function OtherProfile() {
    const [profileData, setProfileData] = useState({});
    const [userBlogs, setUserBlogs] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(`/auth/${id}`);
                setProfileData(response.data);
            } catch (error) {
                console.error('Error fetching Profile Details:', error);
            }
        }

        const fetchUserBlogs = async () => {
            try {
                const response = await axios.get(`/blog/user/${id}`, { withCredentials: true });
                setUserBlogs(response.data);
            } catch (error) {
                console.error('Error fetching User blogs:', error);
            }
        }

        fetchProfileData();
        fetchUserBlogs();
    }, [id]);

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
                    <p>Loading profile data...</p>
                )}
            </div>

            <div className="blog">
                <h2>Your Blogs</h2>
                {userBlogs.length > 0 ? (
                    userBlogs.map((blog) => (
                        <Blog
                            key={blog._id}
                            image={blog.image}
                            title={blog.title}
                            writer={blog.name}
                            summary={blog.summary}
                            blogId={blog._id}
                        />
                    ))
                ) : (
                    <p style={{ textAlign: "center", color: "grey" }}>No blogs created.</p>
                )}
            </div>
        </div>
    )
}

export default OtherProfile;