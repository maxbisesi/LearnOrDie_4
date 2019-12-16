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

export const addToCategory = (categories,newCat) => {
  if(categories.keys.includes(newCat)) { 
    let x = {};
    x[newCat] = categories[newCat] + 1;
    return Object.assign({},categories, x);
  }
    let x = {};
    x[newCat] = 1;
    return Object.assign({},categories,x);
};
