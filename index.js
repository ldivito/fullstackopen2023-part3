require('dotenv').config()
const express = require("express");
const bodyParser = require('body-parser')
const morgan = require("morgan");
const cors = require('cors')
const Person = require('./models/person')

const app = express();
const jsonParser = bodyParser.json()

app.use(cors())

morgan.token('info', (request) => {
  if (request.method === 'POST') return JSON.stringify(request.body)
  return null
})

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :info',
  ),
)

app.use(express.static('build'))


app.get('/api/persons', (request,response) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
})

app.get('/info', (request, response) => {
  const infoMessage = `<p>Phonebook has info for ${persons.length} people</p>` + `<p>${new Date()}</p>`;
  response.send(infoMessage);
})

app.get('/api/persons/:id', jsonParser,(request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      console.log(error)
      response.status(404).end()
    })
})

app.post('/api/persons', jsonParser, (request, response) => {
  const body = request.body

  if(body.name === undefined) {
    return response.status(400).json({error: 'content missing'})
  }

/*
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  const duplicatedName = persons.some(person => person.name === body.name);

  if (duplicatedName) {
    return response.status(422).json({
      error: "A person with this name is already in registered"
    });
  }
  const person = {
    id: Math.floor(Math.random() * 100000000000),
    name: body.name,
    number: body.number,
  }
*/

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then(
      savedPerson => {
        response.json(savedPerson)
      }
    )
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});