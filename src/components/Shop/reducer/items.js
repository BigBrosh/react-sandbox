const initialState = [
  {
    id: 1,
    name: 'apple',
    description: 'very natural apple',
    image: 'https://5.imimg.com/data5/YY/EN/MY-8155364/fresh-apple-500x500.jpg',
    category: 'fruits',
    color: 'red',
    size: 'medium',
    price: 100
  }, {
    id: 2,
    name: 'banana',
    price: 2000,
    description: 'very natural banana',
    category: 'fruits',
    color: 'yellow',
    size: 'large',
    image: 'https://thumbs-prod.si-cdn.com/_oO5E4sOE9Ep-qk_kuJ945_-qo4=/800x600/filters:no_upscale()/https://public-media.si-cdn.com/filer/d5/24/d5243019-e0fc-4b3c-8cdb-48e22f38bff2/istock-183380744.jpg'
  }, {
    id: 3,
    name: 'lemon',
    price: 3500,
    description: 'very natural lemon',
    category: 'fruits',
    color: 'yellow',
    size: 'small',
    image: 'https://www.producemarketguide.com/sites/default/files/Commodities.tar/Commodities/lemon_commodity-page.png'
  }, {
    id: 4,
    name: 'apple',
    description: 'very natural apple',
    image: 'https://5.imimg.com/data5/YY/EN/MY-8155364/fresh-apple-500x500.jpg',
    category: 'fruits',
    color: 'red',
    size: 'medium',
    price: 100
  }, {
    id: 5,
    name: 'banana',
    price: 2000,
    description: 'very natural banana',
    category: 'fruits',
    color: 'yellow',
    size: 'large',
    image: 'https://thumbs-prod.si-cdn.com/_oO5E4sOE9Ep-qk_kuJ945_-qo4=/800x600/filters:no_upscale()/https://public-media.si-cdn.com/filer/d5/24/d5243019-e0fc-4b3c-8cdb-48e22f38bff2/istock-183380744.jpg'
  }, {
    id: 6,
    name: 'lemon',
    price: 3500,
    description: 'very natural lemon',
    category: 'fruits',
    color: 'yellow',
    size: 'small',
    image: 'https://www.producemarketguide.com/sites/default/files/Commodities.tar/Commodities/lemon_commodity-page.png'
  }, {
    id: 7,
    name: 'apple',
    description: 'very natural apple',
    image: 'https://5.imimg.com/data5/YY/EN/MY-8155364/fresh-apple-500x500.jpg',
    category: 'fruits',
    color: 'red',
    size: 'medium',
    price: 100
  }, {
    id: 8,
    name: 'banana',
    price: 2000,
    description: 'very natural banana',
    category: 'fruits',
    color: 'yellow',
    size: 'large',
    image: 'https://thumbs-prod.si-cdn.com/_oO5E4sOE9Ep-qk_kuJ945_-qo4=/800x600/filters:no_upscale()/https://public-media.si-cdn.com/filer/d5/24/d5243019-e0fc-4b3c-8cdb-48e22f38bff2/istock-183380744.jpg'
  }, {
    id: 9,
    name: 'lemon',
    price: 3500,
    description: 'very natural lemon',
    category: 'fruits',
    color: 'yellow',
    size: 'small',
    image: 'https://www.producemarketguide.com/sites/default/files/Commodities.tar/Commodities/lemon_commodity-page.png'
  }
];

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};