const express = require('express')
const dotenv = require('dotenv')
const app = express()
const cors = require("cors");


const connectDB = require('./db/connect')

const userRoutes = require('./routes/user.routes')
const noteRoutes = require('./routes/note.routes')

dotenv.config('')

connectDB()

app.use(express.json())
app.use(cors(
    {
        origin: ["https://krs-classes-2024-client.vercel.app/signin"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
app.use('/users', userRoutes)
app.use('/notes', noteRoutes)

app.get("/",(req,res)=>{
    res.json("hello")
})

app.get('/health', (req, res) => {
    res.json({ message: 'OK' }).status(200)
})
app.get('*', (req, res) => {
    res.json({ error: 'route not found' }).status(404)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`App has started on PORT: ${PORT}`)
})