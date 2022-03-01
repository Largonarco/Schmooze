export const splitArrayby10 = (input) => {
  const array = [];

  for (let i = 0; i < input.length; i + 10) {
    const snip = input.splice(i, 10);
    array.push(snip);
  }

  return array;
};
