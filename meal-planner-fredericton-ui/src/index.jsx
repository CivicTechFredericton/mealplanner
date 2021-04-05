import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Router } from 'react-router-dom';
import Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import history from './utils/history/index';
import i18n from './utils/i18n';
import { I18nextProvider } from 'react-i18next';
import { StateProvider } from './core/store/state';
import { reducer } from './core/store/reducer';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#4a4c54',
      main: '#22242b',
      dark: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#abf3a2',
      main: '#7ac073',
      dark: '#4a8f46',
      contrastText: '#ffffff',
    },
    typography: {
      useNextVariants: true,
      fontFamily: 'Open Sans',
    },
    text: {
      primary: '#ffffff',
      secondary: '#000000',
      disabled: '#000000',
      hint: '#000000',
    },
  },
});

const initialState = {
  appState: { State: 'Loading' }
};


ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <I18nextProvider i18n={i18n}>
      <DndProvider backend={Backend}>
        <Router history={history}>
          <MuiThemeProvider theme={theme}>
            <App />
          </MuiThemeProvider>
        </Router>
      </DndProvider>
    </I18nextProvider>
  </StateProvider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
