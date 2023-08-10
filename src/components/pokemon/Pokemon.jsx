import { useEffect, useState } from 'react';
import './Pokemon.css';
import PokeCard from '../PokeCard/PokeCard';

const Pokemon = () => {
    const [pokemon, setPokemon] = useState();
    const [id, setId] = useState(1);
    const [inputValue, setInputValue] = useState('');
    const [errMessage, setErrMessage] = useState('');

    const HandleNext = () => {
      setId(id + 1);
    };

    const HandlePrevius = () => {
      id > 1 && setId(id - 1);
    };

    const HandleSubmitValue = async (e) => {
      e.preventDefault();
      if (inputValue === '') {
        return;
      }

      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`);
        if (!response.ok) {
          throw new Error('El Pokémon no se ha encontrado');
        }
        const data = await response.json();
        
        setPokemon(data);
        setId(data.id);
        setErrMessage('');
      } catch (err) {
        setErrMessage(err.message);
      }
    };

    const HandleChange = (e) => {
      const NewValue = e.target.value;
      setInputValue(NewValue);
    }

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(response => response.json())
            .then(data => {
                setPokemon(data);
            })
    },[id,inputValue,setErrMessage]);
    
  return (
    
    <div className='poke-staff'>
        <div className='Nav-sekker-container'>
          <form className="form-sekker" onSubmit={HandleSubmitValue}>
              <input className='input-sekker' type="text" placeholder='picachu...' value={inputValue} onChange={HandleChange}/>
              <input className='input-sekeker' type="submit" value='buscar'/>
          </form>
        </div>
        {errMessage && <p>{errMessage}</p>}
        {pokemon && <PokeCard name={pokemon.name} id={pokemon.id} image={pokemon.sprites.front_default}/>}
        <div className="btn-poke-container">
          {id > 1 ? <button className='btn-poke' onClick={HandlePrevius}>anterior</button> : <button disabled>anterior</button>}
          <button className='btn-poke' onClick={HandleNext}>siguiente</button>
        </div>
    </div>
  )
}

export default Pokemon;
