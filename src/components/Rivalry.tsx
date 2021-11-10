
import { useState, useEffect } from "react"
import Hamster from "../models/HamsterInterface"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import HeaderProps from "../models/HeaderProps"

interface RivalData {
	rivalOneWon: number,
	rivalTwoWon: number
}

const Rivalry = ({ setHeader1, setHeader2, setMobileNav}:HeaderProps) => {
	const [ rivalOne, setRivalOne ] = useState<Hamster | null>(null)
	const [ rivalTwo, setRivalTwo ] = useState<Hamster | null>(null)
	const [ rivalData, setRivalData ] = useState<RivalData | null>(null)
	const [ contestantsSet, setContestantsSet ] = useState<boolean>(false)
	const [ showResult, setShowResult ] = useState<boolean>(false)
	const [allHamsters, setAllHamsters] = useState<Hamster[] | null>(null)

	async function sendRequest(setAllHamsters:any) {
		try {
			const response = await fetch('/hamsters')
			const data = await response.json()
			setAllHamsters(data)
		} catch (error) {
			console.log('error:', error);
		}
	}

	//sätter klickad hamster som rival 1 eller rival 2, efter ordningen på klickningarna
	const handleClickHamster = (x:Hamster) => {
		if (!rivalOne && !rivalTwo) {
			setRivalOne(x)
		} else if (rivalOne && !rivalTwo) {
			setRivalTwo(x)
			setContestantsSet(true)
		}
	}
	//nollställer jämförelsen
	const resetClickHamster = () => {
		sendRequest(setAllHamsters)
		setRivalOne(null)
		setRivalTwo(null)
		setContestantsSet(false)
		setShowResult(false)
	}

	useEffect(() => {
		setHeader1('Rivalitet')
		setHeader2('Jämför poängställningen mellan två hamstrar')
		setMobileNav(false)
		}, [setHeader2, setHeader1, setMobileNav])


	//fetchar den inbördes poängställningen mellan valda hamstrarna, när det finns valda hamstrar i state	
	useEffect(() => {
		const abortController = new AbortController()
		const signal = abortController.signal;
		async function getScores(signal:any) {
			if (rivalOne && rivalTwo) {
				const response = await fetch(`/score/${rivalOne.id}/${rivalTwo.id}`, {signal: signal})
				const data = await response.json()
				setRivalData({
					rivalOneWon: data.challengerWins,
					rivalTwoWon: data.defenderWins
				})
				setShowResult(true)
			} 
		}
		getScores(signal)
		return () => abortController.abort()
	}, [contestantsSet, rivalOne, rivalTwo])


	return (
		<>
		<section className="gallery-container">
		{ allHamsters? 
		
			allHamsters.map(x => (
				<article onClick={ () => !showResult? handleClickHamster(x): resetClickHamster()} 
					className={ showResult? 'hamster-card': rivalOne?.id === x.id? 'hamster-card gallery-card opacity-card' : 'hamster-card gallery-card' } 
					key={x.id}
				>
					{rivalOne?.id === x.id? 
					<aside className="rival-check"><FontAwesomeIcon icon={faCheck} /></aside>	:null
					} 
					{rivalTwo?.id === x.id? 
					<aside className="rival-check"><FontAwesomeIcon icon={faCheck} /></aside>	:null
					} 
					<li key={x.age+'h'+x.defeats} className="card-img-li" ><img className="card-img" src={x.imgName.includes('http') ? x.imgName : `/img/${x.imgName}`} alt={x.name} /></li>
					<h2 key={x.defeats+x.wins+'d'+x.age}>{x.name}</h2>
					{
					showResult && rivalOne?.id === x.id ? 
						<article className={"info-overlay rivalry-overlay"}>
							<li><h3> {rivalOne?.name} har vunnit över {rivalTwo?.name} { rivalData?.rivalOneWon } gånger.</h3></li>
						</article>
					:<article className={showResult &&rivalTwo?.id !== x.id ? 'other-card':''}></article>
					}
					{
					showResult && rivalTwo?.id === x.id ? 
						<article className="info-overlay rivalry-overlay">
							<li><h3> {rivalTwo?.name} har vunnit över {rivalOne?.name} {rivalData?.rivalTwoWon} gånger.</h3></li>
						</article>
					:<article className={showResult &&rivalOne?.id !== x.id? 'other-card':''}></article>
					}
							
				</article>	
			))
			: 'Loading hamsters...'}
		
		</section>
		</>
	)
}

export default Rivalry