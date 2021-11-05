
import Cutest from '../components/Cutest';
import { Link } from 'react-router-dom'
import HeaderProps from '../models/HeaderProps';
/* 
Här ska du förklara för användaren hur man använder appen. Länka till vyerna Tävla och Galleri. (Med React Router-länkar, <Link />.)

Visa den hamster som vunnit mest. Vi räknar (antal vinster) - (antal förluster). Om det är oavgjort mellan flera hamstrar, ska appen slumpa en av dem. (Backend endpoint /hamsters/cutest.)

Om det av någon anledning inte går att nå backend-servern så ska du visa ett användarvänligt felmeddelande här. Användaren ska också få möjligheten att försöka igen.

*/

const Start = ({header1, setHeader1, header2, setHeader2}:HeaderProps) => {
setHeader1('Hamster Wars!')
setHeader2('Vilken hamster är sötast?')
	return (
		<section className="start-page">
			<section className="start-grid">
				<article className="grid-item item-1">
					<Cutest />
				</article>
				<article className="grid-item item-2">
					<p><Link to="/compete">Välj mellan två hamstrar i taget</Link>. Klicka på den som är sötast, för att sen se hur poppis den är.</p> <p>Klicka på knappen "new game" för att köra en runda till.</p>
					<button><Link to="/compete">Tävla</Link></button>
				</article>
				<article className="grid-item item-3">
					<p>Kolla på alla hamstar i <Link to="/gallery">Galleri</Link>. Här kan du också lägga till eller ta bort en hamster. Klicka på en hamster för att läsa mer om den!</p>
					<button><Link to="/gallery">Galleri</Link></button>
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