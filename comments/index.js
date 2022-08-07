const express = require('express')
const bodyParser = require('body-parser')
const {randomBytes} = require('crypto')
var cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const commentsbyPostId = {}

app.get('/posts/:id/comments', (req,res)=>{
    res.send(commentsbyPostId[req.params.id] || [])
});


app.post('/posts/:id/comments', (req,res)=>{
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body

    const comments = commentsbyPostId[req.params.id] || []

    comments.push({id: commentId , content})

    commentsbyPostId[req.params.id] = comments

    res.status(201).send(comments)
});


app.listen(4001, ()=>{
    console.log('Listenning on 40001')
})