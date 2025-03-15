const express=require("express");

const mongoose=require("mongoose");


mongoose.connect("mongodb+srv://bigyanacharya224:2005%23Nov25@cluster0.yrkey.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const userSchema=mongoose.Schema({
    username:String,
    email:String,
    password:String
})

module.exports=mongoose.model("user",userSchema);