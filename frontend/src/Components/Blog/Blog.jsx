import React from 'react';
import "./Blog.css";
import { useNavigate } from 'react-router-dom';

function Blog({ image, title, writer, summary, blogId }) {
  const navigate = useNavigate();

  const blogNavigate = () => {
    navigate(`/blog/${blogId}`);
  };


  return (
    <div onClick={blogNavigate} className="bloggs">
      <img src={image} alt="blog-image" />

      <div className="blog__info">
        <h3>{title}</h3>
        <h6>Written by <span>{writer}</span></h6>
        <p>{summary}</p>
      </div>
    </div>
  )
}

export default Blog;