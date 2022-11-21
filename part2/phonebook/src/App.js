import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filters from "./components/Filters";
import personService from "./services/persons";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [newFilter, setNewFilter] = useState("");

	useEffect(() => {
		personService.getAll().then((initialPersons) => {
			setPersons(initialPersons);
		});
	}, []);

	const handlePersonDelete = (id, name) => {
		if (window.confirm(`Do you want to delte ${name}?`)) {
			personService.deletePerson(id);
			setPersons(persons.filter((person) => person.id !== id));
		}
	};

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
			<Persons
				persons={persons}
				filter={newFilter}
				handlePersonDelete={handlePersonDelete}
			/>
		</div>
	);
};

export default App;
