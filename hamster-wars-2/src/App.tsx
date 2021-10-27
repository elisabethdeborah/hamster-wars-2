
import './App.css';
import Gallery from './components/Gallery';
import Cutest from './components/Cutest';
import AddForm from './components/AddForm';
import Competition from './components/Competition';

function App() {
  return (
    <div className="App">
      <Cutest />
	  <Gallery />
	  <Competition />
    </div>
  );
}

export default App;
