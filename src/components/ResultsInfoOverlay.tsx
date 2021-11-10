import ResultsProps from "../models/ResultsProps"
import { useEffect, useState } from "react"
import Hamster from "../models/HamsterInterface"

const ResultsInfoOverlay = ({hamster, place}:ResultsProps) => {

	const [info, setInfo] = useState<Hamster|null>(null)
	console.log( 'params:', hamster.name, hamster.wins, hamster.defeats, hamster.games);

	
	
 	useEffect(() => {
		const abortController = new AbortController()
		const signal = abortController.signal;
		async function fetchUpdated(signal: any) {
			const response = await fetch("/hamsters/"+hamster.id, {
				method: 'get',
				signal: signal
			})
			const info = await response.json()
			console.log('info:', info);
			setInfo(info)
		}
		fetchUpdated(signal)
		return () => abortController.abort()
		
	}, [ hamster.id])


	return (
		<>
		{
		info ?
		<article className="info-overlay competition-overlay">
			<h1> {place} </h1>
			<h2>{ hamster.name }</h2>
			<li><h3>Wins: </h3> { info.wins } </li>
			<li><h3>Defeats: </h3> { info.defeats } </li>
			<li><h3>Games: </h3> { info.games} </li>
	
			
		</article>
		: 'Laddar hamster ...' }
		</>
	)
}

export default ResultsInfoOverlay