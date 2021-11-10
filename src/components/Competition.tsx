
import { useState, useEffect } from "react"
import Hamster from '../models/HamsterInterface'
import HeaderProps from "../models/HeaderProps"
import ResultsInfoOverlay from "./ResultsInfoOverlay"

const Competition = ({ setHeader1, setHeader2, setMobileNav}:HeaderProps) => {

	const [ contestants, setContestants ] = useState<Hamster[] | null>(null)
	const [ showResult, setShowResult ] = useState<boolean>(false)
	const [ winner, setWinner] = useState<Hamster|null>(null)
	const [ loser, setLoser ] = useState<Hamster|null>(null)
	const [ doneLoadingUpdate, setDoneLoadingUpdate ] = useState<boolean>(false)
	
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
		setMobileNav(false)
	}, [setHeader2, setHeader1, setMobileNav])


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
	}

	const handleClick = async(x:Hamster, y:Hamster) => {
		console.log('showResult:',showResult);
		
		await updateMatches(x, y)
		
		await updateWinner(x)
		await updateLoser(y)
		setDoneLoadingUpdate(true)
	}

	
	return (
		<section className='contest-container'>
			{ winner ? 
				<>
				<h2>And the winner is ...</h2>
				<h2 className="winner-is-header">{winner?.name}</h2>
				<button className="btn-light" onClick={() => newGame()}>Ny omgång</button> 
				</>:<>
				<h2> Klicka på en hamster </h2>
				</> 
			}
			<section className='contestants'>
			{ contestants ?
				<>
				{
					!doneLoadingUpdate && !winner && !loser ? 
						contestants.map(x => (
							<article onClick={!showResult? () => handleClick(x, contestants?.filter(l=>l!==x)[0]): undefined} className={showResult?'hamster-card': 'hamster-card game-card'} key={x.id} >
								<li><img src={x.imgName.includes('http') ? x.imgName : `/img/${x.imgName}`} alt={x.name} /></li>
								<h2 className="hamster-name">{x.name}</h2>
							</article>
						)) 
					: null
				}
				{ 
					winner && loser ? 
					<>
						{
						<>
							<article className={'hamster-card'} key={winner.id} >
								<li><img src={winner.imgName.includes('http') ? winner.imgName : `/img/${winner.imgName}`} alt={winner.name} /></li>
								<h2 className="hamster-name">{winner.name}</h2>
								<ResultsInfoOverlay hamster={winner} place={'winner'} />
							</article>
							<article className={'hamster-card'} key={loser.id} >
								<li><img src={loser.imgName.includes('http') ? loser.imgName : `/img/${loser.imgName}`} alt={loser.name} /></li>
								<h2 className="hamster-name">{loser.name}</h2>
								<ResultsInfoOverlay hamster={loser} place={'loser'} />
							</article>
						</>
						}
					</>
					: null
				}
				</>
				: 'Laddar hamstrar...'		
			}
			</section>
		</section>
	)
}

export default Competition
