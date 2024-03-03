import io from 'socket.io-client'
import { useState, useEffect} from 'react'

const socket = io("/")

function App() {
  const [message, setMessages] = useState('')
  const [chat, setChat] = useState([ ])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newMessage = {
      body: message,
      from: 'Me '
    }


    setChat([...chat, newMessage])
    socket.emit('message', message)
  }

  useEffect(() => {
    socket.on('message', receiveMessage);
  
    return () => {
      socket.off('message', receiveMessage);
    } 
  }, [])

  const receiveMessage = (message) => 
    setChat(state => [...state, message])

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
            <li key={i}>
              {message.from}: {message.body}</li>
          ))
        }
      </ul>

    </div>
  )
}

export default App
