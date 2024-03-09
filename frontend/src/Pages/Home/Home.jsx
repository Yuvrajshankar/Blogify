import React, { useEffect, useState } from 'react';
import "./Home.css";
import Blog from '../../Components/Blog/Blog';
import axios from 'axios';

function Home() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios.get('/blog/allblogs')
            .then(response => {
                setBlogs(response.data);
            })
            .catch(error => {
                console.error('Error fetching blogs:', error);
            });
    }, []);
    return (
        <div className='home' style={{ minHeight: "100vh" }}>
            <div className="blog">
                {blogs.slice(0).reverse().map(blog => (
                    <Blog
                        key={blog._id}
                        image={blog.image}
                        title={blog.title}
                        writer={blog.name}
                        summary={blog.summary}
                        blogId={blog._id}
                    />
                ))}
            </div>
        </div>
    )
}

export default Home;