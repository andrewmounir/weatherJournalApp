/* Global Variables */
// Personal API Key for OpenWeatherMap API
const baseUrl = "http://api.openweathermap.org/data/2.5/forecast?zip=";
const apiKey = "yourkeyunits=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Event listner on button generate found on index.html to send data to the API to retrieve required information to be sent to the server later
document.getElementById("generate").addEventListener("click", performAction);

// Event listner function
function performAction(e) {
  // get zip code entered by user
  let zipCode = document.getElementById("zip").value;

  // get user feeling entered by user
  let userFeeling = document.getElementById("feelings").value;

  // calling  function to send url + zipcode + apiKey to the api server to retrieve required info by the user
  getWeatherData(baseUrl, zipCode, apiKey)
    // chaning with .then so when we receive the data back from the api server we post it to our server.js
    .then(function (data) {
      console.log(data);
      // post data to the server post data
      postData("/push", {
        date: d,
        temp: data.list[0].main.temp,
        content: userFeeling
      });
      dynamicUi();
    });
}
// function to send url + zipcode + apiKey to the api server to retrieve required info by the user
const getWeatherData = async (baseUrl, zipCode, key) => {
  const res = await fetch(baseUrl + zipCode + key);

  try {
    const data = await res.json();
    return data;
    console.log(data);
  } catch (error) {
    console.log(data);
  }
};

// Post function  to post data to our local  server mainly boiler plate

const postData = async (url = "", data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log(error);
  }
};

/*  promise that updates UI dynamically depending on what we receive from the server in get request 
 that contain required data to update the DOM elements in in index.html dynamically */

dynamicUi = async () => {
  const request = await fetch("/all");
  try {
    const data = await request.json();

    document.getElementById("temp").innerHTML = ` Temprature: ${Math.round(
      data.temp
    )}  °`;
    document.getElementById("content").innerHTML = ` Feeling : ${data.content}`;
    document.getElementById("date").innerHTML = ` Date: ${data.date}`;
  } catch (error) {
    console.log(error, "error");
  }
};
