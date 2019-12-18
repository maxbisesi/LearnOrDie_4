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

export const rateCard = (array,action) => { 
  return array.map( (item,index) => {
    if(index !== action.currentIn) { return item; }
    if(action.result === 'whiff') { 
      ++item.seen;
      ++item.whiffed;
      return item;
    }
    if(action.result === 'nail') {
      ++item.seen;
      ++item.naild;
      return item;
    }

  });
}

export const updateItemInArray = (array, itemId, updateItemCallback) {
  const updatedItems = array.map(item => {
    if (item.id !== itemId) {
      // Since we only want to update one item, preserve all others as they are now
      return item
    }

    // Use the provided callback to create an updated item
    const updatedItem = updateItemCallback(item)
    return updatedItem
  })

  return updatedItems
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
