
import { useState, useEffect } from "react"
import Hamster from '../models/HamsterInterface'











//SORTERA I FALLANDE ORDNING, NU SLUMPMÄSSIGT
//VARFÖR WINS/DEFEATS/GAMES === 2?????












const Statistik = () => {
	const [ winners, setWinners ] = useState<Hamster[] | null>(null)
	const [ losers, setLosers ] = useState<Hamster[] | null>(null)

	async function sendRequest(setWinners:any, setLosers:any) {
		const winnersResponse = await fetch('/winners')
		const losersResponse = await fetch('/losers')
		//WINNERS
		const winnersData = await winnersResponse.json()
		const losersData = await losersResponse.json()
		
		setWinners(winnersData)
		setLosers(losersData)
	}


	useEffect(() => {
		sendRequest(setWinners, setLosers)
		
	}, [])


	return (
		<>
		<h1>Statistik</h1>
		<section className="statistik-container">
		

		<section className="statistik">
		<h2> Top Five </h2>
		
		{ winners? 
		
		winners.map(x => (
				<article className='hamster-card' key={x.id} >
					<li><img src={`/img/${x.imgName}`} alt={x.name} /></li>
					<li><h3>Name: </h3> <h3 className="hamster-name">{x.name}</h3></li>
					<li><h3>Wins: </h3> {x.wins} </li>
					<li><h3>Defeats: </h3> {x.defeats} </li>
					<li><h3>Games: </h3> {x.games} </li>
					
					
				</article>
			))
			: 'Loading hamsters...'}
		</section>
		<section className="statistik">
		<h2> Bottom Five </h2>
		
		{ losers? 
		
		losers.map(x => (
				<article className='hamster-card' key={x.id} >
					<li><img src={`/img/${x.imgName}`} alt={x.name} /></li>
					<li><h3>Name: </h3> <h3 className="hamster-name">{x.name}</h3></li>
					<li><h3>Wins: </h3> {x.wins} </li>
					<li><h3>Defeats: </h3> {x.defeats} </li>
					<li><h3>Games: </h3> {x.games} </li>
					
					
				</article>
			))
			: 'Loading hamsters...'}
		</section>
		
		</section>
	</>
	)
}

export default Statistik