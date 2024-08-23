import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';

const AddCommentForm = ({ postId }) => {
    const [username, setUsername] = useState('');
    const [text, setText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`https://blog-server-zuai.onrender.com/posts/${postId}/comments`, { username, text });
            setUsername('');
            setText('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box sx={{ mt: 4, p: 2, border: '1px solid #ddd', borderRadius: 1, boxShadow: 1 }}>
            <Typography variant="h6" component="h2" gutterBottom>
                Add a Comment
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 2 }}>
                    <TextField
                        fullWidth
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <TextField
                        fullWidth
                        label="Comment"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                        multiline
                        rows={4}
                    />
                </Box>
                <Button variant="contained" color="primary" type="submit">
                    Add Comment
                </Button>
            </form>
        </Box>
    );
};

export default AddCommentForm;
