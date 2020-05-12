import React , { Fragment }from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import NavSide from "./NavSide";
import { logout } from "../../store/actions/auth";

const drawerWidth = 250;

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  appFrame: {
    minHeight: "100vh",
    height: "100%",
    zIndex: 1,
    position: "relative",
    display: "flex",
    width: "100%"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#1c304e",
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36
  },
  logoText: {
    textDecoration: "none",
    marginLeft: "21px"
  },
  rightMostButton: {
    marginRight: 12
  },
  hide: {
    display: "none"
  },
  drawer: {
    backgroundColor: "#1c304e",
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    backgroundColor: "#1c304e",
    color:'white',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#1c304e",
    color:'white',
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  pushRight: {
    marginLeft: "auto"
  },
  color: {
    color: "white"
  },
  h4: {
    margin: "0 auto"
  }
});

class NavMain extends React.Component {
  state = {
    open: false,
    anchor: "left"
  };

  renderButtons = () => {
    const { auth, classes, user } = this.props;
    if (user && user.length > 0) {
      var name = user[0].name;      
    }
    if (auth) {
      return (
        <Fragment>
          <h5 className={classes.h4}>User Name: {name}</h5>
          <Button
            onClick={this.handleLogout}
            color="inherit"
            to="/"
            component={Link}
            className={classes.rightMostButton}>
            Log Out
          </Button>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Button
            color="inherit"
            to="/"
            component={Link}
            className={classes.pushRight}>
            Login
          </Button>
          <Button
            to="/signup"
            component={Link}
            color="inherit"
            className={classes.rightMostButton}>
            Sign Up
          </Button>
        </Fragment>
      );
    }
  };

  handleLogout = () => {
    this.props.logout();
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChangeAnchor = event => {
    this.setState({
      anchor: event.target.value
    });
  };

  render() {
    const { classes, theme, children, user, auth } = this.props;
    const { open } = this.state;
    var drawer = (
      <Drawer
      onMouseEnter={this.handleDrawerOpen}
      onMouseLeave={this.handleDrawerClose}
        variant="permanent"
        className={classNames(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: classNames({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}>
        <div className={classes.toolbar}>
          <IconButton onClick={this.handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon className={classes.color} /> 
            : <ChevronLeftIcon className={classes.color} />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <NavSide user={user} />
        </List>
      </Drawer>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <div className={classes.appFrame}>
          <AppBar
            position="fixed"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open
            })}>
            <Toolbar>
              <Typography
                component={Link}
                className={classes.logoText}
                to="/"
                color="inherit"
                noWrap>
                Cloud Tek
              </Typography>
              {this.renderButtons()}
            </Toolbar>
          </AppBar>
          {auth ? drawer : null}
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {children}
        </main>
        </div>
      </div>
    )}; //end of return/ render
}

NavMain.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  auth: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.authReducer.isAuth,
  user: state.authReducer.user
});

export default compose(
  withStyles(styles, { withTheme: true }),
  withRouter,
  connect(mapStateToProps, { logout })
)(NavMain);
