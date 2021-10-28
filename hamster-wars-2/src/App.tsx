
import './App.css';
import Gallery from './components/Gallery';
import Competition from './components/Competition';
import Start from './components/Start';

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
    </div>
  );
}

export default App;
