
import e from "express"
import { useState, useEffect } from "react"
import Hamster from '../models/HamsterInterface'


const AddForm = () => {

/* 	const [ cutestHamster, setCutestHamster ] = useState<Hamster[] | null>(null) */


/* 	async function sendRequest(saveData:any) {
		const response = await fetch('/hamsters/cutest')
		const data = await response.json()
		console.log(data, typeof data)
		saveData(data)
	}


	useEffect(() => {
		sendRequest(setCutestHamster)
		
	}, []) */
	// 'wins', 'defeats', 'games'
	
	return (
		<form className="add-form" action="/hamsters/" method="POST">
		<h2> Add Hamster </h2>
		<input type="text" name="name" placeholder="Hamster Name" required />
		<input type="text" name="loves" placeholder="Hamster Loves to ..." required />
		<input type="number" name="age" placeholder="Hamster age" required />
		<input type="text" name="favFood" placeholder="Hamster's favorite food" required />
		<input type="text" name="imgName" defaultValue="hamster-1.jpg" placeholder="Hamster image url" required />
		<input type="hidden" name="wins" value='0' />
		<input type="hidden" name="defeats" value='0' />
		<input type="hidden" name="games" value='0' />
		<input type="submit" value="Add" onSubmit={(e) => e.preventDefault()} />
		</form>
	)
}

export default AddForm 