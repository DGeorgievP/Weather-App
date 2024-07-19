import './styles.css';

interface FavoritesProps {
  favorites: string[];
  removeFavorite: (city: string) => void;
  handleFavoriteClick: (city: string) => void;
}

const Favorites = ({
  favorites,
  removeFavorite,
  handleFavoriteClick
}: FavoritesProps) => {
  return (
    <div id="favorites">
      <h3>Favorites</h3>
      <hr />
      <ul id="favorites-list">
        {favorites.map((favorite) => (
          <li key={favorite}>
            <button
              id="favorite-item-btn"
              onClick={() => handleFavoriteClick(favorite)}
            >
              {favorite}
            </button>
            <button id="remove-btn" onClick={() => removeFavorite(favorite)}>
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
