
import './App.css';
import { useState, useEffect } from 'react'
import Gallery from './components/Gallery';
import Competition from './components/Competition';
import Start from './components/Start';
import Statistik from './components/Statistik';
import Historik from './components/Historik';
import FightersSlackers from './components/FighersSlackers';
import BadUrl from './components/BadUrl';
import { Link, Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom'
import Rivalry from './components/Rivalry';
import Logo from './components/Logo';
import HamsterHamburger from './components/HamsterHamburger';
import Hamster from './models/HamsterInterface';


function App() {
	//const [allHamsters, setAllHamsters] = useState<Hamster[] | null>(null)
	const [ header1, setHeader1 ] = useState<string >('')
	const [ header2, setHeader2 ] = useState<string >('')
	const [ mobileNav, setMobilNav ] = useState<boolean>(false)

	/* async function sendRequest(setAllHamsters:any) {
		try {
			const response = await fetch('/hamsters')
			const data = await response.json()
			setAllHamsters(data)
		} catch (error) {
			console.log('error:', error);
		}
	} */

/* 	useEffect(() => {
		sendRequest(setAllHamsters)
		}, []) */

  return (
    <div className="App">
		<Router>
		<header>
			<nav className={mobileNav ? 'nav open-nav':'nav'}>
				<Link to="/">Start</Link>
				<Link to="/compete">Tävla</Link>
				<Link to="/gallery">Galleri</Link>
				<Link to="/statistik">Statistik</Link>
				<Link to="/historik">Historik</Link>
				<Link to="/rivalry">Jämför två hamstrar</Link>
				<Link to="/fightersslackers">Fighters and Slackers</Link>
			</nav>
			<h1>{header1} <Logo /></h1>
			<h2>{header2}</h2>
			<HamsterHamburger mobileNav={mobileNav} setMobileNav={setMobilNav} />
		</header>
		<main>
			<Switch>
				<Route path="/" exact> <Start setMobileNav={setMobilNav} setHeader1={setHeader1} setHeader2={setHeader2} /> </Route>
				<Route path="/gallery"> <Gallery setMobileNav={setMobilNav}  setHeader1={setHeader1} setHeader2={setHeader2} /> </Route>
				<Route path="/compete"> <Competition setMobileNav={setMobilNav} setHeader1={setHeader1} setHeader2={setHeader2} /> </Route>
				<Route path="/statistik"> <Statistik setMobileNav={setMobilNav} setHeader1={setHeader1} setHeader2={setHeader2} /> </Route>
				<Route path="/historik"> <Historik setMobileNav={setMobilNav} setHeader1={setHeader1} setHeader2={setHeader2} /> </Route>
				<Route path="/hamsters/"> <Redirect to="/gallery" /></Route>
				<Route path="/rivalry"> <Rivalry setMobileNav={setMobilNav} setHeader1={setHeader1} setHeader2={setHeader2} /> </Route>
				<Route path="/fightersslackers"> <FightersSlackers setMobileNav={setMobilNav} setHeader1={setHeader1} setHeader2={setHeader2} /></Route>
				<Route path="/"> <BadUrl setHeader1={setHeader1} setHeader2={setHeader2} setMobileNav={setMobilNav} /> </Route>

			</Switch>
		</main>
		</Router>
    </div>
  );
}

export default App;
