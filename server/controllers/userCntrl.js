import asyncHandler from 'express-async-handler'

import {prisma} from "..config/prismaconfig.js"

export const createUser = asyncHandler(async(req,res) => {
  console.log("creating a user");

  let {email} = req.body;

  console.log(email)
   const userExists = await prisma.user.findUnique({where:{email: email}})
   if(!userExists) {
    const user = await prisma.user.create({data: req.body})
    res.send({
        message: "User register successfully"
        user: user,
     });
   }
   else.status(201).json({message:'User already registered'})

})