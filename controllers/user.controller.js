const User = require('../models/user.model').model;
const Listed = require('../models/listed.model').model;

module.exports.home = (_,res) => res.redirect('/user.html');

module.exports.me =
  async (req, res) =>  {
    const user = await User.findById(req.userId);
    console.log(user);
    console.log(req.userId);
    res.status(200).json(user);
  }

  module.exports.listed =
  async (req, res) =>  {
    const listed = await Listed.find();
    console.log(listed);
    res.status(200).json(listed);
  }
module.exports.update =
  async (req,res) => {
    const updatedData = { ...req.body };
    console.log(updatedData);
    const user = await User.findByIdAndUpdate(req.userId,
                                              updatedData,
                                              { new : true });
  }

  module.exports.updatelisted =
  async (req,res) => {
    try {
      const newitem = { ...req.body };
    console.log(newitem);
    const listed = await Listed.create(newitem) ;
  }
  catch (err){
    console.log(`pb d'ajout d'un element  ${err.message}`);
    res.status(409).json({ message : err.message });
  }
  }

