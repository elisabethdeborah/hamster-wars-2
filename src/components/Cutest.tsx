
import { useState, useEffect } from "react"
import Hamster from '../models/HamsterInterface'

const Cutest = () => {
	const [ cutestHamster, setCutestHamster ] = useState<Hamster[] | null>(null)
	const [ errorExists, setError ] = useState<boolean>(false)
	
	async function sendRequest(saveData:any) {
		try {
			const response = await fetch('/hamsters/cutest')
			if (!response.ok) {
				throw new Error(response.statusText);
			} else {
				const data = await response.json()
				saveData(data)
			}
		} catch (error) {
			setError(true)
		}
	}
	
	useEffect(() => {
		sendRequest(setCutestHamster)
	}, [])

	if (cutestHamster && cutestHamster?.length > 1) {
		let getRandomCutie:Hamster = cutestHamster[Math.floor(Math.random()*cutestHamster.length)]
		setCutestHamster([getRandomCutie])
	}

	
	return (
		!errorExists ? 
		<div className="cutest-div">
			{ 
			cutestHamster? 
				cutestHamster.map(x => (
					<article className='hamster-card cutest-hamster' key={x.id} >
						<img src={x.imgName.includes('http') ? x.imgName : `/img/${x.imgName}`} alt={x.name} />
						<h2> Defending Champion </h2>
						<h3>Det här är {x.name}</h3>
						<p>{x.name} har spelat {x.games} matcher och vunnit hela {x.wins}! </p> 
						<h4>Heja {x.name}!</h4>
					</article>
				))
				:'Laddar hamstrar...'
			}
		</div>
		:<div>
			<h2>Nånting fungerar inte som det ska... Kom tillbaka om en stund om du vill se vilken hamster som leder!</h2>
		</div>
	)
}

export default Cutest