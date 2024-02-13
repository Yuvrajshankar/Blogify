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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            setFormData({ ...formData, image: selectedImage });
        }
    };

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
                    'Content-Type': 'multipart/form-data',
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
                    <input type="file" id='imageInput' name='image' accept='image/' onChange={handleImageChange} required />
                    <input type="text" name="title" placeholder='Blog Title' onChange={handleInputChange} required />
                    <textarea name="summary" maxLength="200" placeholder='summary of your blog' onChange={handleInputChange} required></textarea>

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