import  express, { request, response } from "express";
import mysql from 'mysql';
import cors from 'cors';
import { configDB } from "./configDB.js";


const db = mysql.createConnection(configDB)
const app = express()
app.use(express.json())

app.use(cors())

app.get('/all',(request,response)=>{
    console.log("ok")
    db.query('select * from todo',(error, results)=>{
        if (error)
            console.log(error)
        else 
            response.send(results)
    })
})
app.post('/add',(request,response)=>{
    const {name} = request.body
    db.query('INSERT INTO todo(name) VALUES (?)',[name],(error, results)=>{
        if (error)
            console.log(error)
        else 
            response.send(results)
    })
})
app.delete('/delete/:id',(request,response)=>{
    const {id} = request.params
    db.query('delete from todo where id=?',[id],(error, results)=>{
        if (error)
            console.log(error)
        else 
            response.send(results)
    })
})

app.put('/done/:id',(request,response)=>{
    const {id} = request.params
    db.query('update todo set status=not status where id=?',[id],(error, results)=>{
        if (error)
            console.log(error)
        else 
            response.send(results)
    })
})

app.delete('/deleteAll',(request,response)=>{
    const {id} = request.params
    db.query('delete from todo',[id],(error, results)=>{
        if (error)
            console.log(error)
        else 
            response.send(results)
    })
})


app.listen(8000,()=>console.log("server listening..."))