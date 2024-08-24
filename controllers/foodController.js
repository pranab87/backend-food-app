
import foodModel from '../models/foodModel.js';
import fs from 'fs'
// Add food items
const addFood = async (req, res) => {
    let image_filename = req.file.filename;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await food.save();
        res.json({ success: true, message: `${req.body.name} Added` });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' });
    }
};

//all food list
const listFood=async(req,res)=>{
    
   try{
    const foods=await foodModel.find({});
    res.json({success:true,data:foods})
   }
   catch(error){
     console.log(error);
     res.json({success:false,message:"Error"})
   }
}

//remove food
const removeFood=async(req,res)=>{
try{
   const food=await foodModel.findById(req.body.id);
  // Remove the image file
  fs.unlink(`uploads/${food.image}`, (err) => {
    if (err) {
        console.log(err);
        return res.json({ success: false, message: 'Error deleting image file' });
    }
});
   await foodModel.findByIdAndDelete(req.body.id);
   res.json({success:true,message:`${food.name} Removed`})
}
catch(error){
 console.log(error);
 res.json({success:false,message:"Error"})
}
}



export { addFood,listFood,removeFood };
