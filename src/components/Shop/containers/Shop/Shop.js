import React from 'react';
import Pagination from 'react-js-pagination';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/es/Typography/Typography';
import Item from '../../components/Item';

class Shop extends React.Component {
  state = {
    page: 1,
    itemsPerPage: 3
  };

  renderItems = () => {
    const { page, itemsPerPage } = this.state;

    const filteredItems = this.props.items.filter((item, index) => {
      const maxIndex = itemsPerPage * page;
      index += 1;

      return index >= maxIndex - itemsPerPage + 1 && index <= maxIndex;
    });

    return filteredItems.map(item => (
      <Grid item xs={4} key={item.id}>
        <Item item={item}/>
      </Grid>
    ));
  };

  handlePageChange = (pageNumber) => {
    this.setState({ page: pageNumber });
  };

  render() {
    return (
      <div>
        <Typography variant='h2' align='center' gutterBottom>
          Shop
        </Typography>

        <Grid container spacing={16}>
          {this.renderItems()}
        </Grid>

        <Pagination
          activePage={this.state.page}
          itemsCountPerPage={this.state.itemsPerPage}
          totalItemsCount={this.props.items.length}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default Shop;