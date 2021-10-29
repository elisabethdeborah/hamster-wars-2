

import { FunctionComponent } from "react"
import { useState, useEffect } from "react"
import Hamster from '../models/HamsterInterface'
import Match from "../models/MatchInterface"
import Matches from '../models/MatchInterface'

interface CardProps {
	hamster:Hamster;
	/* deleteItem: any;
	showInfo: any; */
	hamsters: Hamster[];
	/* showDisplay: boolean;
	display: Hamster | null; */
	setHamsters: any;
}





const Card: FunctionComponent<CardProps> = ({hamster,/* , deleteItem, showInfo */hamsters/* ,showDisplay, display */, setHamsters}) => {
	const [ matchesWon, setMatchesWon ] = useState<Matches | null>(null)
	const [ showDisplayHamster, setShowDisplayHamster ] = useState<boolean>(false)
	const [ displayHamster, setDisplayHamster ] = useState<Hamster | null>(null)
	const getMatchesWon = async(x:Hamster) => {
		try {
			let response = await fetch("/matchWinners/"+x.id, {method: 'get'})
			let matchesWon = await response.json()
			
			
			matchesWon = matchesWon.map((m:Match) => {
				console.log(m.loserId);
			})
			setMatchesWon(matchesWon)	
		} catch (error) {
			console.log('error: ', error);
			
		}
	}

	const handleShowInfo = (x:Hamster) => {
		fetch("/hamsters/"+x.id, {method: 'get'})
		getMatchesWon(x)
		setShowDisplayHamster(!showDisplayHamster)
		setDisplayHamster(x)
	}

	const handleDelete = (x:Hamster) => {
		if (hamsters){
			let index:number = hamsters?.findIndex(i => i.id === x.id)
			let newHamsterArray = [...hamsters] 
			newHamsterArray.splice(index,1)
			setHamsters(newHamsterArray)
			fetch("/hamsters/"+x.id, {method: 'delete'})
		}
	}
	
	return (
		<section key={hamster.id+hamster.name}>
			<article onClick={() => handleShowInfo(hamster)} className='hamster-card' key={hamster.id} >
				<li className="card-img-li" ><img className="card-img" src={`/img/${hamster.imgName}`} alt={hamster.name} /></li>
				<h2>{hamster.name}</h2>
				
				{ showDisplayHamster && displayHamster && displayHamster.id === hamster.id ? 
					<article className="info-overlay">
						<h3>{hamster.name}</h3>
						<li><h3>Age: </h3> {hamster.age} </li>
						<li><h3>Favorite Food: </h3> {hamster.favFood} </li>
						<li><h3>Hobbies: </h3> {hamster.loves} </li>
						<li><h3>Wins: </h3> {hamster.wins} </li>
						<li><h3>Defeats: </h3> {hamster.defeats} </li>
						<li><h3>Games: </h3> {hamster.games} </li>
					</article>
					:null	
				}			
			</article>
			<aside key={ hamster.name} onClick={() => handleDelete(hamster)} >Remove</aside>
		</section>
 
	)
}

export default Card


/* 
<article className={'hamster-card'} key={loser.id} >
						<li><img src={`/img/${loser.imgName}`} alt={loser.name} /></li>
						<h2 className="hamster-name">{loser.name}</h2>
						<article className="info-overlay">
							<h2>{ loser.name }</h2>
							<li><h3>Wins: </h3> { loser.wins } </li>
							<li><h3>Defeats: </h3> {loser.defeats} </li>
							<li><h3>Games: </h3> {loser.games} </li>
						</article>
					</article>
*/