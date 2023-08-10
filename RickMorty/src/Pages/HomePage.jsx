import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.css';
import { Link } from 'react-router-dom';


const HomePage = () => {
const [characters, setCharacters] = useState([]);
const [selectedCharacter, setSelectedCharacter] = useState(null);

useEffect(() => {
    axios
    .get('https://rickandmortyapi.com/api/character')
    .then((response) => {
        // Filtrar los personajes principales (ID: 1, 2, 3, 4, 5)
        const mainCharacters = response.data.results.filter((character) =>
        [1, 2, 3, 4, 5].includes(character.id)
        );
        setCharacters(mainCharacters);
    })
    .catch((error) => {
        console.error('Error fetching characters:', error);
    });
}, []);

const handleCardClick = (characterId) => {
    const selectedCharacter = characters.find((character) => character.id === characterId);
    setSelectedCharacter(selectedCharacter);
};

const handleCloseModal = () => {
    setSelectedCharacter(null);
};

const getCharacterClass = (name) => {
    const className = name.toLowerCase().replace(' ', '-');
    return `character-card ${className}`;
    };
    
    return (
        <>
        <header className='img-fluid'>
        <div id="carouselExampleAutoplaying" className='carousel slide' data-bs-ride="carousel">
            <div className='carousel-inner'>
            <div className="carousel-item active">
            <img src="src/assets/img/RickandMortySlide1.png" className='d-block w-100' alt="Rick1"/>
            <div className="carousel-caption d-md-block">
            <p className="text-center">Welcome to the club pal!.</p>
            </div>
            </div>
            <div className="carousel-item">
                <img src="src/assets/img/RickandMortySlide2.jpg" className='d-block w-100' alt="Slide2"/>
                <div className="carousel-caption d-none d-md-block pb-2">
            <p className="text-center">Wubba lubba dub dub!! </p>
            </div>
            </div>
            <div className='carousel-item'>
                <img src="src/assets/img/RickandMortySlide3.jpg" className='d-block w-100' alt="Slide3"/>
                <div className="carousel-caption d-none d-md-block pb-2">
            <p className="text-center">I turned myself into a pickle, morty! I'm pickle ri-i-i-ick!! </p>
            </div>
            </div>
            </div>
            <button className='carousel-control-prev' type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            </button>
            </div>
        </header>
        <main className='bg-dark bg-gradient'>
        <div className="container mt-5">
        <h1 className="text-center mb-4" id="im-txt">Principales Personajes de la serie Rick and Morty.</h1>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {characters.map((character) => (
            <div key={character.id} className={`col ${character.name.toLowerCase().replace(' ', '-')}`}>
                <div
                className={`card ${getCharacterClass(character.name)}`}
                onClick={() => handleCardClick(character.id)}
                >
                <img src={character.image} className="card-img-top" alt={character.name} />
                <div className="card-body">
                    <h5 className="card-title">{character.name}</h5>
                </div>
                </div>
            </div>
            ))}
        </div>

        {/* Botón con enlace a CharacterPage */}
        <div className="text-center mt-3">
            <Link to="/characters">
            <button className="btn btn-primary">Ver Todos los Personajes</button>
            </Link>
        </div>

    {/* Modal para mostrar información detallada */}
    {selectedCharacter && (
        <div className="modal-overlay">
        <div className="modal-container">
            <button className="close-modal-btn" onClick={handleCloseModal}>
            Cerrar
            </button>
            <h2>{selectedCharacter.name}</h2>
            <img src={selectedCharacter.image} alt={selectedCharacter.name} />
            <p>Status: {selectedCharacter.status}</p>
            <p>Species: {selectedCharacter.species}</p>
            <p>Gender: {selectedCharacter.gender}</p>
            <p>Origin: {selectedCharacter.origin.name}</p>
            {/* Agregar más detalles aquí si es necesario */}
        </div>
        </div>
    )}
    </div>
    </main>
    </>
);
};

export default HomePage;