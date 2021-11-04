
import { useState, useEffect } from "react"
import Hamster from "../models/HamsterInterface"
import Match from '../models/MatchInterface'

const Historik = () => {
	const [ matches, setMatches ] = useState<Match[] | null>(null)
	const [ hamsters, setHamsters ] = useState<Hamster[] | null>(null)

	async function sendRequest(setMatches:any) {
		try {
			const response = await fetch('/matches')
			const data = await response.json()
			setMatches(data)
		} catch (error) {
			console.log('error:', error);
		}
		
	}
	async function sendHamsterRequest(setHamsters:any) {
		const response = await fetch('/hamsters')
		const data = await response.json()
		setHamsters(data)
	}

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
			sendRequest(setMatches)
			sendHamsterRequest(setHamsters)
		}, [])


	return (
		<section className="matches-history">
		<h1> Historik </h1>
		{ matches? 
		matches.map(m => (
				<section className='match-item' key={m.id} >
					
					{
						hamsters?.map(x =>{
							if (x.id===m.winnerId ){
								return <article key={x.id+m.winnerId} className='history-card' >
									 <li><img className="matches-img" src={`/img/${x.imgName}`} alt={x.name} />
								<h3>Winner: </h3> {x.name} </li>
								</article>
							} else if (x.id===m.loserId ){
								return <article  key={x.id+m.loserId} className='history-card' >
									<li><img className="matches-img" src={`/img/${x.imgName}`} alt={x.name} />
								<h3>Loser: </h3> {x.name} </li>
								</article>
							} else {
								return null;
							}
						})
					}
					<aside key={ m.id} onClick={() => handleDelete(m)} >Remove</aside>
				</section>
			))
			: 'Laddar matcher...'}
		
		</section>
	)
}

export default Historik