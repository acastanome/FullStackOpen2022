const Person = ({ person, handlePersonDelete }) => {
	return (
		<li>
			{person.name} {person.number}
			<button onClick={() => handlePersonDelete(person.id, person.name)}>
				delete
			</button>
		</li>
	);
};

export default Person;
