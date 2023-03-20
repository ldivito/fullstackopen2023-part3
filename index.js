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

app.use(express.static("build"));

app.get('/api/persons', (request,response, next) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
    .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
  Person.countDocuments({}).then(count => {
    let info = `<p>Phonebook has info for ${count} people</p>`
    info += new Date()
    response.send(info)
  }).catch(error => next(error))
})

app.get('/api/persons/:id', jsonParser,(request, response, next) => {
  Person.findById(request.params.id).then(result => {
    if (result) {
      response.json(result)
    }
    else
    {
      response.status(404).end()
    }
  }).catch(error => next(error))
})

app.put('/api/persons/:id', jsonParser, (request, response, next) => {
  const body = request.body

  const updatedPerson = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, updatedPerson, {new: true})
    .then(result => {
      response.json(result)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', jsonParser, (request, response, next) => {
  const body = request.body

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
    .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.message.includes('ObjectId')) {
    return res.status(400).json({ error: 'Malformatted ID' })
  }
  else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});