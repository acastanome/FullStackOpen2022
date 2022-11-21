import personService from "../services/persons";

const PersonForm = ({
	persons,
	setPersons,
	newName,
	setNewName,
	newNumber,
	setNewNumber,
	someMessage,
	setSomeMessage,
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
						setSomeMessage(`Changed number of ${newName}`);
						setTimeout(() => {
							setSomeMessage(null);
						}, 5000);
						setNewName("");
						setNewNumber("");
					})
					.catch((error) => {
						setSomeMessage(
							`Information of ${newName} has already been removed from the server`
						);
						setTimeout(() => {
							setSomeMessage(null);
						}, 5000);
						setPersons(persons.filter((p) => p.id !== isNameTaken[0].id));
					});
			}
		} else if (newName.length && newNumber.length) {
			personService.create(personObject).then((returnedPerson) => {
				setPersons(persons.concat(returnedPerson));
				setSomeMessage(`Added ${newName}`);
				setTimeout(() => {
					setSomeMessage(null);
				}, 5000);
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
