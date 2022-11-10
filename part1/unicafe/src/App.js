import { useState } from "react";

const Button = ({ handleClick, text }) => (
	<button onClick={handleClick}>{text}</button>
);

const Statistics = ({ good, neutral, bad }) => {
	const votes = good + bad + neutral;
	const average = (good - bad) / votes;
	const positivePercentage = (good / votes) * 100 + "%";
	if (votes > 0) {
		return (
			<table>
				<tbody>
					<StatisticLine text="good" value={good} />
					<StatisticLine text="neutral" value={neutral} />
					<StatisticLine text="bad" value={bad} />
					<StatisticLine text="all" value={votes} />
					<StatisticLine text="average" value={average} />
					<StatisticLine text="positive" value={positivePercentage} />
				</tbody>
			</table>
		);
	} else {
		return <p>No feedback was given</p>;
	}
};

const StatisticLine = ({ text, value }) => {
	return (
		<tr>
			<td>{text}:</td>
			<td>{value}</td>
		</tr>
	);
};

const App = () => {
	//when state is changed, App component is re-rendered, as well as its sub-components
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const handleGoodClick = () => {
		setGood(good + 1);
	};

	const handleNeutralClick = () => {
		setNeutral(neutral + 1);
	};

	const handleBadClick = () => {
		setBad(bad + 1);
	};
	return (
		<div>
			<h1>Give Feedback</h1>
			<Button handleClick={handleGoodClick} text="good" />
			<Button handleClick={handleNeutralClick} text="neutral" />
			<Button handleClick={handleBadClick} text="bad" />
			<h1>Statistics</h1>
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

export default App;
