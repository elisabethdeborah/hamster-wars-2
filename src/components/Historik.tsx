
import { useState, useEffect } from "react"
//import Hamster from "../models/HamsterInterface"
import HeaderProps from "../models/HeaderProps"
import Match from '../models/MatchInterface'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons"

const Historik = ({ setHeader1, setHeader2, setMobileNav, allHamsters}:HeaderProps) => {
	const [ matches, setMatches ] = useState<Match[] | null>(null)
	//const [ hamsters, setHamsters ] = useState<Hamster[] | null>(null)

	//hämtar alla matcher från databasen
	async function sendRequest(setMatches:any) {
		try {
			const response = await fetch('/matches')
			const data = await response.json()
			setMatches(data)
		} catch (error) {
			console.log('error:', error);
		}
		
	}
	/* async function sendHamsterRequest(setHamsters:any) {
		const response = await fetch('/hamsters')
		const data = await response.json()
		setHamsters(data)
	} */

	//deletar match i databasen som har samma id som matchen som klickas på
	const handleDelete = (x:Match) => {
		if (matches){
			let index:number = matches?.findIndex(i => i.id === x.id)
			let newMatchArray = [...matches] 
			newMatchArray.splice(index,1)
			setMatches(newMatchArray)
			fetch("/matches/"+x.id, {method: 'delete'})
		}
	}

	useEffect(() => {
		setHeader1('Historik')
		setHeader2('Alla matcher som spelats')
		sendRequest(setMatches)
		//sendHamsterRequest(setHamsters)
		setMobileNav(false)
	}, [setHeader2, setHeader1, setMobileNav])

	
	return (
		<section className="matches-history">
		<h2>{matches?.length} {matches && (matches.length > 1 || matches.length === 0) ?'matcher':'match'}</h2>
		{ matches? 
		matches.map(m => (
				<section className='match-item' key={m.id} >
					{
						allHamsters?.map(x =>{
							if (x.id===m.winnerId ){
								return <article key={x.id+m.winnerId} className='history-card' >
									 <li><img className="matches-img" src={`/img/${x.imgName}`} alt={x.name} />
								<h3>Vinnare: </h3> {x.name} </li>
								</article>
							} else if (x.id===m.loserId ){
								return <article  key={x.id+m.loserId} className='history-card' >
									<li><img className="matches-img" src={`/img/${x.imgName}`} alt={x.name} />
								<h3>Förlorare: </h3> {x.name} </li>
								</article>
							} else {
								return null;
							}
						})
					}
					<aside key={ m.id} onClick={() => handleDelete(m)} ><FontAwesomeIcon icon={faMinusCircle} /></aside>
				</section>
			))
			
			: 'Laddar matcher...'}
		
		</section>
	)
}

export default Historik