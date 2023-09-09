const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;
        
        let user = await User.findOne({ email: email });

        if (user) {
            return res.status(400).json({ message: "User Already Exists" });
        }

        user = new User({
            name: name,
            email: email,
            password: password
        });

        const salting = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salting);

        await user.save();


        // creating and return a JWT Token

        const payload = {
            user: {
                id: user.id,
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET,
            { expiresIn: '1h' }, (err, token) => {
                if (err) {
                    throw err;
                } else {
                    res.json({ token });
                }
            })
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Server Error" });
    }

}


const loginUser = async (req, res) => {
    try{

        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            res.status(400).json({message: "User Not Found"});
        }
        let flag = await bcrypt.compare(password, user.password)
        
        if(!flag){
            return res.status(400).json({message: "User Password do not Match"});
        }

        const payload = {
            user :{
                id : user.id
            }
        };

        jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1h'},(err,token)=>{
                if(err){
                    throw err;
                }
                res.json({token})
            }
        )

    }catch(err){
        console.log(err.message);
        res.status(500).json({ message: "Server Error" });
    }
}



module.exports = { registerUser, loginUser }