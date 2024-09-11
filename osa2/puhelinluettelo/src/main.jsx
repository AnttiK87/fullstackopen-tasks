import ReactDOM from 'react-dom/client'

import App from './App'

const persons = [
  {
    name: 'Antti Kortelainen',
    number: '044-1234567'
  },
  {
    name: 'Matti Meikäläinen',
    number: '044-3456789'
  },
  {
    name: 'Anne Muukalainen',
    number: '+35844-5568987'
  }
]

ReactDOM.createRoot(document.getElementById('root')).render(
  <App persons={persons} />
)

const result = persons.map(person => person.id)
console.log(result)