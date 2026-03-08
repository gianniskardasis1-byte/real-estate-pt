import asyncHandler from "express-async-handler";

import { prisma } from '../config/prisma.configs.js';

export const createResidency = asyncHandler(async (req, res)=>{
    const { tittle, description, price, address, city, country, image, facilities, userEmail } = req.body.data ?? req.body;

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
            userEmail,
            owner :{connect :{email : userEmail}}

        }
      });

      return res.status(201).json({
        message: 'Residency created successfully',
        residency,
      });
    }catch(err){
        if(err.code === "P2002")
        {
            throw new Error("A residency with address already there");
         }
         throw new Error(err.message);
    }
});
