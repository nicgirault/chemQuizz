const api = {
  getCategories(){
    const url = `https://chemquizz-c6ed3.firebaseio.com/categories.json`
    return fetch(url).then((res) => res.json());
  },
  getQuizzList(category){
    const url = `https://chemquizz-c6ed3.firebaseio.com/${category}.json`
    return fetch(url).then((res) => res.json());
  }
}

module.exports = api;
