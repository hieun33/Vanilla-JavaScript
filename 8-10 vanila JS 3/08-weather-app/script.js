const api = {
	key: "15dd264653ae19e803a868ed7fb3c895",
	base: "https://api.openweathermap.org/data/2.5/",
};

const searchBoxEl = document.querySelector(".search-box");
searchBoxEl.addEventListener("keypress", setQuery);

//날씨데이터 가져오기
function setQuery(e) {
	//keyCode 13 은 enter
	if (e.keyCode === 13) {
		getResults(searchBoxEl.value);
		console.log(searchBoxEl.value);
	}
}

function getResults(query) {
	fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
		.then((response) => response.json())
		.then((data) => displayResults(data));
}

//날씨 데이터 화면에서 보여주기
function displayResults(weather) {
	console.log(weather); //데이터가 나옴
	//도시관련
	let city = document.querySelector(".location .city");
	city.innerText = `${weather.name} + ${weather.sys.country}`;
	//날짜관련
	let now = new Date();
	let date = document.querySelector(".location .date");
	date.innerText = dateBuilder(now);

	//날씨관련
	let temp = document.querySelector(".current .temp");
	temp.innerHTML = `${Math.round(weather.main.temp).toFixed(
		0
	)}<span>°C</span>`;

	let weatherEl = document.querySelector(".current .weather");
	weatherEl.innerText = weather.weather[0].main;

	let hiLow = document.querySelector(".hi-low");
	hiLow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(
		weather.main.temp_max
	)}°C`;
}

// 날짜관련
function dateBuilder(d) {
	let months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	let day = days[d.getDay()];
	let date = d.getDate();
	let month = months[d.getMonth()];
	const year = d.getFullYear();

	return `${day} ${date} ${month} ${year}`;
}
