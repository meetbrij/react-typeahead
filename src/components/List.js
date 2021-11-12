import React from "react";
import Item from "./ListItem";
import useRoveFocus from "./useRoveFocus";
// import characters from "./onePunchManCharacters";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  listContainer: {
    position: 'absolute',
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    border: '1px solid lightgray',
    zIndex: 5
  }
}));

const List = (props) => {
  const {suggestions, onClick} = props;
  const [focus, setFocus, direction] = useRoveFocus(suggestions.length);
  const classes = useStyles();

  // console.log("currentFocus: ", focus);

  return (
    <ul className={classes.listContainer}>
      {suggestions.map((suggestion, index) => (
        <Item
          key={index}
          setFocus={setFocus}
          index={index}
          focus={focus === index && direction !== ''}
          suggestion={suggestion}
          onClick={()=> onClick(suggestion)}
        />
      ))}
    </ul>
  );
};

export default List;
