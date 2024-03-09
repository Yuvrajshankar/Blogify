import React, { useEffect, useState } from 'react';
import "./FullBlog.css";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function FullBlog() {
    const navigate = useNavigate();
    const [blog, setBlog] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`/blog/${id}`);
                setBlog(response.data);
            } catch (error) {
                console.error('Error fetching Blog Details:', error);
            }
        }

        fetchBlog();
    }, [id]);

    const userNavigate = () => {
        navigate(`/profile/${blog.userId}`);
    };
    return (
        <div className='fullBlog'>
            <div className="head">
                <div className="title">{blog.title}</div>
                <img className='image' src={blog.image} alt="" />
            </div>

            <div className="blog_container">
                {blog.fullBlog && blog.fullBlog.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}

                <div className="author">
                    <div className="auimage">
                        <img src={blog.profileImage} alt="author" />
                    </div>
                    <div className="about">
                        <div className="auname" onClick={userNavigate}>{blog.name}</div>
                        <p>
                            Writing is an act of discovering what you think and what you believe.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FullBlog;