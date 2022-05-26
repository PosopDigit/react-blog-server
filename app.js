const express = require('express')
const res = require('express/lib/response')
const { download } = require('express/lib/response')
const { ObjectId } = require('mongodb')
const { connectToDb, getDb } = require('./db')

const app = express()

let db 
connectToDb((err) => {
    if(!err) {
        app.listen(3001, () => {
            console.log('server rabotaet')
        })
        db = getDb()
    }
})

app.get('/books', (req, res) => {
    let books = []
    db.collection('books')
    .find()
    .sort()
    .forEach(book => books.push(book))
    .then(() => {
        res.status(200).json(books)
    })
    .catch(() =>{
        res.status(500).json({error: 'Не читает документ' })
    })
})

app.get('/books/:id', (req, res) => {

    if(ObjectId.isValid(req.params.id)) {
        db.collection('books')
        .findOne({_id: ObjectId(req.params.id)})
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({error: 'Не читает документ'})
        })
    }
    else{
        res.status(500).json({error: 'Not a valid a id'})
    }
})