const shop = [
  {
    id: 1,
    name: 'apple',
    price: 1000,
    image: 'https://5.imimg.com/data5/YY/EN/MY-8155364/fresh-apple-500x500.jpg'
  }, {
    id: 2,
    name: 'banana',
    price: 2000,
    image: 'https://thumbs-prod.si-cdn.com/_oO5E4sOE9Ep-qk_kuJ945_-qo4=/800x600/filters:no_upscale()/https://public-media.si-cdn.com/filer/d5/24/d5243019-e0fc-4b3c-8cdb-48e22f38bff2/istock-183380744.jpg'
  }, {
    id: 3,
    name: 'lemon',
    price: 3500,
    image: 'https://www.producemarketguide.com/sites/default/files/Commodities.tar/Commodities/lemon_commodity-page.png'
  }
];

export const listItems = (req, res) => {
  res.status(200).json({ shop });
};

export const getItem = (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    item: shop.find(item => item.id === Number(id))
  });
};