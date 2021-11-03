

import { useState } from "react"
import AddFormProps from "../models/AddFormProps"
import AddHamster from "../models/AddHamster"

const AddForm = ({show, set, allHamsters, setAllHamsters}:AddFormProps) => {
	const [ name, setName ] = useState<string>('')
	const [ loves, setLoves ] = useState<string>('')
	const [ favFood, setFavFood ] = useState<string>('')
	const [ imgName, setImgName ] = useState<string>('')
	const [ age, setAge ] = useState<number>(0)
	const [ clickedAgeField, setClickedAgeField ] = useState<boolean>(false)

	const nameIsValid = validateName(name)
	const ageIsValid = validateAge(age)
	const loveIsValid = validateLove(loves)
	const foodIsValid = validateFood(favFood)
	const imgIsValid = validateImg(imgName)

	function validateName(input:string):boolean {
		return name.length >= 2
	}
	function validateLove(input:string):boolean {
		return loves.length >= 2
	}
	function validateFood(input:string):boolean {
		return favFood.length >= 2
	}
	function validateImg(input:string):boolean {
		//VALIDERA SÅ ATT INTE BLIR 404 OM TEX 'ÖDLSFJÖSJFLÖ'
		return imgName.length >= 2
	}
	
	function validateAge(input:number):boolean {
		return age >= 0
		
	}

	const handleAge = (input:number) => {
		setAge(input)
		setClickedAgeField(true)
	}

	const handleAddHamster = async() => {
		let newHamster = {
			name,
			age,
			favFood,
			loves,
			imgName,
			wins: 0,
			defeats: 0,
			games: 0,
		}
		await updateWinner(newHamster)
		await updateGallery(setAllHamsters)
		console.log('newHamster:', newHamster);
		set(false)
	}

	const updateWinner = async(x:AddHamster) => {
		//PUT update wins ++, games ++
		await fetch("/hamsters/", {
			method: 'post', 
			body:JSON.stringify(x),
			headers: {
				"Content-Type": "application/json"
			}
		})
	}

	async function updateGallery(saveData:any) {
		const response = await fetch('/hamsters')
		const data = await response.json()
		setAllHamsters(data)
	}

	return (
		<>
		<section className="form-background-overlay"></section>
		<form className="add-form">
			<aside onClick={() => set(!show)}>Close</aside>
			<h1> Add Hamster </h1>
			<input type="text" name="name" onChange={(e) => setName(e.target.value)} placeholder="Hamster Name" className={nameIsValid ? 'name-inut valid':'name-inut not-valid'} />
			<input type="text" name="loves" placeholder="Hamster Loves to ..." onChange={(e) => setLoves(e.target.value)} className={loveIsValid ? 'valid':' not-valid'} />
			<input type="number" name="age" placeholder={clickedAgeField?" 0 ": "Hamster age"} onChange={(e) => handleAge(Number(e.target.value))} className={ageIsValid ? 'age-inut valid':'age-inut not-valid'} />
			<input type="text" name="favFood" placeholder="Hamster's favorite food" onChange={(e) => setFavFood(e.target.value)}  className={foodIsValid ? 'valid':' not-valid'} />
			<input type="text" name="imgName" placeholder="Hamster image url" onChange={(e) => setImgName(e.target.value)}  className={imgIsValid ? 'valid':' not-valid'}/>
			<input type="hidden" name="wins" value='0' />
			<input type="hidden" name="defeats" value='0' />
			<input type="hidden" name="games" value='0' />
			<button type="button" value="Add" onClick={() => handleAddHamster()} disabled={!nameIsValid || !loveIsValid || !ageIsValid || !foodIsValid || !imgIsValid}> Add </button>
		</form>
		</>
	)
}

export default AddForm 
