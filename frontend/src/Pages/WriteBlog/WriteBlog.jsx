import React, { useEffect, useState } from 'react';
import "./WriteBlog.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function WriteBlog() {
    const [user, setUser] = useState(null);
    const [paragraphs, setParagraphs] = useState(['']);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        image: '',
        title: '',
        summary: '',
        fullBlog: '',
    });

    const handleChange = async (e) => {
        if (e.target.name === 'image') {
            const file = e.target.files[0];
            if (file) {
                try {
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
                        image: result.url,
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


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('image', formData.image);
            formDataToSend.append('title', formData.title);
            formDataToSend.append('summary', formData.summary);
            paragraphs.forEach((paragraph, index) => {
                formDataToSend.append(`fullBlog[${index}]`, paragraph);
            });

            const response = await axios.post('/blog/create', formDataToSend, {
                withCredentials: true,
                headers: {
                    "Content-type": "application/json",
                },
            });
            navigate('/');
        } catch (error) {
            console.error('Error creating blog:', error);
        }
    }

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const response = await axios.get('/auth/already', { withCredentials: true });
                setUser(response.data);
            } catch (error) {
                navigate("/login");
                setUser(null);
            }
        }

        checkLoggedIn();
    }, []);

    const handleParagraphChange = (index, event) => {
        const newParagraphs = [...paragraphs];
        newParagraphs[index] = event.target.value;
        setParagraphs(newParagraphs);
    };

    const addParagraph = () => {
        setParagraphs([...paragraphs, '']);
    };

    return (
        <div className='write__blog'>
            <div className="create">
                <h1>Write a Blog</h1>
                <form onSubmit={handleSubmit}>
                    <input type="file" id='imageInput' name='image' accept='image/' onChange={handleChange} required />
                    <input type="text" name="title" placeholder='Blog Title' onChange={handleChange} required />
                    <textarea name="summary" maxLength="200" placeholder='summary of your blog' onChange={handleChange} required></textarea>

                    {paragraphs.map((paragraph, index) => (
                        <textarea
                            key={index}
                            name="fullBlog"
                            rows="3"
                            placeholder={`Paragraph ${index + 1}`}
                            value={paragraph}
                            onChange={(event) => handleParagraphChange(index, event)}
                            required
                        ></textarea>
                    ))}

                    <button className='add__para' onClick={addParagraph}>Add Paragraph</button>

                    <button type="submit" className='submit'>Submit Blog</button>
                </form>
            </div>
        </div>
    )
}

export default WriteBlog;