import React, {useState, useRef, useEffect} from 'react';
import NavBar from './components/NavBar';
import TypeAhead from './components/TypeAhead';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import Stocks from './data/Stocks'
import { ThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';
import lightTheme from './themes/ThemeNavy';
import darkTheme from './themes/ThemeMaroon';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'left',
  },
  pageLoading: {
    paddingTop: theme.spacing(5),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    fontSize: '20px'
  },
  pageStock: {
    paddingTop: theme.spacing(5),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    height: '100vh',
  },
  pageInfo: {
    paddingTop: theme.spacing(3)
  },
}));

const sortedStock = Stocks.sort(( a, b ) => {
  if ( a.symbol < b.symbol ){
    return -1;
  }
  if ( a.symbol > b.symbol ){
    return 1;
  }
  return 0;
});

function Page() {
  const classes = useStyles();
  const [stock, setStock] = useState('');
  const [selectedStock, setSelectedStock] = useState([]);
  const stockList = useRef(sortedStock);
  const [userTheme, setUserTheme] = useState('light');
  const [stockPayload, setStockPayload] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  const selectTheme = ({ detail }) => {
    setUserTheme(detail);
  };

  const appliedTheme = createTheme(userTheme === "light" ? lightTheme : darkTheme);

  useEffect(() => {
      setLoading(true);
      axios.get('https://financialmodelingprep.com/api/v3/search?query=&exchange=NASDAQ&apikey=10a735a05c9ce986e3263629cb5aa061')
          .then(response => {
            let sortedStockPayload = response.data.sort(( a, b ) => {
              if ( a.symbol < b.symbol ){
                return -1;
              }
              if ( a.symbol > b.symbol ){
                return 1;
              }
              return 0;
            });
            setStockPayload(sortedStockPayload);
            console.log('payload: ', sortedStockPayload);
            setLoading(false);
            setLoadingError(null);
          })
          .catch(err => {
            setLoading(false);
            setLoadingError(err);
          });
  }, []);

  useEffect(() => {
    document.addEventListener("themeSelect", selectTheme);
    return () => {
      document.removeEventListener("themeSelect", selectTheme);
    }
  });

  const handleTypeAheadInput = userInputValue => {
    setStock(userInputValue);
  }

  const handleTypeAheadClick = (suggestedVal, chips, type) => {
    console.log("stock is: ", suggestedVal);
    // if(chips !== undefined) {
    if(type === "multiSelect") {
      setSelectedStock(chips);
      setStock('');
    } else {
      setSelectedStock([...selectedStock, suggestedVal.name]);
      setStock(suggestedVal.name);
    }
  }

  const handleClear = () => {
    setSelectedStock([]);
    setStock('');
  }

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <Container maxWidth="md" className={classes.root}>
        <NavBar />
        <Typography component="div" className={classes.pageStock}>
          Type Ahead Component for searching stock ticker
          {!loading ? <TypeAhead
            key={"input"}
            // options={stockList.current}
            options={stockPayload}
            value={stock}
            startAt={0}
            maxResult={10}
            inputPattern="[A-Za-z]+"
            type="multiSelect"
            // type="singleSelect"
            onTextChange={handleTypeAheadInput}
            onChange={(suggestedVal, chips, type) => { handleTypeAheadClick(suggestedVal, chips, type)}}
            onClear={handleClear}
            /> : <div className={classes.pageLoading}>Page loading...</div>}

            {selectedStock.length > 0 && <div component="div" className={classes.pageInfo}>
              User selection: {selectedStock.join(",")}
            </div>}
        </Typography>
      </Container>
    </ThemeProvider>
  );
}

export default Page;
