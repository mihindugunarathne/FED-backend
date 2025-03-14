import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Product name is required'] 
  },
  description: { 
    type: String, 
    required: [true, 'Product description is required'] 
  },
  price: { 
    type: Number, 
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative'] 
  },
  image: { 
    type: String, 
    required: [true, 'Product image URL is required'] 
  },
  category: { 
    type: String, 
    required: [true, 'Product category is required'] 
  }
}, {
  timestamps: true
});

export default mongoose.model('Product', productSchema);