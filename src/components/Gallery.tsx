
import { useState, useEffect } from "react"
import AddForm from './AddForm'
import Card from "./Card"
import Hamster from "../models/HamsterInterface"
import HeaderProps from "../models/HeaderProps"



const Gallery = ({ setHeader1, setHeader2, setMobileNav }:HeaderProps) => {

	const [ showAddForm, setShowAddForm ] = useState<boolean>(false)
	const [allHamsters, setAllHamsters] = useState<Hamster[] | null>(null)
	
	async function sendRequest(setAllHamsters:any) {
		try {
			const response = await fetch('/hamsters')
			const data = await response.json()
			setAllHamsters(data)
		} catch (error) {
			//console.log('error:', error);
		}
	}

	useEffect(() => {
		setHeader1('Hamsters')
		setHeader2('Kolla in alla hamstrar')
		setMobileNav(false)
		sendRequest(setAllHamsters)
	}, [setHeader1, setHeader2, setMobileNav])

	//VÄLJ HAMSTER -> SE VILKA DEN HAR BESEGRAT /MATCHWINNERS
	
	return (
		<>
			<button className="add-hamster-btn" onClick={() => setShowAddForm(!showAddForm)}>Lägg till hamster</button>
			{ showAddForm ? 
				<AddForm show={showAddForm} set={setShowAddForm} allHamsters={allHamsters} setAllHamsters={setAllHamsters} />
			: null}
			<section className="gallery-container">
			{ allHamsters? 
				allHamsters.map(x => (
					<Card key={x.id} hamster={x} hamsters={allHamsters} setHamsters={setAllHamsters} />
				))
				: 'Laddar hamstrar...'}
			
			</section>
		</>
	)
}

export default Gallery

