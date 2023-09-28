export const getAllPokemon = (initialURL) => {
  return new Promise((resolve, reject) => {
    fetch(initialURL).then((res) => res.json()).then((data) => resolve(data));
  })
}

export const getPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url).then((res) => res.json()).then((data) => {
      // console.log(data)
      resolve(data)});
  })
}