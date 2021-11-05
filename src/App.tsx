
import './App.css';
import { useState } from 'react'
import Gallery from './components/Gallery';
import Competition from './components/Competition';
import Start from './components/Start';
import Statistik from './components/Statistik';
import Historik from './components/Historik';
import FightersSlackers from './components/FighersSlackers';
import BadUrl from './components/BadUrl';
import { Link, Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom'
import Rivalry from './components/Rivalry';


//VYER:
//STARTSIDA 	COMPONENT 	(X)		ROUTE (X)


//TÄVLA 		COMPONENT 	(X)		ROUTE (X)
//fixa ordningen på korten när resultatet visas

//GALLERI 		COMPONENT 	(X)		ROUTE (X)
//FIXA 404 FELMEDDELANDE NÄR INGA VUNNA MATCHER

//STATISTIK 	COMPONENT 	(X)		ROUTE (X)
//FIXA 404 FELMEDDELANDE NÄR INGA MATCHER 

//HISTORIK 		COMPONENT 	(X)		ROUTE (X)
//FIXA 404 FELMEDDELANDE NÄR INGA MATCHER

//404 PAGE?		COMPONENT 	( )		ROUTE ( )


function App() {
	const [ header1, setHeader1 ] = useState<string >('')
	const [ header2, setHeader2 ] = useState<string >('')

  return (
    <div className="App">
		<Router>
		<header>
			<nav>
				<Link to="/">Start</Link>
				<Link to="/compete">Tävla</Link>
				<Link to="/gallery">Galleri</Link>
				<Link to="/statistik">Statistik</Link>
				<Link to="/historik">Historik</Link>
				<Link to="/rivalry">Jämför två hamstrar</Link>
				<Link to="/fightersslackers">Fighters and Slackers</Link>
			</nav>
			<h1>{header1}</h1>
			<h2>{header2}</h2>
		</header>
		<main>
			<Switch>
				<Route path="/" exact> <Start header1={header1} setHeader1={setHeader1} header2={header2} setHeader2={setHeader2} /> </Route>
				<Route path="/gallery"> <Gallery header1={header1} setHeader1={setHeader1} header2={header2} setHeader2={setHeader2} /> </Route>
				<Route path="/compete"> <Competition header1={header1} setHeader1={setHeader1} header2={header2} setHeader2={setHeader2} /> </Route>
				<Route path="/statistik"> <Statistik header1={header1} setHeader1={setHeader1} header2={header2} setHeader2={setHeader2} /> </Route>
				<Route path="/historik"> <Historik header1={header1} setHeader1={setHeader1} header2={header2} setHeader2={setHeader2} /> </Route>
				<Route path="/hamsters/"> <Redirect to="/gallery" /></Route>
				<Route path="/rivalry"> <Rivalry header1={header1} setHeader1={setHeader1} header2={header2} setHeader2={setHeader2} /> </Route>
				<Route path="/fightersslackers"> <FightersSlackers header1={header1} setHeader1={setHeader1} header2={header2} setHeader2={setHeader2} /></Route>
				<Route path="/"> <BadUrl /> </Route>

			</Switch>
		</main>
		</Router>
    </div>
  );
}

export default App;
