import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import ProductQuantity from '../ProductQuantity';

class NavBar extends React.Component {
  componentDidMount() {
    document.body.style.paddingTop = `${this.appBar.clientHeight + 10}px`;
  }

  render() {
    const { classes } = this.props;

    return (
      <AppBar>
        <Toolbar
          ref={node => this.appBar = ReactDOM.findDOMNode(node)}
        >
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Open drawer"
            onClick={this.props.toggleSidebar(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap>
            MegaShop
          </Typography>

          <div className={classes.grow} />

          <div className={classes.sectionDesktop}>
            <ProductQuantity />
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default NavBar;