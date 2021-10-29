
import './App.css';
import Gallery from './components/Gallery';
import Competition from './components/Competition';
import Start from './components/Start';
import Statistik from './components/Statistik';
import Historik from './components/Historik';
import BadUrl from './components/BadUrl';
import { Link, Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom'

//VYER:
//STARTSIDA 	COMPONENT 	(X)		ROUTE (X)
///FIXA OVERLAY ELLER LÄGG TILL INFO + TA BORT HOVER-EFFEKT


//TÄVLA 		COMPONENT 	(X)		ROUTE (X)

//GALLERI 		COMPONENT 	(X)		ROUTE (X)
//FIXA 404 FELMEDDELANDE NÄR INGA VUNNA MATCHER

//STATISTIK 	COMPONENT 	(X)		ROUTE (X)
//HISTORIK 		COMPONENT 	(X)		ROUTE (X)

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
			</nav>
		</header>
		<main>
			<Switch>
				<Route path="/" exact> <Start /> </Route>
				<Route path="/gallery"> <Gallery /> </Route>
				<Route path="/compete"> <Competition /> </Route>
				<Route path="/statistik"> <Statistik /> </Route>
				<Route path="/historik"> <Historik /> </Route>
				<Route path="/hamsters/"> <Redirect to="/" /></Route>
				<Route path="/"> <BadUrl /> </Route>

			</Switch>
		</main>
		</Router>
    </div>
  );
}

export default App;
