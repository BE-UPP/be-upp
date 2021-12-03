import {TextField, InputAdornment} from "@material-ui/core";
import {Search} from "@material-ui/icons";
import styles from "./SearchBar.module.css";

const SearchBar = ({searchQuery, setSearchQuery, name, label, placeholder}) => {
  return (
    <TextField
      className={styles.text}
      autoComplete="off"
      variant="outlined"
      name={name}
      label={label}
      value={searchQuery}
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};

export default SearchBar;
