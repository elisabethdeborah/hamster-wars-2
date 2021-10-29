

import { linkSync } from "fs"
import { FunctionComponent, useState } from "react"
import AddFormProps from "../models/AddFormProps"
import {  Redirect } from 'react-router-dom'


const AddForm: FunctionComponent<AddFormProps> = ({show, set}) => {
	const [ submitted, setSubmitted ] = useState<boolean>(false)

/* 	if (submitted) {
		return <Redirect push to={linkSync.redirectUrl} />
	} */

	return (
		<>
		<section className="form-background-overlay"></section>
		<form className="add-form" action="/hamsters/" method="POST">
			<aside onClick={() => set(!show)}>Close</aside>
			<h1> Add Hamster </h1>
			<input type="text" name="name" placeholder="Hamster Name" required />
			<input type="text" name="loves" placeholder="Hamster Loves to ..." required />
			<input type="number" name="age" placeholder="Hamster age" required />
			<input type="text" name="favFood" placeholder="Hamster's favorite food" required />
			<input type="text" name="imgName" defaultValue="hamster-1.jpg" placeholder="Hamster image url" required />
			<input type="hidden" name="wins" value='0' />
			<input type="hidden" name="defeats" value='0' />
			<input type="hidden" name="games" value='0' />
			<input type="submit" value="Add" onClick={() => setSubmitted(true)} />
		</form>
		</>
	)
}

export default AddForm 