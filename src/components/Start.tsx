
import Cutest from '../components/Cutest';
import { Link } from 'react-router-dom'
import HeaderProps from '../models/HeaderProps';
import {useEffect} from 'react'


const Start = ({ setHeader1, setHeader2, setMobileNav }:HeaderProps) => {
	useEffect(() => {
		setHeader1('Hamster Wars!')
		setHeader2('Så här funkar det!')
		setMobileNav(false)
	}, [setHeader1, setHeader2, setMobileNav])


	return (
		<section className="start-page">
			<section className="start-grid">
				<article className="grid-item item-1">
					<Cutest />
				</article>
				<article className="grid-item item-2">
					<p><Link to="/compete">Välj mellan två hamstrar i taget</Link>. Klicka på den som är sötast, för att sen se hur poppis den är.</p> <p>Klicka på knappen "new game" för att köra en runda till.</p>
					<button className="btn-light"><Link to="/compete">Tävla</Link></button>
				</article>
				<article className="grid-item item-3">
					<p>Kolla på alla hamstar i <Link to="/gallery">Galleri</Link>. Här kan du också lägga till eller ta bort en hamster. Klicka på en hamster för att läsa mer om den!</p>
					<button className="btn-light"><Link to="/gallery">Galleri</Link></button>
				</article>
				<article className="grid-item item-4">
					<p>Vill du se vilka som vunnit flest eller minst gånger? Det kan du göra under "statistik".</p>
					<button className="go-to"><Link to="/statistik">Gå till statistik</Link></button>
				</article>
				<article className="grid-item item-5">
					<p>För att se alla tidigare matcher, och ta bort en match, gå till "Historik". </p>
					<button className="go-to"><Link to="/historik">Gå till historik</Link></button>
				</article>
				<article className="grid-item item-6">
					<p>Vill du se den inbördes poängställningen mellan två hamstrar? Gå till "jämför två hamstrar" och klicka på två hamstrar!</p>
					<button className="go-to"><Link to="/rivalry">Gå till jämför</Link></button>
				</article>
				<article className="grid-item item-6">
					<p>Under "fighters and slackers" hittar du den/de hamstrar som tävlat i flest respektive minst antal matcher.</p>
					<button className="go-to"><Link to="/fightersslackers">Fighters and Slackers</Link></button>
				</article>
			</section>
		</section>
	)
}

export default Start 