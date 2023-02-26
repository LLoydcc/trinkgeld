import { db } from "../../../firebase/config";
import {
  collection,
  addDoc,
  getDocs
} from "firebase/firestore";


/** /api/workentries/[id]
 * 
 * API controller for handling requests to a firestore. 
 * 
 * This route is the default route used. 
 * It is needed to add a personal firebase config in firebase/config.js.
 */
export default async (req, res) => {
  try {
    switch (req.method) {
      case "GET":
        const entries = await getDocs(collection(db, 'workentries'));
        let result = [];
        entries.forEach(element => {
            let entry = {
                id: element.id,
                data: element.data()
            }
            result.push(entry)
        });
        res.status(200).json(result);
        break;
      case "POST":
        const entry = req.body; 
        await addDoc(collection(db, "workentries"), {
            time: entry.time,
            date: new Date().getTime(),
            tours: entry.tours,
            tips: entry.tips,
            averageTips: entry.averageTips,
            averageTours: entry.averageTours,
            start: entry.start, 
            end: entry.end,
            hours: entry.hours
        });
        res.status(200).json("success");
        break;
    }
  } catch (error) {    
    res.status(403).json({ error: error.message });
  }
  res.end();
};
