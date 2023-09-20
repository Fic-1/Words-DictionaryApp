import { hello as hello } from "./model";
hello();
const newVar = "string";
console.log(newVar);

const fetchWord = async function () {
  const res = await fetch(
    "https://api.dictionaryapi.dev/api/v2/entries/en/food"
  );
  const [data] = await res.json();
  console.log(data);
};

fetchWord();
