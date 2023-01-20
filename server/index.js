const exp = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = exp();
app.use(cors());

mongoose.connect("mongodb+srv://arpan9477:arpan9477@arpanecommerce.mhcfpog.mongodb.net/ecommerce?retryWrites=true&w=majority");

app.get("/",(req,res) => {
    res.send('Hello');
})

app.listen(5000);