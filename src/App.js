import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import PostList from './components/PostLists';
import PostDetail from './components/PostDetails';
import {  Typography  } from '@mui/material';
import NewPost from './components/NewPost';
import EditPost from './components/EditPost';
import Navbar from './components/Navbar'; 

const App = () => {
    return (
        <Router>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Navbar />  
                <main style={{ flex: 1 }}>
                    <Container>
                        <Routes>
                            <Route path="/" element={<PostList />} />
                            <Route path="/posts/:id" element={<PostDetail />} />
                            <Route path="/new" element={<NewPost />} />
                            <Route path="/edit/:id" element={<EditPost />} />
                        </Routes>
                    </Container>
                </main>
                <footer>
                    <Box
                        sx={{
                            backgroundColor: '#1976d2',
                            color: 'white',
                            padding: 2,
                            textAlign: 'center'
                        }}
                    >
                        <Typography variant="body2">
                            &copy; 2024 Blog App
                        </Typography>
                    </Box>
                </footer>
            </Box>
        </Router>
    );
};

export default App;
