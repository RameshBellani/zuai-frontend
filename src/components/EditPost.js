import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, CircularProgress } from '@mui/material';

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({ title: '', content: '' });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`https://blog-server-zuai.onrender.com/posts/${id}`);
                setPost(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost(prevPost => ({
            ...prevPost,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://blog-server-zuai.onrender.com/posts/${id}`, post);
            navigate(`/posts/${id}`);
        } catch (err) {
            setError(err.message);
        }
    };

    if (isLoading) return (
        <Box 
            sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '80vh' 
            }}
        >
            <CircularProgress />
        </Box>
    );

    if (error) return (
        <Box 
            sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '80vh' 
            }}
        >
            <Typography variant="h6" align="center" color="error">
                Error loading post: {error}
            </Typography>
        </Box>
    );
    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Edit Post
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            fullWidth
                            label="Title"
                            name="title"
                            value={post.title}
                            onChange={handleChange}
                            required
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            fullWidth
                            label="Content"
                            name="content"
                            value={post.content}
                            onChange={handleChange}
                            required
                            multiline
                            rows={4}
                        />
                    </Box>
                    <Button variant="contained" color="primary" type="submit">
                        Update Post
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default EditPost;
