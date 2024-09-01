const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel")
//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req,res) => {
    const {username, email, password } = req.body;
    if(!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
     // if the user alredy exists
    const userAvailable = await User.findOne({email});
    if(userAvailable) {
        res.status(400);
        throw new Error("User already registered");
    }

    //Hashing the  password
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("Hashed Password:", hashedPassword);
    // creating the new user
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log(`User created ${user}`);
    // user visualizing data 
    if(user) {
        res.status(201).json({ _id: user.id, email:user.email});
        } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.json({message: "Register the user"});
   }
);

//@desc login a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({ email });
    // compare original password with the hashed password by encrypting 
    if(user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
            //payload
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1n"}
    );
        res.status(200).json({ accessToken });
    }
    else {
        res.status(401);
        throw new Error("email and password is not valid");
    }
   });

//@desc user info
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async  (req,res) => {
    res.json({message: "Current user information"});
   }
);


module.exports = { registerUser  , loginUser, currentUser };