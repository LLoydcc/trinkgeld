import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** /api/entries/[id]
 * 
 * API controller for handling requests to the prisma client. 
 * 
 * It will either be necessary to add a 'trinkgeld.db' to the /prisma folder
 * or to add a .env file and connect to a database of choice. 
 * Visit https://www.prisma.io/docs/getting-started/quickstart for more infos.
 * 
 * Also the called API routes need to be adjusted to /api/entries in the frontend.
 */

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