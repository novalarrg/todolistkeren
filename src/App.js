import "./App.css";
import Home from "./pages/Home";
import Router from './components/NavBar'
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Home />
    </div>
  );
}

export default App;
