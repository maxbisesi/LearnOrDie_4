export const countCategories = cards => {
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
    if(categorcategories.find(cat => cat.name === card.category);)
    categories.map(cat => {
        if(cat.name === newCat.name) {
            cat.count++;
        }
    });
}
