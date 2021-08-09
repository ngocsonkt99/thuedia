
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Users = require('../models/User')
const userController = {
    register: async (req, res) =>{
        try {
            const {account,name,phone, password} = req.body;

            const user = await Users.findOne({account})
            if(user) return res.status(400).json({msg: "The email already exists."})

            if(password.length < 6) 
                return res.status(400).json({msg: "Password is at least 6 characters long."})

            // Password Encryption
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
               account, name, phone, password: passwordHash
            })

            // Save mongodb
            await newUser.save()

            // Then create jsonwebtoken to authentication
            const accesstoken = createAccessToken({id: newUser._id})
             const refreshtoken = createRefreshToken({id: newUser._id})

            res.cookie('refreshtoken', refreshtoken, {
             httpOnly: true,
                 path: '/api/user/refresh_token',
                 maxAge: 7*24*60*60*1000 // 7d
             })

            res.json({accesstoken})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    login :async(req,res)=>{
        try {
            const {account, password} = req.body;

            const user = await Users.findOne({account})
            if(!user) return res.status(400).json({msg: "User does not exist."})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Incorrect password."})

            // If login success , create access token and refresh token
            const accesstoken = createAccessToken({id: user._id})
            const refreshtoken = createRefreshToken({id: user._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: 'api/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7d
            })
            
            res.json({accesstoken} )

            
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    logout:async (req,res)=>{
            try {
                res.clearCookie('refreshtoken', {path: 'api/user/refresh_token'})
            return res.json({msg: "Logged out"})
            } catch (error) {
                return res.status(500).json({msg: error.message})
            }
    },
    refreshToken: (req, res) =>{
        try {
            const rf_token = req.cookies.refreshtoken;
           // res.json({rf_token})
          if(!rf_token) return res.status(400).json({msg: "Please Login or Register"})

          jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
                if(err) return res.status(400).json({msg: "Please Login or Register"})

                const accesstoken = createAccessToken({id: user.id})

                res.json({accesstoken})
        })

        } catch (err) {
            return res.status(500).json({msg: err.message}) 
        }
        
    },
    getUser : async(req,res)=>{ 
      try {
        const user =await Users.findById(req.user.id).select("-password")
        if(!user) return res.status(400).json({msg: "User does not exist!"})
        res.json(user)
      } catch (error) {
          return res.status(500).json({msg: error.message})
      }
    },
  
}

const createAccessToken = (user) =>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '11m'})
}
const createRefreshToken = (user) =>{
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}
module.exports = userController