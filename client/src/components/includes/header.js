import React, { useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

function HeaderBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [redirectUrl, setRedirect] = useState(null)

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'right', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => setRedirect('/profile')}>My Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Login</MenuItem>
      <MenuItem onClick={handleMenuClose}>Sign Up</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => setRedirect('/notification?type=comments')}>
        <IconButton aria-label="show 4 new Comments" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <ModeCommentIcon />
          </Badge>
        </IconButton>
        <p>Comments</p>
      </MenuItem>
      <MenuItem onClick={() => setRedirect('/notification?type=likes')}>
        <IconButton aria-label="show 11 new Likes" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <FavoriteIcon />
          </Badge>
        </IconButton>
        <p>Likes</p>
      </MenuItem>
      <MenuItem onClick={() => setRedirect('/notification?type=impressions')}>
        <IconButton aria-label="show 4 new Insights" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <OfflineBoltIcon />
          </Badge>
        </IconButton>
        <p></p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      {(redirectUrl) ?
        <Redirect to={redirectUrl} /> :
        <div className={classes.grow}>
          <AppBar position="static">
            <Toolbar>
              <Typography className={classes.title} variant="h6" noWrap
                onClick={() => window.location.replace('/')}>
                Welcome DATAGROKRian
          </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <IconButton aria-label="show 4 new Comments" color="inherit"
                  onClick={() => setRedirect('/notification?type=comments')}>
                  <Badge badgeContent={4} color="secondary">
                    <ModeCommentIcon />
                  </Badge>
                </IconButton>
                <IconButton aria-label="show 17 new Likes" color="inherit"
                  onClick={() => setRedirect('/notification?type=likes')}>
                  <Badge badgeContent={17} color="secondary">
                    <FavoriteIcon />
                  </Badge>
                </IconButton>
                <IconButton aria-label="show 4 new Impressive" color="inherit"
                  onClick={() => setRedirect('/notification?type=impressions')}>
                  <Badge badgeContent={4} color="secondary">
                    <OfflineBoltIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
        </div>
      }
    </>
  );
}

export default withRouter(HeaderBar)