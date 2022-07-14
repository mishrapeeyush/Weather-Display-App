let weather = {
    apiKey: "a8abea23a8f14931c0e62b304aa73679",    //API key obtained from service of https://openweathermap.org

    fetchWeather: function (city) {    //defining function for fetching data from https://openweathermap.org from a city entered by user

        fetch("https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        )

            .then((response) => {        
                if (!response.ok) {
                    alert("This City Does Not Exist!");     //throwing an error in the event where the user enters an invalid input
                    throw new Error("This City Does Not Exist!");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {     //this function is defined to display weather that is obtained from https://openweathermap.org

        const { name } = data;     //Storing useful data from API
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        document.querySelector(".city").innerText = "Weather in " + name;  //This will take city's name
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png"; //Thsi will set icon depicting weather
        document.querySelector(".description").innerText = description; 
        document.querySelector(".temp").innerText = temp + "°C";   //This command is used to set temperature of city
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";   //This will set humidity in percentage
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";  //This will set the speed of wind 
        document.querySelector(".weather").classList.remove("loading");  //On getting the data, the loading class will be removed.

        //DOM manipulation to display all the values in frontend;

        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";  //We use unsplash.com to produce relevant images of city that has been entered by user

    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click", function () {   //This command is used to use search button for making a search of the city entered by user. 
    weather.search();
});

document
    .querySelector(".search-bar").addEventListener("keyup", function (event) {  //We define a command where user can request data from API by just clicking enter button after entering city name.
        if (event.key == "Enter") {
            weather.search();
        }
    });

weather.fetchWeather("Kozhikode");  //By default, it shows data of Kozhikode