
import { useState, useEffect } from "react"
import Hamster from '../models/HamsterInterface'
import HeaderProps from "../models/HeaderProps"


const FightersSlackers = ({ setHeader1, setHeader2, setMobileNav}:HeaderProps) => {
	const [ fighters, setFighters ] = useState<Hamster[] | null>(null)
	const [ slackers, setSlackers ] = useState<Hamster[] | null>(null)

	async function sendRequest(setFighters:any, setLosers:any) {
		const fightersResponse = await fetch('/manyMatches')
		const slackersResponse = await fetch('/fewMatches')
		//WINNERS
		const fightersData = await fightersResponse.json()
		const slackersData = await slackersResponse.json()
		
		setFighters(fightersData)
		setLosers(slackersData)
	}


	useEffect(() => {
		setHeader1('Fighters and Slackers')
		setHeader2('')
		sendRequest(setFighters, setSlackers)
		setMobileNav(false)
	}, [setHeader1, setHeader2, setMobileNav])
	

	return (
		<>
		<section className="statistik-container">
		

		<section className="statistik">
		<h2> Flest matcher </h2>
		
		{ fighters? 
		
		fighters.map(x => (
				<article className='hamster-card' key={x.id} >
					<li><img src={x.imgName.includes('http') ? x.imgName : `/img/${x.imgName}`} alt={x.name} /></li>
					<li><h3>Name: </h3> <h3 className="hamster-name">{x.name}</h3></li>
					<li><h3>Wins: </h3> {x.wins} </li>
					<li><h3>Defeats: </h3> {x.defeats} </li>
					<li><h3>Games: </h3> {x.games} </li>
					
					
				</article>
			))
			: 'Loading hamsters...'}
		</section>
		<section className="statistik">
		<h2> Minst matcher </h2>
		
		{ slackers? 
		
		slackers.map(x => (
				<article className='hamster-card' key={x.id} >
					<li><img src={x.imgName.includes('http') ? x.imgName : `/img/${x.imgName}`} alt={x.name} /></li>
					<li><h3>Name: </h3> <h3 className="hamster-name">{x.name}</h3></li>
					<li><h3>Wins: </h3> {x.wins} </li>
					<li><h3>Defeats: </h3> {x.defeats} </li>
					<li><h3>Games: </h3> {x.games} </li>
					
					
				</article>
			))
			: 'Laddar hamstrar...'}
		</section>
		
		</section>
	</>
	)
}

export default FightersSlackers