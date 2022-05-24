import './App.css'
import { useAuth } from './Auth'
import { Login } from './Login';
import logo from './logo.svg'

function App() {
  const auth = useAuth();
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Meal Planner Admin</p>
      </header>
      
      <main>
      {auth.currentPerson === null ? <Login /> : "admin goes here"}
      </main>
    </div>
  )
}

export default App
