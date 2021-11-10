
import { useState, useEffect } from "react"
import HeaderProps from "../models/HeaderProps"
import Match from '../models/MatchInterface'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons"
import Hamster from "../models/HamsterInterface"

const Historik = ({ setHeader1, setHeader2, setMobileNav}:HeaderProps) => {
	const [ matches, setMatches ] = useState<Match[] | null>(null)
	const [ errorExists, setError ] = useState<boolean>(false)
	const [ allHamsters, setAllHamsters ] = useState<Hamster[] | null>(null)
	//hämtar alla matcher från databasen
	async function sendRequest(setMatches:any) {
		try {
			const response = await fetch('/matches')
			const data = await response.json()
			setMatches(data)
		} catch (error) {
			console.log('error:', error);
			setError(true)
		}	
	}

	async function sendHamsterRequest(setAllHamsters:any) {
		try {
			const response = await fetch('/hamsters')
			const data = await response.json()
			setAllHamsters(data)
		} catch (error) {
			console.log('error:', error);
		}
	}

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
		sendHamsterRequest(setAllHamsters)
		setMobileNav(false)
	}, [setHeader2, setHeader1, setMobileNav])

	
	return (
		<section className="matches-history">
		{ 
		!errorExists ?
			<h2>{matches?.length} {matches && (matches.length > 1 || matches.length === 0) ?'matcher':'match'}</h2>
			:''}
		{
		!errorExists ?
		matches ? 
		matches.map(m => (
				<section className='match-item' key={m.id} >
					{
						allHamsters?.map(x =>{
							if (x.id===m.winnerId ){
								return <article key={x.id+m.winnerId} className='history-card' >
									 <li><img className="matches-img" src={x.imgName.includes('http') ? x.imgName : `/img/${x.imgName}`} alt={x.name} />
								<h3>Vinnare: </h3> {x.name} </li>
								</article>
							} else if (x.id===m.loserId ){
								return <article  key={x.id+m.loserId} className='history-card' >
									<li><img className="matches-img" src={x.imgName.includes('http') ? x.imgName : `/img/${x.imgName}`} alt={x.name} />
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
			
			: 'Laddar matcher...'
		:<h2>Det finns inga matcher att visa!</h2>
		}
		
		</section>
	)
}

export default Historik