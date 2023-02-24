import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  const { query } = req  
  try {
    const entry = await prisma.WorkEntry.findUnique({
      where:{
        id: parseInt(query.Id)         
      }, 
      include: {
        hours: true
      }
    });
    res.status(200).json(entry);
  } catch (error) {
    res.status(403).json({ error: error.message });
  }  
}