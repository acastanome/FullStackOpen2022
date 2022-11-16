import { useState, useEffect } from "react";
import axios from "axios";

const Filters = ({ newFilter, setNewFilter }) => {
	const handleFilterChange = (event) => {
		setNewFilter(event.target.value);
	};

	return (
		<div>
			filter shown with
			<input value={newFilter} onChange={handleFilterChange} />
		</div>
	);
};

const Person = ({ person }) => {
	return (
		<li>
			{person.name} {person.number}
		</li>
	);
};

const Persons = ({ persons, filter }) => {
	if (filter) {
		const personsWithFilters = persons.filter((person) =>
			person.name.toLowerCase().includes(filter.toLowerCase())
		);
		return (
			<ul>
				{personsWithFilters.map((person) => (
					<Person key={person.name} person={person} />
				))}
			</ul>
		);
	} else {
		return (
			<ul>
				{persons.map((person) => (
					<Person key={person.name} person={person} />
				))}
			</ul>
		);
	}
};

const PersonForm = ({
	persons,
	setPersons,
	newName,
	setNewName,
	newNumber,
	setNewNumber,
}) => {
	const addPerson = (event) => {
		event.preventDefault();
		const personObject = {
			name: newName,
			number: newNumber,
		};

		const isNameTaken = persons.filter((person) => person.name === newName);

		if (isNameTaken.length) {
			alert(`${newName} or ${newNumber} is already added to phonebook`);
		} else if (newName.length && newNumber.length) {
			setPersons(persons.concat(personObject));
			setNewName("");
			setNewNumber("");
		}
	};

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	return (
		<form onSubmit={addPerson}>
			<div>
				name: <input value={newName} onChange={handleNameChange} />
			</div>
			<div>
				number: <input value={newNumber} onChange={handleNumberChange} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [newFilter, setNewFilter] = useState("");

	useEffect(() => {
		axios.get("http://localhost:3001/persons").then((response) => {
			setPersons(response.data);
		});
	}, []);

	return (
		<div>
			<h2>Phonebook</h2>
			<Filters new={newFilter} setNewFilter={setNewFilter} />
			<h3>add a new</h3>
			<PersonForm
				persons={persons}
				setPersons={setPersons}
				newName={newName}
				setNewName={setNewName}
				newNumber={newNumber}
				setNewNumber={setNewNumber}
			/>
			<h3>Numbers</h3>
			<Persons persons={persons} filter={newFilter} />
		</div>
	);
};

export default App;
