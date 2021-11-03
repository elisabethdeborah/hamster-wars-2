

import { FunctionComponent } from "react"
import { useState } from "react"
import Hamster from '../models/HamsterInterface'
import Matches from '../models/MatchInterface'
import CardProps from "../models/CardProps"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons"




const Card: FunctionComponent<CardProps> = ({hamster, hamsters, setHamsters}) => {
	const [ matchesWon, setMatchesWon ] = useState<Matches[] | null>(null)
	const [ showDisplayHamster, setShowDisplayHamster ] = useState<boolean>(false)
	const [ displayHamster, setDisplayHamster ] = useState<Hamster | null>(null)
	
	const getMatchesWon = async(x:Hamster) => {
		try {
			let response = await fetch("/matchWinners/"+x.id, {method: 'get'})
			let matchesWon = await response.json()
			if (matchesWon.length > 1 ){
			matchesWon.sort((a:Matches,b:Matches) => (a.loserId[0] > b.loserId[0]) ? 1 : ((b.loserId[0] > a.loserId[0]) ? -1 : 0))
			}
			matchesWon.map((x:Matches, index:number)=>{
				if (index>0){
				if (x.loserId === matchesWon[index-1].loserId) {
					console.log('same', x.loserId, matchesWon[index-1].loserId, 'index:', index);
					matchesWon.splice(index,1)
				}
				} else if (index===0 && matchesWon.length > 2) {
					if (x.loserId === matchesWon[index+1].loserId){
					console.log('same first', x.loserId, matchesWon[index+1].loserId, 'index:', index);
					matchesWon.splice(index,1)
				}}
				return matchesWon
			})
			

			setMatchesWon(matchesWon)
		} catch (error) {
			setMatchesWon(null)
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
		<section key={hamster.id+hamster.name} >
			<article onClick={() => handleShowInfo(hamster)} className='hamster-card gallery-card' key={hamster.id} >
				<li key={hamster.age+'h'+hamster.defeats} className="card-img-li" ><img className="card-img" src={`/img/${hamster.imgName}`} alt={hamster.name} /></li>
				<h2 key={hamster.defeats+hamster.wins+'d'+hamster.age}>{hamster.name}</h2>
				
				{ showDisplayHamster && displayHamster && displayHamster.id === hamster.id ? 
					<article key={hamster.id + hamster.age} className="info-overlay">
						<h3>{hamster.name}</h3>
						<li><h3>Age: </h3> {hamster.age} </li>
						<li><h3>Favorite Food: </h3> {hamster.favFood} </li>
						<li><h3>Hobbies: </h3> {hamster.loves} </li>
						<li><h3>Wins: </h3> {hamster.wins} </li>
						<li><h3>Defeats: </h3> {hamster.defeats} </li>
						<li><h3>Games: </h3> {hamster.games} </li>
						{matchesWon? <h3>Defeated: </h3> :null}
						{matchesWon ? console.log(matchesWon):null}
						{matchesWon?
						
						matchesWon.map(match => {
							let defeatedHamster = [hamsters.find(h => h.id === match.loserId)]
							
							return (
								<li key={hamster.id+Math.floor(Math.random()*99)+hamster.id.split('')[Math.floor(Math.random()*hamster.id.split('').length)]}>
									
									{
									defeatedHamster?.map(x => <p key={hamster.id+Math.floor(Math.random()*99)+hamster.id.split('')[Math.floor(Math.random()*hamster.id.split('').length)]}>{x?.name}</p>)} 
								</li>
							)
						}):null
						}
					</article>
					:null	
				}			
			</article>
			<aside className={'remove-gallery-card'} key={ hamster.name} onClick={() => handleDelete(hamster)} ><FontAwesomeIcon icon={faMinusCircle} /></aside>
		</section>
	)
}

export default Card
