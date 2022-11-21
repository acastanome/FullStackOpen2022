import Person from "./Person";

const Persons = ({ persons, filter, handlePersonDelete }) => {
	if (filter) {
		const personsWithFilters = persons.filter((person) =>
			person.name.toLowerCase().includes(filter.toLowerCase())
		);
		return (
			<ul>
				{personsWithFilters.map((person) => (
					<Person
						key={person.id}
						person={person}
						handlePersonDelete={handlePersonDelete}
					/>
				))}
			</ul>
		);
	} else {
		return (
			<ul>
				{persons.map((person) => (
					<Person
						key={person.id}
						person={person}
						handlePersonDelete={handlePersonDelete}
					/>
				))}
			</ul>
		);
	}
};

export default Persons;
