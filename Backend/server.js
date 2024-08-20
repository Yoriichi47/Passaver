import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config({path: './.env'}) // This will load the .env file
console.log(process.env.MONGO_URI) // This will output the value of MONGO_URI from the .env file

const app = express()
const port = 3000

const url = "mongodb://localhost:27017/passaver" // Connection URL
const client = new MongoClient(url) // Connection URL

const DBname = 'passaver' // Database name

client.connect() // Connect to the server

app.use(bodyParser.json()) // This will parse the body of the request
app.use(cors()) // This will enable CORS

// This will get all the passwords from the DataBase
app.get('/', async (req, res) => {  
    const db = client.db(DBname)  // Database name
    const collection = db.collection("Stored-Passwords")  // Collection name
    const findResult = await collection.find({}).toArray()  // Find all documents in the collection
    res.json(findResult) // Output the result in JSON format
})

// This will add a new password to the DataBase
app.post('/', async (req, res) => { 
    const password = req.body // Get the password from the body of the request
    const db = client.db(DBname) // Database name
    const collection = db.collection("Stored-Passwords") // Collection name
    const findResult = await collection.insertOne(password) // Insert a new document
    res.send({result: findResult}) // Output the result
}) 

// Deleting a password 
app.delete('/', async (req, res) =>{
    const password = req.body // Get the password from the body of the request
    const db = client.db(DBname) // Database name
    const collection = db.collection("Stored-Passwords") // Collection name
    const deletePass = await collection.deleteOne(password) // Delete the document by ID
    res.send({result: deletePass}) // Output the result
})

app.listen(port, () => {
    console.log(`The app is running on ${port}`)
})