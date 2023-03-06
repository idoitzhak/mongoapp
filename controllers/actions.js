import express, { request } from "express";
const Router = express.Router();
import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Account from "../models/Account.js";
import Category from '../models/category.js';

Router.get('/getCategories', async(request,response) => {
    //OPTION 1
    
    //FIND ALL
    //const categories = await Category.find();

    //FIND ALL BY CONDITION
    //const categories = await Category.find({isPublished: true}); 

    //FIND ONE BY ID
    //const categories = await Category.findById('6405a367072afecea0fa20b0');

    //FIND ONE BY CONDITION
    const categories = await Category.findOne({isPublished: true}); 
    
    response.status(200).json({
        categories: categories
    })   
})

Router.post('/createNewCategory', async(request,response) => {
    // Create ObjectId
    const id = new mongoose.Types.ObjectId();
    // Get data from postman
    const categoryName = request.body.categoryName;
    // Create new document in Category collection
    const _category = new Category({
        _id: id,
        categoryName: categoryName,
    })
    _category.save()
    .then(results => {
        return response.status(200).json({
            results: results
        })
    })
    .catch(error => {console.log(error.message)})
})


//AUTH FUNCTIONS

//REGISTER
Router.post('/register', async(request,response) => {
    //GET ACCOUNT INFO FROM BODY
    const {firstName,lastName,email,password} = request.body;
    //CHECK IF USER (EMAIL) EXIST
    const isAccountExist = await Account.findOne({email:email});
    if(isAccountExist){
        return response.status(200).json({
            message: 'Account Exist'
        });
    }
    //PASSWORD CRYPT
    const hash_password = await bcryptjs.hash(password,10);
    //CREATE USER IN DB
    const id = new mongoose.Types.ObjectId();
    const _account = new Account({
        _id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hash_password
    })
    _account.save()
    .then(results => {
        return response.status(200).json({
            results: results
        })
    })
    .catch(error => {
        return response.status(500).json({
            message: error.message
        })
    })
})
//LOGIN
Router.post('/login',async(request,response) => {
    //GET ACCOUNT INFO FROM CLIENT
    const {email,password} = request.body;
    //CHECK IF USER EXIST BY EMAIL
    Account.findOne({email:email})
    .then(async account => {
        if(!account){
            return response.status(200).json({
                message: 'Account not Exist'
            }); 
        }
    //COMPARE PASSWORD
    const isMatch = await bcryptjs.compare(password,account.password);
    if (!isMatch){
        return response.status(200).json({
            message: 'Password not Match'
        });        
    }
    //GENERATE JWT TOKEN
    const dataToToken = {
        _id: account._id,
        name: account.firstName + " " + account.lastName,
        email: account.email,
        avatar: account.avatar
    }
    const token = await jwt.sign({dataToToken}, process.env.JWT_KEY,{expiresIn:'30d'});
    //RESPONSE
    return response.status(200).json({
        message: account,
        token: token
    })
})
    .catch(error => {
        return response.status(500).json({
            message: error.message
        })
    })
    
    
})


export default Router;