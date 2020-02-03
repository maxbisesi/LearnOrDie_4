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

export const updateCards = (cards,updates) => {
  return cards.map( (item,index) => {
    if(updates.hasOwnProperty([item.id])) {
      return Object.assign({},item,updates[item.id]);
    }
  });
};

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


export const getSession = (result,oldSession) => {
  //copy the session object
  // getSession is for calculating streaks, it has nothing to do with the users Rank
  // maybe the higher their rank the more it takes for them to get on a steak.
  let sesh = Object.assign({},oldSession);
  if (result === 'nailed') {
    let currentStreak = ++sesh.streak;
    sesh.rut = 0;
    ++sesh.nailed;

    if (currentStreak < 5 && currentStreak > 0) {
      sesh.points += 1;
      sesh.streakClass = 'onStreak1';
    } else if (currentStreak >= 5 && currentStreak < 10) {
      sesh.points += 10;
      sesh.streakClass = 'onStreak2';
    } else if (currentStreak > 10 && currentStreak < 30) {
      sesh.points += 20;
      sesh.streakClass = 'onStreak3';
    } else if (currentStreak >= 30) {
      sesh.points += 50;
      sesh.streakClass = 'onStreak4';
    }

    return sesh;

  } else if (result === 'whiffed') {
    let currentRut = ++sesh.rut;
    sesh.streak = 0;
    ++sesh.whiffed;

    if (currentRut <= 5 && currentRut > 0) {
      sesh.points -= 10;
    } else if (currentRut > 5 && currentRut < 10) {
      sesh.points -= 20;
    } else if (currentRut > 10 && currentRut < 15) {
      sesh.points -= 50;
    } else if (currentRut >= 15) {
      sesh.points -= 150;
    }
    sesh.streakClass = 'pointsNormal';
    return sesh;
  }

  throw new Error('--- Points: updateSession: unkown result. ---');
};

export const getRank = (user,session) => {
  

};
