import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { PostsPage } from './pages/postsPage/PostsPage';
import { Header } from './components/header/Header';
import { AlbumsPage } from './pages/albumsPage/AlbumsPage';
import { TodosPage } from './pages/todosPage/TodosPage';
import { AlbumFotos } from './pages/albumFotosPage/AlbumFotos';

export const App = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation()

	useEffect(() => {
		if (pathname === '/') {
			navigate('posts')
		}
	}, [navigate, pathname]);

	return (
		<>
			<Header />
			<Routes>
				<Route path="posts" element={<PostsPage />} />
				<Route path="albums" element={<AlbumsPage />} />
				<Route path="albums/:id" element={<AlbumFotos />} />
				<Route path="todos" element={<TodosPage />} />
			</Routes>
		</>

	);
};
