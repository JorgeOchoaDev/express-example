const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ type: 'application/*+json' }))

mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
    console.log('Mongodb Connection Successful')
})

const dogSchema = new mongoose.Schema({
        name: String,
        breed: String,
        color: String,
        age: Number
    })

const Dog = mongoose.model('Dog', dogSchema)



app.get('/', async (req, res) => {
    const name = req.query.name
    let response
    if(name){
        response = await Dog.find({name}) 
    }else{
        response = await Dog.find()
    }
    
    res.send(JSON.stringify(response))
})

app.post('/', (req, res) => {
    const dog = new Dog(req.body)
    dog.save()
    res.send('perro guardado')
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})