
import Cutest from '../components/Cutest';
import { Link } from 'react-router-dom'
/* 
Här ska du förklara för användaren hur man använder appen. Länka till vyerna Tävla och Galleri. (Med React Router-länkar, <Link />.)

Visa den hamster som vunnit mest. Vi räknar (antal vinster) - (antal förluster). Om det är oavgjort mellan flera hamstrar, ska appen slumpa en av dem. (Backend endpoint /hamsters/cutest.)

Om det av någon anledning inte går att nå backend-servern så ska du visa ett användarvänligt felmeddelande här. Användaren ska också få möjligheten att försöka igen.

*/

const Start = () => {

	return (
		<section className="start-page">
			<h1>Hamster Wars!</h1>
			<h2>Vilken hamster är sötast?</h2>
			<p><Link to="/compete">Välj mellan två hamstrar i taget</Link>. Klicka på den som är sötast, för att sen se hur poppis den är.</p> <p>Klicka på knappen "new game" för att köra en runda till.</p>
			<button><Link to="/compete">Tävla</Link></button>
			<p>Kolla på alla hamstar i <Link to="/gallery">Galleri</Link>. Här kan du också lägga till eller ta bort en hamster. Klicka på en hamster för att läsa mer om den!</p>
			<button><Link to="/gallery">Galleri</Link></button>
			<p>Vill du se vilka som vunnit flest eller minst gånger? Det kan du göra under "statistik".</p>
			<p>För att se alla tidigare matcher, och ta bort en match, gå till "Historik". </p>
			<p>Vill du se den inbördes poängställningen mellan två hamstrar? Gå till "jämför två hamstrar" och klicka på två hamstrar!</p>
			<p>Under "fighters and slackers" hittar du den/de hamstrar som tävlat i flest respektive minst antal matcher.</p>
			<section className="start-page-btn-group">
				<button><Link to="/compete">Tävla</Link></button>
				<button><Link to="/gallery">Galleri</Link></button>
			</section>
			<Cutest />
		</section>
	)
}

export default Start 