import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ItemActions from './ItemActions';

const Item = (props) => {
  const { classes, item } = props;
  const { name, image, description, id } = item;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title={name}
          style={{ backgroundSize: 'contain' }}
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name} {id}
          </Typography>
          <Typography component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>

      <ItemActions item={item} />
    </Card>
  );
};

export default Item;