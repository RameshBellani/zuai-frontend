import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const NewPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://blog-server-zuai.onrender.com/posts', { title, content })
            .then(() => navigate('/'))
            .catch(err => console.log(err));
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 4,
                    p: 3,
                    bgcolor: '#f9f9f9',
                    borderRadius: 2,
                    boxShadow: 1
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Create New Post
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Title"
                            variant="outlined"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Content"
                            variant="outlined"
                            multiline
                            rows={6}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Create Post
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default NewPost;
