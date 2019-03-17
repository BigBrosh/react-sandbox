import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';

class ItemQuantity extends React.Component {
  state = {
    product: null
  };

  componentDidMount() {
    const { id, basket } = this.props;

    this.setState({
      product: basket.find(product => product.item.id === id)
    });
  }

  render() {
    const { product } = this.state;

    if (!product) {
      return <p>...loading</p>;
    }

    return (
      <FormControl>
        <Input
          type='text'
          value={product.quantity}
          startAdornment={
            <InputAdornment position="start">
              <IconButton aria-label="increase quantity">
                <RemoveCircle />
              </IconButton>
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="increase quantity">
                <AddCircle />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    );
  }
}

export default ItemQuantity;