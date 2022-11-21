import { useState, useEffect } from "react";
import axios from "axios";

const Filters = ({ newFilter, setNewFilter }) => {
	const handleFilterChange = (event) => {
		setNewFilter(event.target.value);
	};
	return (
		<div>
			find countries
			<input value={newFilter} onChange={handleFilterChange} />
		</div>
	);
};

const Countries = ({ countries, filters, setNewFilter }) => {
	if (filters) {
		const countriesFiltered = countries.filter((country) =>
			country.name.toLowerCase().includes(filters.toLowerCase())
		);
		if (countriesFiltered.length > 1 && countriesFiltered.length <= 10) {
			return (
				<ul>
					{countriesFiltered.map((country) => (
						<CountryName
							key={country.name}
							country={country}
							setNewFilter={setNewFilter}
						/>
					))}
				</ul>
			);
		} else if (countriesFiltered.length === 1) {
			return <Country country={countriesFiltered[0]} />;
		}
	}
	return <div>Too many matches, specify another filter</div>;
};

const CountryName = ({ country, setNewFilter }) => {
	return (
		<li>
			{country.name}{" "}
			<button
				onClick={() => {
					setNewFilter(country.name);
				}}
			>
				Show
			</button>
		</li>
	);
};

const Country = ({ country }) => {
	return (
		<div>
			<h3>{country.name}</h3>
			<p>capital {country.capital}</p>
			<p>area {country.area}</p>
			<Languages key={country} country={country} />
			<img style={{ width: "130px" }} src={country.flag} alt="flag"></img>
			<Weather country={country} />
		</div>
	);
};

const Weather = ({ country }) => {
	const api_key = process.env.REACT_APP_API_KEY;
	const params = new URLSearchParams([
		["lat", country.latlng[0]],
		["lon", country.latlng[1]],
		["appid", api_key],
	]);
	const [weather, setWeather] = useState([]);

	useEffect(() => {
		axios
			.get("https://api.openweathermap.org/data/2.5/weather?", { params })
			.then((response) => {
				setWeather(response.data);
			});
	}, []);
	if (weather.length !== 0) {
		return (
			<div>
				<h4>Weather in {country.capital}</h4>
				<p>temperature {(weather.main.temp - 273.15).toFixed(2)} Celsius</p>
				<img
					style={{ width: "100px" }}
					src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
					alt="weather"
				></img>
				<p>wind {weather.wind.speed} m/s</p>
			</div>
		);
	}
};

const Languages = ({ country }) => {
	return (
		<>
			<h4>languages</h4>
			<ul>
				{country.languages.map((language) => (
					<Language key={language.name} language={language.name} />
				))}
			</ul>
		</>
	);
};

const Language = ({ language }) => {
	return <li>{language}</li>;
};

const App = () => {
	const [countries, setCountries] = useState([]);
	const [newFilter, setNewFilter] = useState("");

	useEffect(() => {
		axios.get("https://restcountries.com/v2/all").then((response) => {
			setCountries(response.data);
		});
	}, []);

	return (
		<div>
			<h2>Countries</h2>
			<Filters newFilter={newFilter} setNewFilter={setNewFilter} />
			<Countries
				countries={countries}
				filters={newFilter}
				setNewFilter={setNewFilter}
			/>
		</div>
	);
};

export default App;
