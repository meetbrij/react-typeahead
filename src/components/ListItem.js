import React, { useEffect, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  listItem: {
    // background: 'white',
    backgroundColor: '#fff',
    "&:hover, &:focus": {
      backgroundColor: '#eee'
    },
    "&:active": {
      backgroundColor: '#eee'
    },
    padding: '5px 10px',
    cursor: 'pointer',
    borderBottom: '1px solid lightgray',
  },
  stockName: {
    fontSize: '15px',
  },
  stockTicker: {
    fontSize: '10px',
    color: "#646464"
  }
}));

const ListItem = ({ suggestion, focus, index, setFocus, onClick }) => {
  const ref = useRef(null);
  const classes = useStyles();

  // console.log("focus: ", focus);

  useEffect(() => {
    if (focus) {
      // Move element into view when it is focused
      ref.current.focus();
    }
  }, [focus]);

  const handleClick = () => {
    // console.log(`${suggestion}`);
    onClick(suggestion);
  };

  const handleKeyDown = (e) => {
    // console.log(`${e.keyCode}`);
    if(e.code === "Enter" || e.charCode === 13) {
      onClick(suggestion);
    }
  };

  return (
    <li
      tabIndex={focus ? 0 : -1}
      role="button"
      ref={ref}
      className={classes.listItem}
      // onKeyDown={handleClick}
      onClick={handleClick}
      onKeyPress={handleKeyDown}
    >
      <div className={classes.stockName}>{suggestion.name}</div>
      <div className={classes.stockTicker}>{suggestion.symbol}</div>
    </li>
  );
};

export default ListItem;
