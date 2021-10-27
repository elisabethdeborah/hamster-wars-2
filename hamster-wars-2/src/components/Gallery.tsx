
import { useState, useEffect } from "react"
import Hamster from '../models/HamsterInterface'


const Gallery = () => {

	const [ allHamsters, setAllHamsters ] = useState<Hamster[] | null>(null)


	async function sendRequest(saveData:any) {
		const response = await fetch('/hamsters')
		const data = await response.json()
		console.log(data, typeof data)
		saveData(data)
	}


	useEffect(() => {
		sendRequest(setAllHamsters)
		
	}, [])


	return (
		<>
		<h2> Hamsters </h2>
		<section className="gallery-container">
		{ allHamsters? 
		
		allHamsters.map(x => (
				<article className='hamster-card' key={x.id} >
					<li><img src={`/img/${x.imgName}`} alt={x.name} /></li>
					<li><h3>Name: </h3> <h3 className="hamster-name">{x.name}</h3></li>
					{/* <li><h3>Wins: </h3> {x.wins} </li>
					<li><h3>Defeats: </h3> {x.defeats} </li>
					<li><h3>Games: </h3> {x.games} </li> */}
					
					<aside onClick={() => console.log('remove: ',x.id)} >Remove</aside>
				</article>
			))
			: 'Loading hamsters...'}
		
		</section>
		</>
	)
}

export default Gallery