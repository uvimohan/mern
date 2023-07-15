const express= require("express")
const app = express()
const cors = require("cors");
const mongoose = require("mongoose");
const User = require('./models/user.model');

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.post('/api/register', async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        
        if(user.save()) {
            res.json({ status: "success", user: true })
        } else {
            res.json({ status: "failed", user: false })
        }
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ error: 'User with the same Email already exists' });
        } else {
            res.status(500).json({ error: 'Server error' });
        }
    }
})

app.post('/api/login', async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
            password: req.body.password,
        })
        if(user) {
            res.json({ status: "success", user: true })
        } else {
            res.json({ status: "failed", user: false })
        }
    } catch (error) {
        res.json({ status: error })
    }
})

app.listen(8000, () => {
    console.log(`Server running in port 8000`)
})