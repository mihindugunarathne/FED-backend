import { Request, Response, NextFunction } from "express";
import Product from "../infrastructure/schemas/Product";
import { CreateProductDTO } from "../domain/dto/product";
import NotFoundError from "../domain/errors/not-found-error";
import ValidationError from "../domain/errors/validation-error";

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryId = req.query.categoryId as string;
    const query = categoryId && categoryId !== "ALL" ? { categoryId } : {};
    
    const products = await Product.find(query).lean();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Received product data:", req.body);
    const { name, description, price, image, category } = req.body;
    
    // Validate required fields
    if (!name || !description || !price || !image || !category) {
      console.log("Missing required fields:", { name, description, price, image, category });
      return res.status(400).json({
        message: "Missing required fields",
        receivedData: req.body
      });
    }

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      image,
      category
    });

    console.log("Created product:", product);
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    next(error);
  }
};

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    
    if (!product) {
      throw new NotFoundError("Product not found");
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      throw new NotFoundError("Product not found");
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const productData = CreateProductDTO.parse(req.body);
    const product = await Product.findByIdAndUpdate(id, productData, { new: true });

    if (!product) {
      throw new NotFoundError("Product not found");
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};