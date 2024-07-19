import './styles.css'

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  handleSearch: () => void;
}

const Search = ({  handleSearch, ...rest }: SearchProps) => {
  return (
    <div id="search-bar">
      <input id="search-input" placeholder="City" {...rest} />
      <button id="search-btn" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default Search