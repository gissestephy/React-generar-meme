import React, { useState, useEffect } from 'react';
import '../styles/meme.css';
import axios from 'axios';
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';
import { SketchPicker } from 'react-color';

const Meme = () => {
	const [memes, setMemes] = useState([]); // lo utilizo para llamar a la API
	const [selectedMeme, setSelectedMeme] = useState({}); // lo utilizo para que el meme sea random 
	const [changeMeme, setChangeMeme] = useState(true); // para cambiar el meme
	const [topText, setTopText] = useState('');
	const [bottomText, setBottomText] = useState('');
    const [color, setColor] = useState("lightblue");
    const [hidden, setHidden] = useState(false);
    const [selectedColor, setSelectedColor] = useState('white');

	useEffect(() => {
		if (!memes.length) {
			axios.get('https://api.imgflip.com/get_memes').then((result) => {
				if (result.data.success) {
					setMemes(result.data.data.memes);
				}
			});
		}
	}, [memes]);

	useEffect(() => {
		if (memes.length) {
			const randomMeme = getRandomInt(memes.length);
			setSelectedMeme(memes[randomMeme]);
		}
	}, [memes, changeMeme]);

    // necesario para cambiar las imagenes random 
	const getRandomInt = (max) => {
		const value = Math.floor(Math.random() * max);
		return value;
	};

    const MemeChange = (e) => {
		setChangeMeme(!changeMeme);
	};

	const handleChange = (e) => {
		if (e.target.name === 'top_text') setTopText(e.target.value);
		else setBottomText(e.target.value);
	};

	// utilizo html-to-image para descargar el meme
	const Download = (e) => {
		htmlToImage
			.toPng(document.getElementById('meme-download'))
			.then((dataUrl) => {
				download(dataUrl, `${selectedMeme.name}.png`);
			});
	};

	// constante para cambiar el color del fondo
	const pickerStyles = {
        default: {
            picker: {
                position: "absolute",
                top: "200px",
                left: "350px",
            }
        }
    }

    // constante para cambiar el color a la fuente
	const handleColor = (e) => {
		const color = e.target.className.split(' ')[2];
		setSelectedColor(color);
	};

	return (
		<div className='container' style={{background: color}}>
            <div className='PaletaColor'>
                <div className='containerPaleta'>
                    {hidden && (
                        <SketchPicker 
                            styles={pickerStyles} 
                            color={color} 
                            onChange= {(updatedColor) => setColor(updatedColor.hex)} 
                        />
                    )}
                        <button className='botonColor' onClick= {() => setHidden(!hidden)}>Elije tu color de fondo</button> 
                </div>            
            </div>
            <hr/>

            <div className='meme-container' id='meme-download'
				style={{
					backgroundImage: `url(${selectedMeme?.url})`,
					height: `${selectedMeme?.height}px`,
					width: `${selectedMeme?.width}px`,
				}}>
				<h4 style={{ color: selectedColor }} className='meme-top-text'> {topText} </h4>
				<h4 style={{ color: selectedColor }} className='meme-bottom-text'> {bottomText}</h4>
			</div>

			{/* coloco 5 opciones de colores */}
			<div className='color-picker'>
                <button onClick={handleColor} style={selectedColor === 'white' ? { height: '1.5em', width: '1.5em'} : {} } className='color waves-effect white'></button>
                <button onClick={handleColor} style={selectedColor === 'black' ? { height: '1.5em', width: '1.5em'} : {} } className='color waves-effect black'></button>
				<button onClick={handleColor} style={selectedColor === 'yellow' ? { height: '1.5em', width: '1.5em'} : {} } className='color waves-effect yellow'></button>
				<button	onClick={handleColor} style={selectedColor === 'orange' ? {height: '1.5em', width: '1.5em'} : {} } className='color waves-effect orange'></button>
				<button onClick={handleColor} style={selectedColor === 'pink' ? { height: '1.5em', width: '1.5em'} : {} } className='color waves-effect pink'></button>
				<button onClick={handleColor} style={selectedColor === 'purple' ? { height: '1.5em', width: '1.5em'} : {} } className='color waves-effect purple'></button>
                <button onClick={handleColor} style={selectedColor === 'green' ? { height: '1.5em', width: '1.5em'} : {} } className='color waves-effect green'></button>
				<button onClick={handleColor} style={selectedColor === 'blue' ? { height: '1.5em', width: '1.5em'} : {} } className='color waves-effect blue'></button>
				<button onClick={handleColor} style={selectedColor === 'red' ? { height: '1.5em', width: '1.5em'} : {} } className='color waves-effect red'></button>
            </div>

            <form>
				<div className='row'>
					<div className='input-field'>
						<input className='validate' style={{pickerStyles}} type='text' id='top_text' name='top_text' value={topText} onChange={handleChange}/>
						<label for='top_text' >Texto superior</label>
					</div>
					<div className='input-field'>
						<input className='validate' type='text' name='bottom_text' id='bottom_text' value={bottomText} onChange={handleChange}/>
						<label for='bottom_text'>Texto inferior</label>
					</div>
				</div>
			</form>

			{/* Coloco dos botones para elegir el meme y para descargarlo */}
			<div className='button-container'>
				<button
					onClick={MemeChange}
					className='waves-effect btn botton botonCreate'>
					Elije tu Meme
				</button>
				<button
					onClick={Download}
					className='waves-effect btn botton botonDownload'>
					Atrapalo
				</button>
			</div>
		</div>
	);
};

export default Meme;