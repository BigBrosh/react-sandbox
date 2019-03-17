import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/es/Typography/Typography';
import Item from '../../components/Item';

const Basket = ({ basket }) => {
  const renderItems = () => {
    return basket.map(({ item }) => (
      <Grid item xs={4} key={item.id}>
        <Item item={item}/>
      </Grid>
    ));
  };

  return (
    <div>
      <Typography variant='h2' align='center' gutterBottom>
        Basket
      </Typography>

      <Grid container spacing={16}>
        {renderItems()}
      </Grid>
    </div>
  );
};

export default Basket;