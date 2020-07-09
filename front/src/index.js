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
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
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
