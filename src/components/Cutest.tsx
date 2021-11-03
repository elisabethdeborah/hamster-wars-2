
import { useState, useEffect } from "react"
import Hamster from '../models/HamsterInterface'

const Cutest = () => {
	const [ cutestHamster, setCutestHamster ] = useState<Hamster[] | null>(null)
	const [ errorExists, setError ] = useState<boolean>(false)
	
	async function sendRequest(saveData:any) {
		try {
			const response = await fetch('/hamsters/cutest')
			if (!response.ok) {
				throw new Error(response.statusText);
			} else {
				const data = await response.json()
				saveData(data)
			}
		} catch (error) {
			console.log(error);
			setError(true)
		}
	}
	
	useEffect(() => {
		sendRequest(setCutestHamster)
	}, [])

	if (cutestHamster && cutestHamster?.length > 1) {
		let getRandomCutie:Hamster = cutestHamster[Math.floor(Math.random()*cutestHamster.length)]
		setCutestHamster([getRandomCutie])
	}

	
	return (
		!errorExists ? 
		<div>
		<h2> Defending Champion </h2>
		
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
			: 'Laddar hamstrar...'}
		
		</div>
		:<div>
			<h2>Nånting klickar inte... Kom tillbaka om en stund om du vill se vilken hamster som leder!</h2>
		</div>
	)
}

export default Cutest