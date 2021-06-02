require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const port = process.env.PORT || 3000;

//bcrypt package
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(express.static("public"));

// set the view engine to ejs
app.set('view engine', 'ejs');

//schema for useNewUrlParser
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = new mongoose.model("User", userSchema);

// Schema for resourcedb
const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your full-name"]
  },
  address: {
    type: String,
    required: [true, "Please enter your Home-Address"]
  },
  state: {
    type: String,
    required: [true, "Please enter from which state you are"]
  },
  city: {
    type: String,
    required: [true, "Please enter your City"]
  },
  district: {
    type: String,
    required: [true, "Please enter the district"]
  },
  pincode: {
    type: Number,
    required: [true, "Please enter the pin-code"]
  },
  email: {
    type: String,
    required: [true, "Please enter your email address"]
  },
  contact: {
    type: Number,
    required: [true, "Please enter your phnone-no"]
  },
  description: {
    type: String,
    required: [true, "Description of the things are required"]
  },
  pic: {
    data: Buffer,
    contentType: String
  },
  rating: {
    type: Number,
    required: [true, "Please enter the rating "],
    min: 1,
    max: 10
  }
});

const Resource = mongoose.model("Resource", resourceSchema);
//Resource is the model name and Resources is the collection


//Default data into DB some Do's and Dont's guidelines while donating Medicines etc.
const data1 = new Resource({
  name: "Tisha Soumya",
  address: "Jamshedpur",
  state: "Jharkhand",
  city: "Jamshedpur",
  district: "East Singhbhum",
  pincode: 831001,
  email: "tishasoumya@gmail.com",
  contact: 7970636852,
  description: "What you can donate:Any type of tablets (including ayurvedic tablets)Unopened/Sealed bottles of syrup, creams, balms, or any type of liquid",
  rating: 9,

});

const data2 = new Resource({
  name: "Salokya Kumar",
  address: "Jamshedpur",
  state: "Jharkhand",
  city: "Jamshedpur",
  district: "East Singhbhum",
  pincode: 833201,
  email: "kumar.salokya007@gmail.com",
  contact: 8051029779,
  description: "What you can’t donate:1. Homeopathic medicine 2.Opened/Unsealed bottles of syrup, creams, balms, or any type of liquid (due to possible contamination)",
  rating: 9,

});
const data3 = new Resource({
  name: "Sayan Bhattacharyya",
  address: "Kolkata",
  state: "Kolkata",
  city: "Kolkata",
  district: "Kolkata",
  pincode: 700012,
  email: "sayan.bhatta2017@gmail.com",
  contact: 7044509519,
  description: "What you can’t donate: 3.Medicines requiring refrigeration 4. Expired medicines 5.Used syringes, cotton, etc.",
  rating: 9,

});

const defaultItems = [data1, data2, data3];

//Date
var today = new Date();
var dd = today.getDate();

var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
if (dd < 10) {
  dd = '0' + dd;
}

if (mm < 10) {
  mm = '0' + mm;
}
today = dd + '/' + mm + '/' + yyyy;
//Date


app.get("/", function(req, res) {
  res.render("index");
});

//login authentication
app.get("/login", function(req, res) {
  res.render("login");
});

app.post("/login", function(req, res) {
  const username = req.body.email;
  const password = req.body.password;

  User.findOne({
    email: username
  }, (err, foundUser) => {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        bcrypt.compare(password, foundUser.password, function(err, result) {
          if (result === true) {
            res.render("donateform")
          }
        });
      }
    }
  })
})

//signup authentication and retreiving user data
app.get("/signup", function(req, res) {
  res.render("signup");
});

app.post("/signup", function(req, res) {
  bcrypt.hash(req.body.cnfpassword, saltRounds, function(err, hash) {
    const newUser = new User({
      email: req.body.email,
      password: hash
    });

    newUser.save((err) => {
      if (err) {
        console.log(err);
      } else {
        res.render("donateform");
      }
    });
  });
})



app.get("/forgotpwd", function(req, res) {
  res.render("forgotpwd");
});



app.get("/donate", function(req, res) {
  res.render("login");
});

app.get("/resources", function(req, res) {
  Resource.find({}, function(err, foundItems) {
    if (foundItems.length === 0) {
      Resource.insertMany(defaultItems, function(err) {
        if (err)
          console.log(err);
        else
          console.log("Success");
      });
      res.redirect("/resources");
    } else
      res.render("resources", {
        date: today,
        newItemsList: foundItems,
        pic: foundItems.pic
      });
  });
});

app.post("/donate", function(req, res) {
  const dname = req.body.fullname;
  const daddress = req.body.address;
  const dstate = req.body.state;
  const dcity = req.body.city;
  const ddistrict = req.body.district;
  const dpincode = req.body.pincode;
  const demail = req.body.email;
  const dcontact = req.body.contact;
  const ddescription = req.body.description;

  const drating = req.body.rating;

  const data = new Resource({
    name: dname,
    address: daddress,
    state: dstate,
    city: dcity,
    district: ddistrict,
    pincode: dpincode,
    email: demail,
    contact: dcontact,
    description: ddescription,
    rating: drating,
  });

  data.save();
  res.redirect("/resources");
});

app.listen(port, function() {
  console.log(`Server is running on port ${port}`);
});
