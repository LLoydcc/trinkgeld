import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {  
  
  try {
    switch (req.method) {
      case "GET":
        const allEntries = await prisma.WorkEntry.findMany();
        res.status(200).json(allEntries);
        break;
      case "POST":
        const entry = req.body;        
        const saveEntry = await prisma.WorkEntry.create({
          data: {
            time: entry.time,
            tours: entry.tours,
            tips: entry.tips,
            averageTips: entry.averageTips,
            averageTours: entry.averageTours,
            start: entry.start, 
            end: entry.end,
            hours: {
              create: entry.hours
            }
          },
        });        
        res.status(200).json("success");
      default:
        break;
    }
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};