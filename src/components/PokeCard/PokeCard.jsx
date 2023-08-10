import './Pokecard.css';

const PokeCard = ( {name, id, image} ) => {
  return (
    <div className='poke-card'>
        <h2 className='poke-name'>{name}</h2>
        <img className='poke-image' src={image} alt={id} />
        <p className='poke-id'>{id}</p>
    </div>
  )
}

export default PokeCard;
