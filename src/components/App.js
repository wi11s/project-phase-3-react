import '../App.css';
import Board from './Board'
import List from './List'
import { Routes, Route, useNavigate } from "react-router-dom"
import {useState, useEffect} from 'react'
import Login from './Login';
import TypeError from './TypeError';
import { Chess } from 'chess.js'


function App() {
  const navigate = useNavigate()
  const [users, setUsers] = useState(null)
  const [userId, setUserId] = useState(null)

  const [games, setGames] = useState([])
  const [id, setId] = useState(null)
  const [game, setGame] = useState(new Chess())

  useEffect(() => {
    fetch('http://localhost:9292/users')
    .then(res => res.json())
    .then(obj => {
      setUsers(obj)
    })
  }, [])
  
  function handleLoginSubmit(e, email, password){
    e.preventDefault();
    users.map((user) => {
      if (user.email === email && user.password === password) {
        fetch(`http://localhost:9292/mygames/${user.id}`)
        .then(r => r.json())
        .then(obj => {
          setGames(obj)
          setUserId(user.id)
        })
        .then(() => navigate('/home'))
        return true
      }
    })
  }

  // let userId = 2;

  function handleClick(id) {
    setId(id)
  }

  return (
    <div>
      <Routes>
        <Route path='/home' element={<List games={games} handleClick={handleClick}/>} />
        <Route path='/board' element={<Board id={id} game={game} setGame={setGame} userId={userId}/>} />
        <Route path="/" element={<Login handleLoginSubmit={handleLoginSubmit}/>}/>
        {/* <Route path='/login' element={<Login />} /> */}
        <Route path="*" element={<TypeError />}/>
        <Route path="/" element={<Board/>}/>
      </Routes>
    </div>
  );
}

export default App;