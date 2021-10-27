

import { useState, useEffect } from "react"

type Cutest =[{}];

const HamsterImgs = () => {

	const [ data, setData ] = useState<[] | null>(null)



	async function sendRequest(saveData:any) {
		const baseUrl = 'http://localhost:1337/hamsters'
		const response = await fetch('cutest')
		const data = await response.json()
		saveData(data)
	}


	useEffect(() => {
		sendRequest(setData)
	}, [])
	

	return (
		<div>
		<h2> Hamster Imgs List </h2>
		{ data? 
		data.map(hamsterImg => (
				<article key={hamsterImg}>
					{hamsterImg}
				</article>
			))
			: 'Loading hamsters...'}
		
		</div>
	)
}

export default HamsterImgs