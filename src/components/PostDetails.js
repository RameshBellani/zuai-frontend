import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AddCommentForm from './AddComments'; 
import { Container, Typography, Box, List, ListItem, ListItemText, Divider, Card, CardContent, CircularProgress } from '@mui/material';

const PostDetail = () => {
    const { id } = useParams();  
    const [post, setPost] = useState(null);
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
        <Container>
            <Box sx={{ my: 4 }}>
                <Card sx={{ mb: 4 }}>
                    <CardContent>
                        <Typography variant="h3" gutterBottom>
                            {post.title}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {post.content}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            <em>{new Date(post.date).toLocaleString()}</em>
                        </Typography>
                    </CardContent>
                </Card>

                <Typography variant="h4" gutterBottom>
                    Comments
                </Typography>
                <List>
                    {post.comments.length > 0 ? (
                        post.comments.map(comment => (
                            <React.Fragment key={comment._id}>
                                <ListItem sx={{ borderRadius: 1, bgcolor: '#f9f9f9' }}>
                                    <ListItemText
                                        primary={<Typography variant="subtitle1"><strong>{comment.username}</strong>: {comment.text}</Typography>}
                                        secondary={<Typography variant="body2"><em>{new Date(comment.date).toLocaleString()}</em></Typography>}
                                    />
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        ))
                    ) : (
                        <ListItem>
                            <ListItemText primary="No comments yet" />
                        </ListItem>
                    )}
                </List>
                <Box sx={{ mt: 4 }}>
                    <AddCommentForm postId={post._id} />
                </Box>
            </Box>
        </Container>
    );
};

export default PostDetail;
