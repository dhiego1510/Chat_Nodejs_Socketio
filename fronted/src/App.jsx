import io from 'socket.io-client'
import { useState, useEffect} from 'react'

const socket = io("/")

function App() {
  const [message, setMessages] = useState('')
  const [chat, setChat] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('message', message)
  }

  useEffect(() => {
    socket.on('message', message => {
      console.log(message);
      setChat([...chat, message])
    })
  }, [])


  return (
    <div>

      <form onSubmit={handleSubmit}>

        <input type="text" placeholder='Write your message..'
          onChange={(e) => setMessages(e.target.value)}/>

        <button>
          Send
        </button>

      </form>

      <ul>
        {
          chat.map( (message, i) => (
            <li key={i}>{message}</li>
          ))
        }
      </ul>

    </div>
  )
}

export default App
