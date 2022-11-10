import { useState } from "react";

const Display = ({ anecdotes, selected, votes }) => (
	<>
		<div>{anecdotes[selected]}</div>
		<div>has {votes[selected]} votes</div>
	</>
);

const Button = ({ handleClick, text }) => (
	<button onClick={handleClick}>{text}</button>
);

const App = () => {
	const anecdotes = [
		"If it hurts, do it more often.",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
	];

	const [selected, setSelected] = useState(0);
	const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0]);
	const [maxindex, setMaxIndex] = useState(0);

	const handleVoteClick = () => {
		const copy = [...votes];
		copy[selected] += 1;
		setVotes(copy);
		setMaxIndex(copy.indexOf(Math.max(...copy)));
	};

	const handleNextClick = () => {
		setSelected(Math.round(Math.random() * 6));
	};

	return (
		<>
			<h1>Anecdote of the day</h1>
			<Display anecdotes={anecdotes} selected={selected} votes={votes} />
			<Button handleClick={handleVoteClick} text="vote" />
			<Button handleClick={handleNextClick} text="next anecdote" />
			<h1>Anecdote with most votes</h1>
			<Display anecdotes={anecdotes} selected={maxindex} votes={votes} />
		</>
	);
};

export default App;
