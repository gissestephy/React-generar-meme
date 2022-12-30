import React from 'react';
import NavBar from './NavBar';
import Meme from './Meme'
import Footer from './Footer';

const Main = () => {
	return (
		<>
			<NavBar />
			<h1 className='animate__animated animate__rubberBand'>Activa tu Mente</h1>
			<Meme />
			<Footer />
		</>
	);
};

export default Main;