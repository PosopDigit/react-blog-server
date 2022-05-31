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

app.get('/Post', (req, res) => {
    let Posts = []
    db.collection('Post')
    .find()
    .sort()
    .forEach(Post => Posts.push(Post))
    .then(() => {
        res.status(200).json(Posts)
    })
    .catch(() =>{
        res.status(500).json({error: 'Не читает документ' })
    })
})

app.get('/Post/:id', (req, res) => {

    if(ObjectId.isValid(req.params.id)) {
        db.collection('Post')
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