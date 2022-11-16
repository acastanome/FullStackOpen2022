import { useState, useEffect } from "react";
import axios from "axios";

const Filters = ({ newFilter, setNewFilter }) => {
	const handleFilterChange = (event) => {
		setNewFilter(event.target.value);
	};
	console.log("render filters");
	return (
		<div>
			find countries
			<input value={newFilter} onChange={handleFilterChange} />
		</div>
	);
};

const Countries = ({ countries, filters, setNewFilter }) => {
	console.log("render countries");
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
	console.log("render country name");
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
	console.log("render country");

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
	// const [weather, setWeather] = useState([]);

	// useEffect(() => {
	// 	axios.get("https://openweathermap.org").then((response) => {
	// 		setWeather(response.data);
	// 	});
	// }, []);
	return (
		<div>
			<h4>Weather in {country.capital}</h4>
			<p>temperature Celsius</p>
			<img style={{ width: "100px" }} src={country.flag} alt="weather"></img>
			<p>wind m/s</p>
		</div>
	);
};

const Languages = ({ country }) => {
	console.log("render languages");
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
	console.log("render language");
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

	console.log("render app");

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
