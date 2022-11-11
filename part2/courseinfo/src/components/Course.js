const Total = ({ course }) => {
	const exercises = course.parts.map((part) => part.exercises);
	const sum = exercises.reduce((a, b) => a + b, 0);
	return <h3>total of {sum} exercises</h3>;
};

const Part = ({ part }) => (
	<p>
		{part.name} {part.exercises}
	</p>
);

const Content = ({ course }) => {
	return course.parts.map((part) => <Part key={part.id} part={part} />);
};

const Header = ({ course }) => <h2>{course.name}</h2>;

const Course = ({ id, course }) => {
	return (
		<div>
			<Header course={course} />
			<Content course={course} />
			<Total course={course} />
		</div>
	);
};

export default Course;
