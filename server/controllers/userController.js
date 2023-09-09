const User = require('../models/User');

// @desc GET 
// @route api/users/
const getUser = async (req, res) => {
  
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }

};

/// @desc PUT
// @route api/users
const editUser = async (req, res) => {
  
    try{
        const {name,email,mobile} = req.body;

         const user = await User.findById(req.user.id).select('-password');
         if(!user){
           return  res.status(404).json({message:"user not Found"});
         }

         if(user._id.toString() !== req.user.id){
            return res.status(401).json({message:"Not Authorized User"});
         }

         user.name = name;
         user.email = email;
         user.mobile = mobile;

         await user.save();

         res.json(user);


    }catch(err){
        console.log(err.message);
        res.status(500).send("server error");
    }

}

// @route DELETE
// @desc api/users

const deleteUser = async (req, res) => {
  
    try{

        await User.deleteOne( {email: req.body.email}).then(
                res.status(200).json({message:"Successfully deleted"}))

    }catch(err){
        console.log(err.message);
        res.status(500).send("server error");
    }


}

module.exports = {getUser,editUser,deleteUser};

