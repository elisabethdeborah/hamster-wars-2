

import { useState } from "react"
import AddFormProps from "../models/AddFormProps"
import AddHamster from "../models/AddHamster"
import CheckboxLabels from "./Checkbox"

const AddForm = ({show, set, setAllHamsters}:AddFormProps) => {
	const [ name, setName ] = useState<string>('')
	const [ loves, setLoves ] = useState<string>('')
	const [ favFood, setFavFood ] = useState<string>('')
	const [ imgName, setImgName ] = useState<string>('')

	const [ isChecked, setChecked ] = useState<boolean>(false)
	const [ age, setAge ] = useState<number>(0)
	const [ clickedNameField, setClickedNameField ] = useState<boolean>(false)
	const [ clickedAgeField, setClickedAgeField ] = useState<boolean>(false)
	const [ clickedLoveField, setClickedLoveField ] = useState<boolean>(false)
	const [ clickedFoodField, setClickedFoodField ] = useState<boolean>(false)

	const nameIsValid = validateName(name)
	const ageIsValid = validateAge(age)
	const loveIsValid = validateLove(loves)
	const foodIsValid = validateFood(favFood)
	const imgIsValid = validateImg(imgName, isChecked)
	const showImgInfo = setShowImgInfo(imgIsValid)

	function validateName(name:string):boolean {
		return name.length >= 2
	}

	function validateLove(loves:string):boolean {
		return loves.length >= 2
	}

	function validateFood(favFood:string):boolean {
		return favFood.length >= 2
	}

	function validateImg(imgName:string, isChecked:boolean):boolean {

		let testString =imgName.split('')
		let testArray1 = testString.slice(0,8)
		let testArray2 = testString.slice(0,7)
		
		let startIsOk = testArray1.join('') === 'https://' || testArray2.join('') === 'http://'
		let restIsOk = testString.slice(8).includes('.') && testString.slice(8).includes('/')
		let hamsterImg1 = testString.slice(0,8)
		let hamsterImg2 = testString.slice(-4)

		let urlOk = startIsOk && restIsOk

		let fileNameOk = hamsterImg2.join('') === '.jpg' && hamsterImg1.join('') === 'hamster-'
		return urlOk || fileNameOk || isChecked
	}

	const handleImg = (input:string) => {
		setImgName(input)
	}

	const handleCheckbox = (checked:boolean) => {
		setChecked(checked)
		if ( checked ) {
			setImgName(`/hamster-${Math.ceil(Math.random()*40)}.jpg`)
		}
	}
	
	function setShowImgInfo(imgIsValid:boolean):boolean {
		return !imgIsValid
	}

	function validateAge(input:number):boolean {
		return input >= 0 
		
	}

	const handleAge = (input:number) => {
		if(input.toString().length > 0) {
			setAge(input)
		}
		setClickedAgeField(true)
	}


	const handleName = (input:string) => {
		setName(input)
		setClickedNameField(true)
	}

	const handleLove = (input:string) => {
		setLoves(input)
		setClickedLoveField(true)
	}

	const handleFood = (input:string) => {
		setFavFood(input)
		setClickedFoodField(true)
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
			<aside onClick={() => set(!show)}>Stäng</aside>
			<h1> Lägg till hamster </h1>
			<article className="add-hamster-input-art">
			<input type="text" name="name" onChange={(e) => handleName(e.target.value)} placeholder="Hamsterns namn" className={nameIsValid ? 'name-inut valid':'name-inut not-valid'} />
			{!nameIsValid && clickedNameField ?
				<span className="input-alert" >Namnet måste vara minst två tecken.</span>
				:null
			}
			</article>
			<article className="add-hamster-input-art">
			<input type="text" name="loves" placeholder="Hamsterns hobby" onChange={(e) => handleLove(e.target.value)} className={loveIsValid ? 'valid':' not-valid'} />
			{!loveIsValid && clickedLoveField ?
				<span className="input-alert" >Hobby måste vara minst två bokstäver.</span>
				:null
			}
			</article>
			<article className="add-hamster-input-art">
			<input type="number" name="age" placeholder={clickedAgeField?" 0 ": "Hamstern ålder"} onChange={(e) => handleAge(Number(e.target.value))} className={ageIsValid ? 'age-inut valid':'age-inut not-valid'} />
			{!ageIsValid && clickedAgeField ?
				<span className="input-alert" >Ålder måste vara 0 eller över.</span>
				:null
			}
			</article>
			<article className="add-hamster-input-art">
			<input type="text" name="favFood" placeholder="Hamsterns favvo-mat" onChange={(e) => handleFood(e.target.value)}  className={foodIsValid ? 'valid':' not-valid'} />
			{!foodIsValid && clickedFoodField ?
				<span className="input-alert" >Favvo-mat måste vara minst två bokstäver.</span>
				:null
			}
			</article>
			<section className={ imgIsValid && !isChecked? "img-name-section img-preview" : "img-name-section"}>
				<input disabled={isChecked} type="text" name="imgName" placeholder="Url till hamsterbild" onChange={(e) => handleImg(e.target.value)} className={imgIsValid ? 'img-input-valid valid':' not-valid'}/>
				{ 
				imgIsValid && !isChecked ? 



//FIXA EXTRA VILDERINGS-INFO, NÄR SIFFRONR 'ÄR UNDER 0 TEX, FÖRKLARA VARFÖR DET INTE FUNKAR!!
//KOLLA ATT DEN INTE SLÄMGER PÅ +2 PÅ ALLA VINNARE/FÖRLORARE IGEN!




					<img src={imgName} alt="preview hamsterbild" />
					: null
				}
			
				<CheckboxLabels handleCheckbox={handleCheckbox} checked={isChecked} label={showImgInfo ? 'Fyll i url till en bild på nätet eller kryssa i rutan för att slumpa fram en bild från vårt galleri.': 'Slumpar hamsterbild!'}/>
			</section>
			
			<button type="button" value="Add" onClick={() => handleAddHamster()} disabled={!nameIsValid || !loveIsValid || !ageIsValid || !foodIsValid || !imgIsValid}> Skapa </button>
		</form>
		</>
	)
}

export default AddForm 
