
import { useState, useEffect } from "react"
import Hamster from '../models/HamsterInterface'
import AddForm from './AddForm'
import Card from "./Card"


/* 

Här ska appen visa alla hamstrars namn och bild, i ett CSS grid.

Man ska kunna lägga till en ny hamster via ett formulär. Formuläret ska använda validering.

Man ska kunna ta bort en hamster från galleriet.

Tänk på att inte visa för mycket information direkt. Låt användaren klicka/hovra över en bild för att visa mer information.

VG:
Förutom G-nivån ska man kunna välja en hamster, och se vilka den har besegrat. (/matchWinners)

Historik
Visa resultatet från de senaste matcherna: bild och namn för både vinnare och förlorare.

*/



const Gallery = () => {

	//const [ matches, setMatches ] = useState<Match[] | null>(null)


	const [ allHamsters, setAllHamsters ] = useState<Hamster[] | null>(null)
	/* const [ showDisplayHamster, setShowDisplayHamster ] = useState<boolean>(false) */
/* 	const [ displayHamster, setDisplayHamster ] = useState<Hamster | null>(null) */
	const [ showAddForm, setShowAddForm ] = useState<boolean>(false)
	//const [ matchesWon, setMatchesWon ] = useState<Matches | null>(null)
	
	async function sendRequest(saveData:any) {
		const response = await fetch('/hamsters')
		const data = await response.json()
		saveData(data)
	}

/* 	const getMatchesWon = async(x:Hamster) => {
		try {
			let response = await fetch("/matchWinners/"+x.id, {method: 'get'})
			let matchesWon = await response.json()
			
			console.log('matchesWon:', matchesWon);
			matchesWon.map((m:Match) => {
				console.log(m.loserId);
				
			})
			setMatchesWon(matchesWon)	
		} catch (error) {
			console.log('error: ', error);
			
		}
	} */


	useEffect(() => {
			sendRequest(setAllHamsters)
		}, [])
/* 
	const handleShowInfo = (x:Hamster) => {
		fetch("/hamsters/"+x.id, {method: 'get'})
		getMatchesWon(x)
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
	} */

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
			<Card key={x.id} hamster={x} /* deleteItem={handleDelete} showInfo={handleShowInfo}  */
			hamsters={allHamsters} setHamsters={setAllHamsters} /* showDisplay={showDisplayHamster} display={displayHamster} */ />
				
			))
			: 'Loading hamsters...'}
		
		</section>
		</>
	)
}

export default Gallery

