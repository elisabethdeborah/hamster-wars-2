
import './App.css';
import Gallery from './components/Gallery';
import Competition from './components/Competition';
import Start from './components/Start';
import Statistik from './components/Statistik';
import Historik from './components/Historik';
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
				<Link to="/rivalry">Jämför</Link>
			</nav>
		</header>
		<main>
			<Switch>
				<Route path="/" exact> <Start /> </Route>
				<Route path="/gallery"> <Gallery /> </Route>
				<Route path="/compete"> <Competition /> </Route>
				<Route path="/statistik"> <Statistik /> </Route>
				<Route path="/historik"> <Historik /> </Route>
				<Route path="/hamsters/"> <Redirect to="/gallery" /></Route>
				<Route path="/rivalry"> <Rivalry /> </Route>
				<Route path="/"> <BadUrl /> </Route>

			</Switch>
		</main>
		</Router>
    </div>
  );
}

export default App;
