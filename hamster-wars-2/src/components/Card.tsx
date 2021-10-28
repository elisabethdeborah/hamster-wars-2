

import { FunctionComponent } from "react"
//import CardProps from "../models/CardProps"
import Hamster from '../models/HamsterInterface'

interface CardProps {
	hamster:Hamster;
	deleteItem: any;
	showInfo: any;
	showDisplay: boolean;
	display: Hamster | null;
}





const Card: FunctionComponent<CardProps> = ({hamster, deleteItem, showInfo,showDisplay, display}) => {
	return (
		<section key={hamster.id+hamster.name}>
			<article onClick={() => showInfo(hamster)} className='hamster-card' key={hamster.id} >
				<li><img className="card-img" src={`/img/${hamster.imgName}`} alt={hamster.name} /></li>
				<h2>{hamster.name}</h2>
				<li><h4>Age: </h4> {hamster.age} </li>
				<li><h4>Favorite Food: </h4> {hamster.favFood} </li>
				<li><h4>Hobbies: </h4> {hamster.loves} </li>
				{ showDisplay && display && display.id === hamster.id ? 
					<article className="info-overlay">
					<li><h3>Wins: </h3> {hamster.wins} </li>
					<li><h3>Defeats: </h3> {hamster.defeats} </li>
					<li><h3>Games: </h3> {hamster.games} </li>
					</article>
					:null	
				}			
			</article>
			<aside key={ hamster.name} onClick={() => deleteItem(hamster)} >Remove</aside>
		</section>
 
	)
}

export default Card


/* 
<article className={'hamster-card'} key={loser.id} >
						<li><img src={`/img/${loser.imgName}`} alt={loser.name} /></li>
						<h2 className="hamster-name">{loser.name}</h2>
						<article className="info-overlay">
							<h2>{ loser.name }</h2>
							<li><h3>Wins: </h3> { loser.wins } </li>
							<li><h3>Defeats: </h3> {loser.defeats} </li>
							<li><h3>Games: </h3> {loser.games} </li>
						</article>
					</article>
*/