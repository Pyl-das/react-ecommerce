const exp = require('express');
const cors = require('cors');
const db = require("./models");
const app = exp();
const dotenv = require('dotenv');
dotenv.config();

var corsOption = {
    origin: "http://localhost:3000"
}
app.use(cors(corsOption));
// parse requests of content-type - application/json
app.use(exp.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(exp.urlencoded({ extended: true }));

const UserType = db.usertype;
db.mongoose.set('strictQuery',false);
db.mongoose
    .connect("mongodb+srv://arpan9477:arpan45@arpanecommerce.mhcfpog.mongodb.net/ecommercedb?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

app.get("/",(req,res) => {
    res.send('Hello');
})
// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/category.routes")(app);

app.listen(5000);

function initial() {
    UserType.estimatedDocumentCount((error, count) => {
        if (!error && count === 0) {
            new UserType({
                name: "superadmin",
                status: 0
            }).save(err => {
                if (err) {
                  console.log("error", err);
                }
                console.log("added 'superadmin' to usertype collection");
            });

            new UserType({
                name: "admin",
                status: 0
            }).save(err => {
                if (err) {
                  console.log("error", err);
                }
                console.log("added 'admin' to usertype collection");
            });
        } else {
            UserType.update({status: 0},
                {multi:true}, 
                function(err, numberAffected){  
                })
        }
    })
}