import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import { AppProvider } from './tools/redux/app.provider';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import App from './components/App';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#d7e360',
      main: '#cddc39',
      dark: '#8f9a27',
      contrastText: '#000',
    },
    secondary: {
      light: '#c786d3',
      main: '#ba68c8',
      dark: '#82488c',
      contrastText: '#fff',
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme} >
      <AppProvider>
        <App />
      </AppProvider>
    </ThemeProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
