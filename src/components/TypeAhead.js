import React, {useRef, useState} from 'react'
// import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(3),
      width: '55ch',
    },
  },
  listContainer: {
    position: 'absolute',
    maxHeight: '400px',
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    border: '1px solid lightgray',
    zIndex: 5
  },
  listItem: {
    background: 'white',
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

const TypeAhead = (props) => {

    const classes = useStyles();
    const {options, onChange, onClick, ...inputProps} = props;

    const [suggestions, setSuggestions] = useState([]);
    const inputElementRef = useRef(null);

    // console.log("stocks: ", options);

    const onInputChange = e => {
      const inputValue = e.target.value;
      // console.log("input change: ", inputValue, e.target.validity.valid);

      if(e.target.validity.valid) {
        let result = [];
        if(inputValue.length > 0 && options.length > 0) {
          const regex = new RegExp(`${inputValue}`,"i");
          result = options.filter(v => regex.test(v.name));
        }
        // console.log("result: ", result);
        setSuggestions(result);
      }
      onChange(e);
    }

    const suggestionSelected = suggestion => {
      setSuggestions([]);
      console.log("suggestion selected: ", suggestion);
      onClick(suggestion);
    }

    return(
      <div className={classes.root}>
          <TextField
            type="text"
            label="Search Criteria"
            onChange={onInputChange}
            ref={inputElementRef}
            autoComplete={"off"}
            {...inputProps}
          />
          {suggestions.length > 0 && (
            <ul className={classes.listContainer}>
              {suggestions.map( (suggestion, idx) => {
                // console.log(suggestion, " : ", idx)
                return (
                  <li
                    key={idx}
                    className={classes.listItem}
                    onClick={()=> suggestionSelected(suggestion)}
                    >
                      <div className={classes.stockName}>{suggestion.name}</div>
                      <div className={classes.stockTicker}>{suggestion.symbol}</div>
                </li>)
              })}
            </ul>
          )}
      </div>
    )
}
export default TypeAhead;
