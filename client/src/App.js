import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import HomePage from './components/Homepage/homepage'
import Profile from './components/Profile/profile'

const Theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const App = () => (
  <MuiThemeProvider theme={Theme}>
    <Router>
      <Route path="/" exact component={HomePage} />
      <Route path="/profile" exact component={Profile} />
    </Router>
  </MuiThemeProvider>
)

export default App;