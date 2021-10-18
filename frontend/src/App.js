import {BrowserRouter, Route} from 'react-router-dom'
import About from './components/About'
import Main from './components/Main'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Route exact path='/about' component={About} />
      <Route exact path='/' component={Main} />
    </BrowserRouter>
  );
}

export default App
