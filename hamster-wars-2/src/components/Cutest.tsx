
import { useState, useEffect } from "react"
import Hamster from '../models/HamsterInterface'


const Cutest = () => {

	const [ cutestHamster, setCutestHamster ] = useState<Hamster[] | null>(null)


	async function sendRequest(saveData:any) {
		const response = await fetch('/hamsters/cutest')
		const data = await response.json()
		console.log(data, typeof data)
		saveData(data)
	}


	useEffect(() => {
		sendRequest(setCutestHamster)
		
	}, [])


	return (
		<div>
		<h2> Cutest Hamster </h2>
		
		{ cutestHamster? 
		
		cutestHamster.map(x => (
				<article className='hamster-card' key={x.id} >
					<li><img src={`/img/${x.imgName}`} alt={x.name} /></li>
					<li><h3>Name: </h3> <h3 className="hamster-name">{x.name}</h3></li>
					<li><h3>Wins: </h3> {x.wins} </li>
					<li><h3>Defeats: </h3> {x.defeats} </li>
					<li><h3>Games: </h3> {x.games} </li>
					
					
				</article>
			))
			: 'Loading hamsters...'}
		
		</div>
	)
}

export default Cutest