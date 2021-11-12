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
}));

const TypeAhead = (props) => {

    const classes = useStyles();
    const {options, onChange, onClick, ...inputProps} = props;

    const [suggestions, setSuggestions] = useState([]);
    const inputElementRef = useRef(null);

    // console.log("stocks: ", options);

    const onInputChange = e => {
      const inputValue = e.target.value;
      console.log("input change: ", inputValue, e.target.validity.valid);

      if(e.target.validity.valid) {
        let result = [];
        if(inputValue.length > 0 && options.length > 0) {
          const regex = new RegExp(`${inputValue}`,"i");
          result = options.filter(v => regex.test(v.name));
        }
        console.log("result: ", result);
        setSuggestions(result);
      }
      // onChange(e);
    }

    // const suggestionSelected = suggestion => {
    //   setSuggestions([]);
    //   console.log("suggestion selected: ", suggestion);
    //   onClick(suggestion);
    // }

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
            <ul>
              {suggestions.map( (suggestion, idx) => {
                // console.log(suggestion, " : ", idx)
                return (<li
                  key={idx}
                  // onClick={()=> suggestionSelected(suggestion)}
                >{suggestion.name}</li>)
              })}
            </ul>
          )}
      </div>
    )
}
export default TypeAhead;
