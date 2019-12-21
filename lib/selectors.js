export const getCategoriesFromCards = cards => {
  const categories = [];

  cards.forEach(card => {
    if (!categories.includes(card.category)) {
      categories.push({
        catid: 0,
        name: card.category,
        count: 0,
        rating: 0
      });
    } else {
      let category = categories.find(cat => cat.name === card.category);
      category.count++;
    }
  });

  return categories;
};

export const rateCards = (cards,rates) => { 
  let updatedCards = cards.slice(0);
  rates.map( (rate,index) => {
    if(rate.result === 'nailedit') {
      updatedCards[rate.cardId].nailed++;
    }else if(rate.result === 'whiffed') {
      updatedCards[rate.cardId].whiffed++;
    }else{
      throw new Error('Unknown result');
    }
  });
  updatedCards.map((item,index) => {console.log(item)});
  return updatedCards;
};

export const updateCards = (cards,updates) => {
  let updatedCards = cards.slice(0);
  cards.map( (item,index) => {
    if(updates.hasOwnProperty([item.id])) {
      return Object.assign({},item,updates[item.id]);
    }
  });
}

export const addToCategory = (categories,newCat) => {
  if(categories.hasOwnProperty(newCat)) { 
    let x = {};
    x[newCat] = categories[newCat] + 1;
    return Object.assign({},categories, x);
  }
    let x = {};
    x[newCat] = 1;
    return Object.assign({},categories,x);
};
