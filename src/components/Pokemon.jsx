import React, { useState } from 'react';
import axios from 'axios';

const Pokemon = () => {
    const [name, setName] = useState("");
    const [pokemonData, setPokemonData] = useState(null); // State to hold Pokémon data
    const [error, setError] = useState(""); // State for error message
    const [loading, setLoading] = useState(false); // State for loading status

    const handleSearch = () => {
        if (!name) {
            setError("Please enter a Pokémon name.");
            return;
        }

        setLoading(true);
        setError(""); // Clear previous errors

        axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`) // Use lower case for consistency
            .then((res) => {
                setPokemonData(res.data ); // Store Pokémon data
                setLoading(false); // Stop loading
            })
            .catch((err) => {
                setError("Pokémon not found!"); // Set error message
                setLoading(false); // Stop loading
            });
    };

    return (
        <div className='h-full w-screen flex flex-col justify-center items-center gap-4 pt-6'>
            <h1 className='text-2xl text-center w-full'>Enter a Pokémon Name</h1>
            <div className='flex gap-2 w-1/2'>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} // Update state on input change
                    className='border-2 border-black rounded-xl pl-3 w-full min-w-40'
                />
                <button
                    type="button" // Changed to type "button" to prevent form submission
                    onClick={handleSearch} // Call the search function
                    className='bg-blue-500 px-4 py-2 rounded-xl'
                >
                    Search
                </button>
            </div>
            {loading && <p>Loading...</p>} {/* Loading state */}
            {error && <p className='text-red-500'>{error}</p>} {/* Error message */}
            {pokemonData && (
                <div className='mt-4'>
                    {/* <h2 className='text-xl'>{pokemonData.name.toUpperCase()}</h2> */}
                    <img src={pokemonData.sprites.other.dream_world.front_default} alt={pokemonData.name} />
                </div>
            )}
        </div>
    );
}

export default Pokemon;
