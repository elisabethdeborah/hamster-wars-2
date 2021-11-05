
//import { abort } from "process"
import { useState, useEffect } from "react"
import Hamster from '../models/HamsterInterface'
import HeaderProps from "../models/HeaderProps"
import ResultsInfoOverlay from "./ResultsInfoOverlay"

const Competition = ({header1, setHeader1, header2, setHeader2}:HeaderProps) => {

	const [ contestants, setContestants ] = useState<Hamster[] | null>(null)
	const [ showResult, setShowResult ] = useState<boolean>(false)
	const [ winner, setWinner] = useState<Hamster|null>(null)
	const [ loser, setLoser ] = useState<Hamster|null>(null)
	const [ doneLoadingUpdate, setDoneLoadingUpdate ] = useState<boolean>(false)

	//const [ winnerUpdated, setWinnerUpdated ] = useState<boolean>(false)
	//const [ loserUpdated, setLoserUpdated ] = useState<boolean>(false)
	

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
		setHeader1('Who Will Win?')
		setHeader2('Vilken hamster är sötast? You decide!')
		requestRandom(setContestants)
	}, [setHeader2, setHeader1])


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
	

	const newGame = () => {
		requestRandom(setContestants)
		setWinner(null)
		setLoser(null)
		setDoneLoadingUpdate(false)
	}


	const updateLoser =async(y:Hamster) =>{
		setLoser(y)
		await fetch("/hamsters/"+y.id, {
			method: 'put', 
			body:JSON.stringify({ defeats: y.defeats+1, games: y.games+1}),
			headers: {
				"Content-Type": "application/json"
			}
			})
			//setLoserUpdated(true)
		}

	const updateWinner = async(x:Hamster) => {
		setWinner(x)
		//PUT update wins ++, games ++
		await fetch("/hamsters/"+x.id, {
				method: 'put', 
				body:JSON.stringify({ wins: x.wins+1, games: x.games+1}),
				headers: {
					"Content-Type": "application/json"
				}
			})
			
			//setWinnerUpdated(true)
		}


	const handleClick = async(x:Hamster, y:Hamster) => {
		console.log('showResult:', showResult);
		
		
		await updateMatches(x, y)
		await updateLoser(y)
		await updateWinner(x)
		setDoneLoadingUpdate(true)
	}

	
	return (
		<section className='contest-container'>
			{ winner ? 
				<>
				<h2>And the winner is ...</h2>
				<h2 className="winner-is-header">{winner?.name}</h2>
				<button onClick={() => newGame()}>New Game</button> 
				</>:<>
				<h2> Click on a card </h2>
				</> 
			}
			<section className='contestants'>
			{ contestants ?
				<>
				{
				!doneLoadingUpdate && !winner && !loser ? 
					contestants.map(x => (
						<article onClick={!showResult? () => handleClick(x, contestants?.filter(l=>l!==x)[0]): undefined} className={showResult?'hamster-card': 'hamster-card game-card'} key={x.id} >
							<li><img src={`/img/${x.imgName}`} alt={x.name} /></li>
							<h2 className="hamster-name">{x.name}</h2>
						</article>
					)) 
				: null
				}
				{ 
				winner && loser ? 
				<>
					{
					//contestants?.[0].name === winner.name? 
					<>
						<article className={'hamster-card'} key={winner.id} >
							<li><img src={`/img/${winner.imgName}`} alt={winner.name} /></li>
							<h2 className="hamster-name">{winner.name}</h2>
							<ResultsInfoOverlay hamster={winner} place={'winner'} />
						</article>
						<article className={'hamster-card'} key={loser.id} >
							<li><img src={`/img/${loser.imgName}`} alt={loser.name} /></li>
							<h2 className="hamster-name">{loser.name}</h2>
							<ResultsInfoOverlay hamster={loser} place={'loser'} />
						</article>
					</>
					/* : 
					<>
						<article className={'hamster-card'} key={loser.id} >
							<li><img src={`/img/${loser.imgName}`} alt={loser.name} /></li>
							<h2 className="hamster-name">{loser.name}</h2>
							<ResultsInfoOverlay hamster={loser}/>
						</article>
						<article className={'hamster-card'} key={winner.id} >
							<li><img src={`/img/${winner.imgName}`} alt={winner.name} /></li>
							<h2 className="hamster-name">{winner.name}</h2>
							<ResultsInfoOverlay hamster={winner} />
						</article>
					</> */
					}
				</>
				: null
				}
				</>: 'Laddar hamstrar...'		
			}
			</section>
		</section>
	)
}

export default Competition
