import asyncHandler from "express-async-handler";

import {prisma} from '..config/prismaConfig.js'

export const createResidency = asyncHandler(async (req, res)=>{
    const {tittle,description,price,address,city,country,image,facilities,userEmail} = req.body.data;

    console.log(req.body.data);
    
    try{
     const residency = await prisma.residency.create({
        data:{
            tittle,
            description,
            price,
            address,
            country,
            city,
            facilities,
            image,
            owner :{connect :{email : userEmail}}

        }
      });  
      
      res.send({ message :"Residency created successfully" ,residency});
      } catch(err){
        if(err.code === "P2002")
        {
            throw new Error("A residency with address already there");
         }
         throw new Error(err.message);
    }
})

const getAllResidency = asyncHandler(async (req, res)=>{
    const recidency = await prisma.residency.findMany({
        orderby:{
            createdAt : 'desc'
        }
    })
})
