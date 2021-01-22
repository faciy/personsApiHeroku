const express = require('express')
const cors = require('cors')
// const morgan = require('morgan') 

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
// app.use(morgan("tiny"))


let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]


// console.log('pers', persons)

let date1 = Date();

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
  <p>${date1} </p>`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const personne = persons.find(person => person.id === id)
    if (personne) {
        response.json(personne)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    personne = persons.filter(person => person.id !== id)

    response.status(204).end()
})




const generateId = () => {
  const maxId = persons.length > 0
  ? Math.max(...persons.map(n => n.id))
  : 0
  console.log('maxId', maxId)
  return maxId + 1
}


app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log('body', body)
  
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name and number is void' 
    })
  }
  if(persons.map(val => val.name).includes(body.name) !=""){
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }
  
  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }
  
  persons = persons.concat(person)
  
  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})