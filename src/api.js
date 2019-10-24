export const getData = async url => {
  return fetch(url).then(res => res.json());
};
