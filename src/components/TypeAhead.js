import React, {useRef, useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import List from './List';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(3),
      width: '70%',
    },
  },
  chip: {
    fontSize: '10px',
    height: '20px',
    borderRadius: 10,
    marginRight: 5
  },
  clearChip: {
    position: 'absolute',
    zIndex: 7,
    top: '10px',
    right: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    color: '#6a6a6a'
  }
}));

const TypeAhead = (props) => {

    const classes = useStyles();
    const {options, maxResult, startAt, onChange, onClick, inputPattern, ...textfieldProps} = props;

    const [suggestions, setSuggestions] = useState([]);
    const [chips, setChips] = useState([]);
    const [textFieldInputValue, setTextFieldInputValue] = useState([]);
    const typeAheadElemRef = useRef(null);

    // console.log("stocks: ", options);
    // console.log("maxResult: ", maxResult);

    const onInputChange = e => {
      console.log("input change: ", e.target.value, e.target.validity.valid);
      const inputValue = e.target.validity.valid ? e.target.value : textFieldInputValue;

      if(e.target.validity.valid) {
        let result = [];
        if(inputValue.length > startAt && options.length > 0) {
          const regex = new RegExp(`${inputValue}`,"i");
          result = options.filter(v => regex.test(v.name));
          result = result.length > maxResult ? result.splice(0,10): result;
        }
        // console.log("result: ", result);
        setSuggestions(result);
        setTextFieldInputValue(inputValue);
      }
      onChange(inputValue);
    }

    const suggestionSelected = suggestion => {
      setSuggestions([]);
      // console.log("suggestion selected: ", suggestion);
      setChips([...chips, suggestion.symbol])
      onClick(suggestion);
      typeAheadElemRef.current.focus();
    }

    const clearChips = () => {
      setChips([]);
    }

    return(
      <div className={classes.root}>
          <TextField
            type="text"
            label="Search Criteria"
            onChange={onInputChange}
            autoComplete={"off"}
            inputRef={typeAheadElemRef}
            autoFocus
            inputProps={{
              pattern: inputPattern
            }}
            InputProps={{
              pattern: inputPattern,
              startAdornment: chips.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  className={classes.chip}
                />
              )),
              endAdornment: chips.length > 0 && <div
                className={classes.clearChip}
                onClick={()=> clearChips()}
                >x</div>
            }}
            {...textfieldProps}
          />
          {suggestions.length > 0 && (
            <List
              suggestions={suggestions}
              onClick={(suggestion)=> suggestionSelected(suggestion)}
            />
          )}
      </div>
    )
}

TypeAhead.defaultProps = {
    startAt: 0,
    maxResult: 10,
    inputPattern: "[A-Za-z0-9]+"
}

export default TypeAhead;
