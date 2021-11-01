
import Cutest from '../components/Cutest';

/* 
Här ska du förklara för användaren hur man använder appen. Länka till vyerna Tävla och Galleri. (Med React Router-länkar, <Link />.)

Visa den hamster som vunnit mest. Vi räknar (antal vinster) - (antal förluster). Om det är oavgjort mellan flera hamstrar, ska appen slumpa en av dem. (Backend endpoint /hamsters/cutest.)

Om det av någon anledning inte går att nå backend-servern så ska du visa ett användarvänligt felmeddelande här. Användaren ska också få möjligheten att försöka igen.

*/

const Start = () => {
	
	return (
		<>
		<h1>Start</h1>
    	<Cutest />
		</>
	)
}

export default Start 