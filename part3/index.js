require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())

app.use(express.static('dist'))

app.use(express.json())
app.use(morgan('tiny'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

let currentDate = new Date();


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${currentDate}</p>
    `)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(persons => {
    response.json(persons)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(persons => persons.id !== id)

  response.status(204).end()
})

const generateId = (max) => {
  return Math.floor(Math.random() * max)
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  const nameExists = persons.some(p => p.name === body.name)
  
  if (body.name === undefined) {
    return response.status(400).json({
      error: 'name missing'
    })
  }
  else if (body.number === undefined) {
    return response.status(400).json({
      error: 'number missing'
    })
  }
  else if (nameExists) {
    return response.status(400).json({
      error: 'name already exists, must be unique'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})