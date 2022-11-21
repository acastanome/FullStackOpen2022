import personService from "../services/persons";

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

		if (isNameTaken.length && newNumber.length) {
			if (
				window.confirm(
					`${newName} is already added to the phonebook, replace the old number with a new one?`
				)
			) {
				personService
					.update(isNameTaken[0].id, personObject)
					.then((returnedPerson) => {
						setPersons(
							persons.map((p) =>
								p.id !== isNameTaken[0].id ? p : returnedPerson
							)
						);
						setNewName("");
						setNewNumber("");
					});
			}
		} else if (newName.length && newNumber.length) {
			personService.create(personObject).then((returnedPerson) => {
				setPersons(persons.concat(returnedPerson));
				setNewName("");
				setNewNumber("");
			});
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

export default PersonForm;
