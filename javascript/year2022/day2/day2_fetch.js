// Requires Node v18 to use the fetch API

// Load environment variables from .env file to load cookie value
import dotenv from "dotenv";
dotenv.config();

const url = "https://adventofcode.com/2022/day/2/input";
const cookie = process.env.ADVENT_OF_CODE_COOKIE;
const headers = {
  method: 'GET',
  headers: {
    cookie: `session=${cookie}`
  }
}

console.log(process.env.ADVENT_OF_CODE_COOKIE);

const data = fetch(url, headers).then((response) => response.text());

export default await data;

/*
const getData = async (url) => {
  let data  = await fetch(url, headers)
  let textData = await data.text();
  return textData;
}

const printData = async (url) => {
  let text = await getData(url);
  console.log(text);
}

printData(url);
*/

/*
using promises
function getData(url) {
  return fetch(url, {
    method: 'GET',
    headers: {
      cookie:
        `session=${cookie}`,
    }
  })
    .then((response) => {
      return response.text()
      .then((data) => {
        return data;
      })
    .catch((err) => {
      console.log(err);
    })
  });
}
*/

/*
fetch(url, {
    method: 'GET',
    headers: {
      cookie:
        `session=${cookie}`,
    },
})
  .then((response) => response.text())
  .then((data) => console.log(data));
*/

/*
fetch(url, {
    method: 'GET',
    headers: {
      cookie:
        `session=${cookie}`,
    },
})
  .then((response) => response.text())
  .then((data) => console.log(data));
*/

