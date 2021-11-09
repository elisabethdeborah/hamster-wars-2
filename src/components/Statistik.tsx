
import { useState, useEffect } from "react"
import Hamster from '../models/HamsterInterface'
import HeaderProps from "../models/HeaderProps"


const Statistik = ({ setHeader1, setHeader2, setMobileNav}:HeaderProps) => {
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
		setHeader1('Statistik')
		setHeader2('5 bästa och 5 sämsta')
		sendRequest(setWinners, setLosers)
		setMobileNav(false)
	}, [setHeader1, setHeader2, setMobileNav])

	return (
		<>
		<section className="statistik-container">
		

		<section className="statistik">
		<h2> Top Five </h2>
		
		{ winners? 
		
		winners.map(x => (
				<article className='hamster-card' key={x.id} >
					<li><img src={x.imgName.includes('http') ? x.imgName : `/img/${x.imgName}`} alt={x.name} /></li>
					<li><h3>Name: </h3> <h3 className="hamster-name">{x.name}</h3></li>
					<li><h3>Wins: </h3> {x.wins} </li>
					<li><h3>Defeats: </h3> {x.defeats} </li>
					<li><h3>Games: </h3> {x.games} </li>
				</article>
			))
			: 'Laddar vinnare...'}
		</section>
		<section className="statistik">
		<h2> Bottom Five </h2>
		
		{ losers? 
		
		losers.map(x => (
				<article className='hamster-card' key={x.id} >
					<li><img src={x.imgName.includes('http') ? x.imgName : `/img/${x.imgName}`} alt={x.name} /></li>
					<li><h3>Name: </h3> <h3 className="hamster-name">{x.name}</h3></li>
					<li><h3>Wins: </h3> {x.wins} </li>
					<li><h3>Defeats: </h3> {x.defeats} </li>
					<li><h3>Games: </h3> {x.games} </li>
				</article>
			))
			: 'Laddar förlorare...'}
		</section>
		
		</section>
	</>
	)
}

export default Statistik