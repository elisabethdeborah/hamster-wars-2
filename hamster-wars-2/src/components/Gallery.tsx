
import { useState, useEffect } from "react"
import Hamster from '../models/HamsterInterface'
import AddForm from './AddForm'


/* 

Här ska appen visa alla hamstrars namn och bild, i ett CSS grid.

Man ska kunna lägga till en ny hamster via ett formulär. Formuläret ska använda validering.

Man ska kunna ta bort en hamster från galleriet.

Tänk på att inte visa för mycket information direkt. Låt användaren klicka/hovra över en bild för att visa mer information.

VG:
Förutom G-nivån ska man kunna välja en hamster, och se vilka den har besegrat. (/matchWinners)

Statistik
Visa de 5 hamstrar som vunnit mest, och de 5 hamstrar som förlorat mest.

Historik
Visa resultatet från de senaste matcherna: bild och namn för både vinnare och förlorare.

*/

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

	const handleDelete = (x:Hamster) => {
		if (allHamsters){
			let index:number = allHamsters?.findIndex(i => i.id === x.id)
			let newHamsterArray = [...allHamsters] 
			newHamsterArray.splice(index,1)
			setAllHamsters(newHamsterArray)
			fetch("/hamsters/"+x.id, {method: 'delete'})
		}
	}

	//VÄLJ HAMSTER -> SE VILKA DEN HAR BESEGRAT /MATCHWINNERS
	//STATISTIK -> DE 5 SOM VUNNIT/FÖRLORAT MEST /WINNERS + /LOSERS
	//HISTORIK: RESULTAT DE SENASTE MATCHERNA, BILD OCH NAMN FÖR VINNARE OCH FÖRLORARE


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
				<section key={x.id+x.name}>
				<article onClick={() => handleShowInfo(x)} className='hamster-card' key={x.id} >
					<li><img src={`/img/${x.imgName}`} alt={x.name} /></li>
					<h2>{x.name}</h2>
					<li><h4>Age: </h4> {x.age} </li>
					<li><h4>Favorite Food: </h4> {x.favFood} </li>
					<li><h4>Hobbies: </h4> {x.loves} </li>
					{ showDisplayHamster && displayHamster && displayHamster.id === x.id ? 
						<article className="info-overlay">
						<li><h3>Wins: </h3> {x.wins} </li>
						<li><h3>Defeats: </h3> {x.defeats} </li>
						<li><h3>Games: </h3> {x.games} </li>
						</article>
						:null	
					}		
					
				</article>
				<aside key={ x.name} onClick={() => handleDelete(x)} >Remove</aside>
				</section>
			))
			: 'Loading hamsters...'}
		
		</section>
		</>
	)
}

export default Gallery