
import { useState, useEffect } from "react"
import Hamster from '../models/HamsterInterface'

const Competition = () => {

	const [ contestants, setContestants ] = useState<Hamster[] | null>(null)
	const [ showResult, setShowResult ] = useState<boolean>(false)
	const [ winner, setWinner] = useState<Hamster|null>(null)
	const [ loser, setLoser ] = useState<Hamster|null>(null)
	const [ doneLoadingUpdate, setDoneLoadingUpdate ] = useState<boolean>(false)

	const [ winnerUpdated, setWinnerUpdated ] = useState<boolean>(false)
	const [ loserUpdated, setLoserUpdated ] = useState<boolean>(false)
	

	async function requestRandom(saveData:any) {
		const response1 = await fetch('/hamsters/random')
		const data1 = await response1.json()
		let response2 = await fetch('/hamsters/random')
		let data2 = await response2.json()

		//WHILE LOOP - WHILE DATA1.ID === DATA2.ID -> FETCH NEW RANDOM
		while (data1.id === data2.id) {
			response2 = await fetch('/hamsters/random')
			data2 = await response2.json()
		}
		setShowResult(false)
		saveData([data1, data2])
	}


	useEffect(() => {
		requestRandom(setContestants)
	}, [])


	const fetchUpdated = async(winner:Hamster, loser:Hamster) => {
		const responseWinner = await fetch("/hamsters/"+winner.id, {
			method: 'get', 
		})
		const winnerInfo = await responseWinner.json()
		setWinner(winnerInfo)
		const responseLoser = await fetch("/hamsters/"+loser.id, {
			method: 'get', 
		})
		const loserInfo = await responseLoser.json()
		setLoser(loserInfo)
	}

	const updateWinner = async(winner:Hamster) => {
		//PUT update wins ++, games ++
		console.log(winnerUpdated);
		
		if (!winnerUpdated) {
			await fetch("/hamsters/"+winner.id, {
				method: 'put', 
				body:JSON.stringify({ wins: winner.wins+1, games: winner.games+1}),
				headers: {
					"Content-Type": "application/json"
				}
			})
		}

		setWinnerUpdated(true)
	}

	const updateLoser = async(loser:Hamster) => {
		//PUT update defeats ++, games++
		console.log(loserUpdated);

		if (!loserUpdated) {
			await fetch("/hamsters/"+loser.id, {
				method: 'put', 
				body:JSON.stringify({ defeats: loser.defeats+1, games: loser.games+1}),
				headers: {
					"Content-Type": "application/json"
				}
			})
		}
		setLoserUpdated(true)
	}

	const updateMatches = async(winner:Hamster, loser:Hamster) => {
		//POST new match
		await fetch("/matches/", {
			method: 'post', 
			body:JSON.stringify({ winnerId: winner.id, loserId: loser.id}),
			headers: {
				"Content-Type": "application/json"
			}
		})
	}

	useEffect(() => {
		if ( contestants && winner === contestants[0] ){
			updateLoser(contestants[1])
			setLoser(contestants[1])
			updateWinner(winner)
			fetchAllUpdates(winner, contestants[1])
		} else if (contestants && winner === contestants[1] ) {
			updateLoser(contestants[0])
			updateWinner(winner)
			fetchAllUpdates(winner, contestants[0])
		}
	}, [winner])

	const fetchAllUpdates = async(winner:Hamster, loser: Hamster) => {
		await updateMatches(winner, loser)
		await fetchUpdated(winner, loser)
		setDoneLoadingUpdate(true)
	}

	const newGame = () => {
		requestRandom(setContestants)
		setWinner(null)
		setLoser(null)
		setDoneLoadingUpdate(false)
	}


	return (
		<section className='contest-container'>
			{ showResult ? <>
			<h1> And the winner is ...</h1>
			<h1>{winner?.name}</h1>
			<button onClick={() => newGame()}>New Game</button> 
			</>:<>
			<h1> Who Will Win? </h1>
			<h2>Which hamster is the cutest? You decide!</h2>
			</> }
			<section className='contestants'>
			{contestants ?
<>
				{!doneLoadingUpdate ? 
				
				
				contestants.map(x => (
					<article onClick={!showResult? () => setWinner(x): undefined} className={showResult?'hamster-card': 'hamster-card game-card'} key={x.id} >
					<li><img src={`/img/${x.imgName}`} alt={x.name} /></li>
					<h2 className="hamster-name">{x.name}</h2>
					</article>
				)) 
					: null
					}
				

					{ doneLoadingUpdate && winner && loser ? 
				
					<>
					{contestants?.[0] === winner? 
					<>
					<article className={'hamster-card'} key={winner.id} >
						<li><img src={`/img/${winner.imgName}`} alt={winner.name} /></li>
						<h2 className="hamster-name">{winner.name}</h2>
						<article className="info-overlay competition-overlay">
							<h2>{ winner.name }</h2>
							<li><h3>Wins: </h3> { winner.wins } </li>
							<li><h3>Defeats: </h3> {winner.defeats} </li>
							<li><h3>Games: </h3> {winner.games} </li>
						</article>
					</article>
					<article className={'hamster-card'} key={loser.id} >
						<li><img src={`/img/${loser.imgName}`} alt={loser.name} /></li>
						<h2 className="hamster-name">{loser.name}</h2>
						<article className="info-overlay competition-overlay">
							<h2>{ loser.name }</h2>
							<li><h3>Wins: </h3> { loser.wins } </li>
							<li><h3>Defeats: </h3> {loser.defeats} </li>
							<li><h3>Games: </h3> {loser.games} </li>
						</article>
					</article>
					</>
				: 
				<>
					<article className={'hamster-card'} key={loser.id} >
						<li><img src={`/img/${loser.imgName}`} alt={loser.name} /></li>
						<h2 className="hamster-name">{loser.name}</h2>
						<article className="info-overlay competition-overlay">
							<h2>{ loser.name }</h2>
							<li><h3>Wins: </h3> { loser.wins } </li>
							<li><h3>Defeats: </h3> {loser.defeats} </li>
							<li><h3>Games: </h3> {loser.games} </li>
						</article>
					</article>
					<article className={'hamster-card'} key={winner.id} >
						<li><img src={`/img/${winner.imgName}`} alt={winner.name} /></li>
						<h2 className="hamster-name">{winner.name}</h2>
						<article className="info-overlay competition-overlay">
							<h2>{ winner.name }</h2>
							<li><h3>Wins: </h3> { winner.wins } </li>
							<li><h3>Defeats: </h3> {winner.defeats} </li>
							<li><h3>Games: </h3> {winner.games} </li>
						</article>
					</article>
				</>
				
				}
				</>
					: null}

</>: 'Loading hamsters...'
					
				}
			</section>
		</section>
	)
}

export default Competition
