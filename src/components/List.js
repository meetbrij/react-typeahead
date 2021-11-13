import React from "react";
import Item from "./ListItem";
import useRoveFocus from "../hooks/useRoveFocus";
// import characters from "./onePunchManCharacters";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  listContainer: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    border: '1px solid lightgray',
    zIndex: 5,
    marginTop: theme.spacing(1),
    width: '70%',
  }
}));

const List = (props) => {
  const {suggestions, onClick} = props;
  const [focus, setFocus, direction] = useRoveFocus(suggestions.length);
  const classes = useStyles();

  // console.log("currentFocus: ", focus);

  return (
    <ul className={classes.listContainer} data-testid="list-container">
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
