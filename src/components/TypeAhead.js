import React, {useRef, useState} from 'react'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(3),
      width: '30ch',
    },
  },
}));

const TypeAhead = (props) => {

    const classes = useStyles();
    const {data, onChange, onClick, ...inputProps} = props;

    const [suggestions, setSuggestions] = useState([]);
    const inputElementRef = useRef(null);

    const onInputChange = e => {
      const inputValue = e.target.value;
      console.log("input change: ", inputValue, e.target.validity.valid)
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
        </div>
    )
}
export default TypeAhead;
