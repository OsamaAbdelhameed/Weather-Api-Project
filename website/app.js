/* Global Variables */
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiKey = '&APPID=cdb7eaa47f5405e91bf0e56b2cc4b93b&units=imperial';
const apiUrl = 'http://localhost:8081/';

const zip = document.getElementById('zip')
const feelings = document.getElementById('feelings')
const date = document.getElementById('date')
const temp = document.getElementById('temp')
const content = document.getElementById('content')
const city = document.getElementById('city')

/* Function called by event listener */
const clicked = () => {

    if (!(!isNaN(zip.value) && (function(x) { return (x | 0) === x; })(parseFloat(zip.value)))) {
        return alert('enter a number in zip input')
    }
    let data = {
        zip: zip.value,
        content: feelings.value,
        date: d,
    };
    getApiData(data.zip)
        .then(inform => {
            console.log(inform)
            data.temp = inform.list[0].main.temp;
            data.city = inform.city.name;
            data.country = inform.city.country;
            console.log(data)
            postData(data);
        })
}

/* Function to GET Web API Data*/
const getApiData = async(z) => {
    try {
        return await (await fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${z}${apiKey}`)).json();
    } catch (err) {
        console.log("err: ", err);
    }
}

/* Function to POST data */
const postData = async(data) => {
    let response = await fetch(`${apiUrl}postData`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    try {
        response.json().then(data => {
            displayProjectData();
        })
    } catch (err) {
        console.log('err: ', err)
    }
}

/* Function to GET Project Data */
const displayProjectData = async() => {
    let response = await fetch(`${apiUrl}all`)
    try {
        response.json().then(data => {
            date.innerHTML = `Today is: ${newDate}`
            temp.innerHTML = `Tempruture is: ${data.temp}`
            city.innerHTML = `Location: ${data.city}, ${data.country}`
            content.innerHTML = `I feel ${data.content}`
            document.querySelector('#entryHolder').style.fontSize = '25px'
            document.querySelector('.title').style.color = '#f0d43a'
            document.querySelector('.title').style.fontSize = '30px'
            document.querySelector('.title').style.fontWeight = 'bold'
        })
    } catch (err) {
        console.log('err: ', err)
    }
}

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', clicked)