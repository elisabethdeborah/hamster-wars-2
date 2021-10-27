
import { useState, useEffect } from "react"
import Hamster from '../models/HamsterInterface'
import AddForm from './AddForm'


const Gallery = () => {

	const [ allHamsters, setAllHamsters ] = useState<Hamster[] | null>(null)
	const [ showDisplayHamster, setShowDisplayHamster ] = useState<boolean>(false)
	const [ displayHamster, setDisplayHamster ] = useState<Hamster | null>(null)
	const [ showAddForm, setShowAddForm ] = useState<boolean>(false)

	async function sendRequest(saveData:any) {
		const response = await fetch('/hamsters')
		const data = await response.json()
		console.log(data, typeof data)
		saveData(data)
	}

	useEffect(() => {
		sendRequest(setAllHamsters)
	}, [])

	const handleShowInfo = (x:Hamster) => {
		fetch("/hamsters/"+x.id, {method: 'get'})
		setShowDisplayHamster(!showDisplayHamster)
		setDisplayHamster(x)
	}

	return (
		<>
		<h1> Hamsters </h1>
		<button onClick={() => setShowAddForm(!showAddForm)}>Add Hamster</button>
		{ showAddForm ? 
			<AddForm show={showAddForm} set={setShowAddForm} />
		: null}
		<section className="gallery-container">
		{ allHamsters? 
		
		allHamsters.map(x => (
				<article onClick={() => handleShowInfo(x)} className='hamster-card' key={x.id} >
					<li><img src={`/img/${x.imgName}`} alt={x.name} /></li>
					<li><h3>Name: </h3> <h3 className="hamster-name">{x.name}</h3></li>
					{ showDisplayHamster && displayHamster && displayHamster.id === x.id ? 
						<article className="info-overlay">
						<li><h3>Wins: </h3> {x.wins} </li>
						<li><h3>Defeats: </h3> {x.defeats} </li>
						<li><h3>Games: </h3> {x.games} </li>
						</article>
						:null	
					}		
					<aside onClick={() => 
						fetch("/hamsters/"+x.id, {method: 'delete'})} >Remove</aside>
				</article>
			))
			: 'Loading hamsters...'}
		
		</section>
		</>
	)
}

export default Gallery