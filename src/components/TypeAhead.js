import React, {useRef, useState, useEffect} from 'react'
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import List from './List';

const useStyles = makeStyles((theme) => ({
  root: {},
  textfield: {
    marginTop: theme.spacing(3),
    width: '70%',
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
    top: '7px',
    right: '5px',
    fontSize: '17px',
    cursor: 'pointer',
    color: '#6a6a6a'
  },
  clearText: {
    position: 'absolute',
    zIndex: 7,
    top: '7px',
    right: '5px',
    fontSize: '17px',
    cursor: 'pointer',
    color: '#6a6a6a'
  }
}));

const TypeAhead = (props) => {

    const classes = useStyles();
    const {options, maxResult, startAt, onChange, onTextChange, onClear, inputPattern, type, ...textfieldProps} = props;

    const [suggestions, setSuggestions] = useState([]); // result list of suggestions
    const [suggestion, setSuggestion] = useState([]); // user selected suggestion
    const [chips, setChips] = useState([]);
    const [textFieldInputValue, setTextFieldInputValue] = useState('');
    const typeAheadElemRef = useRef(null);

    const adornment = type === "singleSelect" ?
    {
        endAdornment: textFieldInputValue.length > 0 && <div
        className={classes.clearText}
        onClick={()=> handleClear()}
        >x</div>
    } : {
        startAdornment: chips.map((item) => (
          <Chip
            key={item}
            label={item}
            className={classes.chip}
          />
        )),
        endAdornment: chips.length > 0 && <div
          className={classes.clearChip}
          onClick={()=> handleClear()}
          >x</div>
    };

    // console.log("stocks: ", options);
    // console.log("type: ", type);

    useEffect(() => {
      console.log("use effect chips")
      onChange(suggestion, chips, "multiSelect");
    },[chips]);

    const onInputChange = e => {
      // console.log("input change: ", e.target.value, e.target.validity.valid);
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
      onTextChange(inputValue);
    }

    const suggestionSelected = suggestion => {
      setSuggestions([]);
      // setSuggestion(suggestion)
      // console.log("suggestion selected: ", suggestion);
      if(type === "multiSelect") {
        setChips([...chips, suggestion.symbol]);
      } else {
        onChange(suggestion, chips, type);
      }
      // onChange(suggestion, chips, type);


      typeAheadElemRef.current.focus();
    }

    const handleClear = () => {
      setChips([]);
      onClear('', []);
      typeAheadElemRef.current.focus();
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
            className={classes.textfield}
            aria-label="TypeAhead component"
            // multiline
            // maxRows={4}
            inputProps={{
              pattern: inputPattern,
              "data-testid": "text-field-search",
            }}
            InputProps={adornment}
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
    inputPattern: "[A-Za-z0-9]+",
    type: "singleSelect"
}

export default TypeAhead;
