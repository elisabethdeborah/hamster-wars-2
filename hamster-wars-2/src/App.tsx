
import './App.css';
import Gallery from './components/Gallery';
import Cutest from './components/Cutest';
import AddForm from './components/AddForm';

function App() {
  return (
    <div className="App">
      <Cutest />
	  <Gallery />
	  <AddForm />
    </div>
  );
}

export default App;
