const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

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

app.get('/api/persons', (request,response) => {
  response.json(persons)
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
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    persons = persons.filter(person => person.id != id)
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

app.post('/api/persons', jsonParser, (request, response) => {
  const body = request.body

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

  persons = persons.concat(person)

  response.json(person)
})

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});