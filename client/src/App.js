import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import HomePage from './components/Homepage/homepage'
import Profile from './components/Profile/profile'
import Notify from './components/Notification/notify'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import UploadBlog from './components/Blog/upload'
import BlogDetail from './components/Blog/Details'
import Test from './components/Test'

const Theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const App = () => (
  <MuiThemeProvider theme={Theme}>
    <Router>
      <Route path="/" exact component={HomePage} />
      <Route path="/profile" component={Profile} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/write" component={UploadBlog} />
      <Route path="/read" component={BlogDetail} />
      <Route path="/notification" exact component={Notify} />
      <Route path="/test" exact component={Test} />
    </Router>
  </MuiThemeProvider>
)

export default App;