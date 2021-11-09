
import { useState, useEffect } from "react"
import GalleryProps from "../models/GalleryProps"
import AddForm from './AddForm'
import Card from "./Card"



const Gallery = ({ setHeader1, setHeader2, setMobileNav, allHamsters, setAllHamsters}:GalleryProps) => {

	const [ showAddForm, setShowAddForm ] = useState<boolean>(false)


	useEffect(() => {
		setHeader1('Hamsters')
		setHeader2('Kolla in alla hamstrar')
		setMobileNav(false)
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

