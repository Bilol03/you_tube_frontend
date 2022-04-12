const PORT = process.env.PORT || 4000
const express = require("express")
const app = express()
const cors = require('cors')
const path = require('path')

app.use( express.static( path.join(__dirname, "public") ) )


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"))
})
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "views", "login.html"))
})
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, "views", "register.html"))
})
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, "views", "admin.html"))
})


app.listen(PORT, () => console.log("This server is running on http://192.168.0.15:" + PORT))