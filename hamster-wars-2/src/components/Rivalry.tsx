
import { useState, useEffect } from "react"
import Hamster from "../models/HamsterInterface"

interface RivalData {
	rivalOneWon: number,
	rivalTwoWon: number
}

const Rivalry = () => {
	const [ rivalOne, setRivalOne ] = useState<Hamster | null>(null)
	const [ rivalTwo, setRivalTwo ] = useState<Hamster | null>(null)
	const [ rivalData, setRivalData ] = useState<RivalData | null>(null)
	const [ contestantsSet, setContestantsSet ] = useState<boolean>(false)
	const [ showResult, setShowResult ] = useState<boolean>(false)
	const [ allHamsters, setAllHamsters ] = useState<Hamster[] | null>(null)


	async function sendRequest(setAllHamsters:any) {
		try {
			const response = await fetch('/hamsters')
			const data = await response.json()
			setAllHamsters(data)
		} catch (error) {
			console.log('error:', error);
		}
		
	}

	async function getScores() {
		console.log('getScores');
		
		if (rivalOne && rivalTwo) {
			const response = await fetch(`/score/${rivalOne.id}/${rivalTwo.id}`)
			const data = await response.json()
			console.log(rivalOne.name + ' defeated ' + rivalTwo.name + ' ' + data.challengerWins + ' times. ' + rivalTwo.name + ' defeated '+ rivalOne.name + ' ' + data.defenderWins + ' times.');
			setRivalData({
				rivalOneWon: data.challengerWins,
				rivalTwoWon: data.defenderWins
			})
			setShowResult(true)
		} 
	}

	const handleClickHamster = (x:Hamster) => {
		console.log(x);
		if (!rivalOne) {
			setRivalOne(x)
		} else {
			setRivalTwo(x)
			setContestantsSet(true)
		}
	}

	useEffect(() => {
			sendRequest(setAllHamsters)
		}, [])

	useEffect(() => {
		getScores()
	}, [contestantsSet])


	return (
		<>
		<h1> Rivalitet </h1>
		<section className="gallery-container">
		{ allHamsters? 
		
		allHamsters.map(x => (
			<article onClick={!showResult? () => handleClickHamster(x): undefined} className={showResult?'hamster-card': 'hamster-card gallery-card'} key={x.id} >
				<li key={x.age+'h'+x.defeats} className="card-img-li" ><img className="card-img" src={`/img/${x.imgName}`} alt={x.name} /></li>
				<h2 key={x.defeats+x.wins+'d'+x.age}>{x.name}</h2>
				{
				showResult && rivalOne?.id === x.id ? 
				<article className="info-overlay rivalry-overlay">
					<li><h3> {rivalOne?.name} har vunnit över {rivalTwo?.name} { rivalData?.rivalOneWon } gånger.</h3></li>
				</article>
				:null
				}
				{
					showResult && rivalTwo?.id === x.id ? 
					<article className="info-overlay rivalry-overlay">
						<li><h3> {rivalTwo?.name} har vunnit över {rivalOne?.name} {rivalData?.rivalTwoWon} gånger.</h3></li>
					</article>
					:null
				}
							
			</article>	
			))
			: 'Loading hamsters...'}
		
		</section>
		</>
	)
}

export default Rivalry