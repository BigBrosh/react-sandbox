import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import routes from '../../routes';

class SideBar extends React.Component {
  changeRoute = (route) => () => {
    this.props.toggleSidebar(false)();
    this.props.history.replace(route);
  };

  renderList = () => {
    const { classes } = this.props;

    return (
      <div className={classes.list}>
        <List>
          {routes.map((route) => {
            const { path, title } = route;

            return (
              <ListItem
                button
                key={`sideNav ${path}`}
                onClick={this.changeRoute(path)}
              >
                <ListItemText primary={title}/>
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <Drawer
        open={this.props.isOpen}
        onClose={this.props.toggleSidebar(false)}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.props.toggleSidebar(false)}>
            <ChevronLeft/>
          </IconButton>
        </div>

        <Divider/>

        {this.renderList()}
      </Drawer>
    );
  }
}

export default SideBar;