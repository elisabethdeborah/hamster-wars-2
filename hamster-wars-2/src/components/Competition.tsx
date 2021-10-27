
import { useState, useEffect } from "react"
import Hamster from '../models/HamsterInterface'


const Competition = () => {

	const [ contestants, setContestants ] = useState<Hamster[] | null>(null)
	const [ showResult, setShowResult ] = useState<boolean>(false)
	const [ winner, setWinner] = useState<Hamster|null>(null)

	async function requestRandom(saveData:any) {
		const response1 = await fetch('/hamsters/random')
		const data1 = await response1.json()
		const response2 = await fetch('/hamsters/random')
		const data2 = await response2.json()
		setShowResult(false)
		saveData([data1, data2])
	}


	useEffect(() => {
		requestRandom(setContestants)
	}, [])


	const handleVote = (x:Hamster) => {
		setShowResult(true)
		setWinner(x)
		
		//PUT update wins ++
		//PUT update defeats ++
		//PUT update games ++
		if (contestants){
		const winner = x
		const loser = contestants.filter(contestant => contestant !== x)
		console.log('winner: ', winner, 'loser: ', loser[0]);
		}
	}

	const newGame = () => {
		requestRandom(setContestants)
	}



	return (
		<section className='contest-container'>
			{ showResult ? <>
			<h2> And the winner is ...</h2>
			<h1>{winner?.name}</h1>
			<button onClick={() => newGame()}>New Game</button> 
			</>:<>
			<h2> Who Will Win? </h2>
			<h3>Which hamster is the cutest? You decide!</h3>
			</> }
			<section className='contestants'>
				{ contestants? 
				
				contestants.map(x => (
					<article onClick={!showResult? () => handleVote(x): undefined} className={showResult?'hamster-card': 'hamster-card game-card'} key={x.id} >
					<li><img src={`/img/${x.imgName}`} alt={x.name} /></li>
					<li><h3>Name: </h3> <h3 className="hamster-name">{x.name}</h3></li>
					{showResult ? 
						<article className="info-overlay">
						<li><h3>Wins: </h3> {x.wins} </li>
						<li><h3>Defeats: </h3> {x.defeats} </li>
						<li><h3>Games: </h3> {x.games} </li>
						</article>
						:null		
					}
				</article>
					))
					: 'Loading hamsters...'}
			</section>
		</section>
	)
}

export default Competition