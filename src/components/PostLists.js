import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, TextField, ListItem, ListItemText, IconButton, Typography, Box, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get('https://blog-server-zuai.onrender.com/posts')
            .then(res => {
                setPosts(res.data);
                setFilteredPosts(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const lowercasedQuery = searchQuery.toLowerCase();
            const filtered = posts.filter(post =>
                post.title.toLowerCase().includes(lowercasedQuery) ||
                post.content.toLowerCase().includes(lowercasedQuery)
            );
            setFilteredPosts(filtered);
        } else {
            setFilteredPosts(posts);
        }
    }, [searchQuery, posts]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://blog-server-zuai.onrender.com/posts/${id}`);
            setPosts(posts.filter(post => post._id !== id));
            setFilteredPosts(filteredPosts.filter(post => post._id !== id));
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
        <Container>
            <Box sx={{ my: 4 }}>
            <Typography 
                    variant="h3" 
                    align="center" 
                    gutterBottom
                    sx={{ 
                        fontWeight: 'bold', 
                        color: 'primary.main', 
                        mb: 3 
                    }}
                >
                    Blog Posts
                </Typography>
                <TextField
                    fullWidth
                    label="Search posts"
                    variant="outlined"
                    margin="normal"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Box 
                    sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: 2 
                    }}
                >
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map(post => (
                            <Box 
                                key={post._id} 
                                sx={{ 
                                    boxShadow: 3, 
                                    borderRadius: 2, 
                                    overflow: 'hidden', 
                                    bgcolor: 'background.paper'
                                }}
                            >
                                <ListItem 
                                    sx={{ 
                                        padding: 2, 
                                        '&:hover': { 
                                            boxShadow: 6 
                                        }
                                    }} 
                                    secondaryAction={
                                        <>
                                            <IconButton component={Link} to={`/edit/${post._id}`} color="primary">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton edge="end" onClick={() => handleDelete(post._id)} color="error">
                                                <DeleteIcon />
                                            </IconButton>
                                        </>
                                    }
                                >
                                    <ListItemText
                                        primary={<Link to={`/posts/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>{post.title}</Link>}
                                    />
                                </ListItem>
                            </Box>
                        ))
                    ) : (
                        <ListItem>
                            <ListItemText primary="No posts found" />
                        </ListItem>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default PostList;
