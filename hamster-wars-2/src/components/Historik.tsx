
import { useState, useEffect } from "react"
import Hamster from "../models/HamsterInterface"
import Match from '../models/MatchInterface'

const Historik = () => {
	const [ matches, setMatches ] = useState<Match[] | null>(null)
	const [ hamsters, setHamsters ] = useState<Hamster[] | null>(null)

	async function sendRequest(setMatches:any) {
		const response = await fetch('/matches')
		const data = await response.json()
		setMatches(data)
	}
	async function sendHamsterRequest(setHamsters:any) {
		const response = await fetch('/hamsters')
		const data = await response.json()
		setHamsters(data)
	}

	useEffect(() => {
			sendRequest(setMatches)
			sendHamsterRequest(setHamsters)
		}, [])

	
		


	return (
		<section className="matches-history">
		<h2> Historik </h2>
		{ matches? 
		matches.map(m => (
				<article className='match-item' key={m.id} >
					
					{
						hamsters?.map(x =>{
							if (x.id===m.winnerId ){
								return <><img className="matches-img" src={`/img/${x.imgName}`} alt={x.name} />
								<li><h3>Winner: </h3> {x.name} </li></>
							} else if (x.id===m.loserId ){
								return <><img className="matches-img" src={`/img/${x.imgName}`} alt={x.name} />
								<li><h3>Loser: </h3> {x.name} </li></>
							} 
						})
					}
				</article>
			))
			: 'Loading hamsters...'}
		
		</section>
	)
}

export default Historik