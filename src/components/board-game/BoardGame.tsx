import React, { useState } from "react";
import "./BoardGame.css";
import { SpecialField } from "../../interfaces/SpecialField";

const specialFields: SpecialField[] = [
	{ position: 11, action: "gameover" },
	{ position: 18, action: "move", target: 10 },
];

const BoardGame: React.FC = () => {
	const [position, setPosition] = useState(0);
	const [rolls, setRolls] = useState(0);
	const [rollsSum, setRollsSum] = useState(0);
	let rollsAverage = 0;
	const [lastRollValue, setLastRollValue] = useState(0);

	const rollDice = () => {
		const roll = Math.floor(Math.random() * 6) + 1;
		setRolls(rolls + 1);
		setRollsSum(rollsSum + roll);
		setLastRollValue(roll);

		let newPosition = position + roll;

		if (newPosition >= 19) {
			newPosition -= (newPosition - 19) * 2;
		}

		for (const field of specialFields) {
			if (newPosition === field.position) {
				if (field.action === "gameover") {
					newPosition = field.position;
				} else if (field.action === "move" && field.target) {
					newPosition = field.target;
				}
			}
		}

		setPosition(newPosition);
	};

	const isGameWon = position === 19;
	const isGameOver = position === 11;

	if (isGameWon || isGameOver) {
		let average = rollsSum / rolls;
		average = Math.round(average * 100) / 100;
		rollsAverage = average;
	}

	return (
		<div className="main-container">
			<h1>Board Game</h1>
			{isGameWon && <h3>Wygrałeś - trafiłeś na pole 20!</h3>}
			{isGameOver && <h3>Przegrałeś - trafiłeś na pole 12.</h3>}
			{(isGameWon || isGameOver) && (
				<ul>
					<li>Liczba rzutów: {rolls}.</li>
					<li>Średnia liczba wyrzuconych oczek: {rollsAverage}</li>
					<li>Ostatnia wyrzucona wartość: {lastRollValue}</li>
				</ul>
			)}
			{!isGameWon && !isGameOver && (
				<div className="stats">
					<p>Pozycja na planszy: {position + 1}</p>
					<p>Liczba rzutów: {rolls}</p>
					<p></p>

					<button onClick={rollDice}>Rzuć kostką</button>
					{lastRollValue !== 0 && (
						<p>
							<i>Ostatnia wyrzucona wartość: {lastRollValue}</i>
						</p>
					)}
				</div>
			)}
			<div className="board">
				{Array.from({ length: 20 }).map((_, i) => (
					<div
						key={i}
						className={`field  ${i === position ? "current" : ""} ${
							i === 11 || i === 19 ? "special" : ""
						}`}
					>
						{i + 1}
					</div>
				))}
			</div>
		</div>
	);
};

export default BoardGame;
