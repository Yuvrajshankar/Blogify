import React from 'react'
import "./Blog.css";
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

function Blog12({ image, title, writer, summary, blogId, onDelete }) {
    const navigate = useNavigate();

    const blogNavigate = () => {
        navigate(`/blog/${blogId}`);
    };

    // const handleDelete = async () => {
    //     try {
    //         await axios.delete(`/blog/${blogId}`, { withCredentials: true });

    //     } catch (error) {
    //         console.error('Error deleting blog:', error);
    //     }
    // };

    return (
        <div className="bloggs">
            <img onClick={blogNavigate} src={image} alt="blog-image" />

            <div onClick={blogNavigate} className="blog__info">
                <h3>{title}</h3>
                <h6>Written by <span>{writer}</span></h6>
                <p>{summary}</p>
            </div>
            <DeleteIcon style={{ color: "red", marginLeft: "auto" }} onClick={onDelete} />
        </div>
    )
}

export default Blog12;