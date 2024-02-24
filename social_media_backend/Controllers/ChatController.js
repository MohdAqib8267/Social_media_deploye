import mongoose from "mongoose";
import ChatModel from '../Models/chatModel.js';


export const createChat = async(req,res)=>{
    //first check user alredy exist or not
    const existing = await ChatModel.find({
        members: {
            $all: [req.body.secondId, req.body.receiverId]
        }
    });
    
    if (existing) {
        return res.json(existing);
    }
    const newChat = new ChatModel({
        members:[req.body.senderId,req.body.receiverId],
    });
    try {
        const result = await newChat.save();
        res.status(200).json(result);
        
    } catch (error) {
        res.status(500).json(error);
    }
}

export const userChats = async(req,res)=>{
    // console.log(req.params);
    try {
        const chat = await ChatModel.find({
            members:{$in:[req.params.userId]}
        })
        res.status(200).json(chat);

    } catch (error) {
        res.status(500).json(error);
    }
}

export const findChat = async(req,res)=>{
    try {
        const chat = await ChatModel.findOne({
            members:{$all:[req.params.firstId,req.params.secondId]}
        })
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json(error);
    }
}