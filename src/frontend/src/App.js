import {BrowserRouter, Route} from 'react-router-dom'
import AddForm from './components/AddForm'
import About from './components/About'
import Home from './components/Home'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Route exact path='/add' component={AddForm} />
      <Route exact path='/about' component={About} />
      <Route exact path='/' component={Home} />
    </BrowserRouter>
  );
}

export default App
