
import './App.css';
import Gallery from './components/Gallery';
import Competition from './components/Competition';
import Start from './components/Start';
import Statistik from './components/Statistik';
import Historik from './components/Historik';

//VYER:
//STARTSIDA 	COMPONENT 	(X)		ROUTE ( )
//TÄVLA 		COMPONENT 	(X)		ROUTE ( )
//GALLERI 		COMPONENT 	(X)		ROUTE ( )
//STATISTIK 	COMPONENT 	( )		ROUTE ( )
//HISTORIK 		COMPONENT 	( )		ROUTE ( )



function App() {
  return (
    <div className="App">
		<Start />
		<Gallery />
		<Competition />
		<Statistik />
		<Historik />
    </div>
  );
}

export default App;
