import { db } from "../../../firebase";
import {
  collection,
  addDoc,
  getDocs
} from "firebase/firestore";

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
    console.log(error.message);
    res.status(403).json({ error: error.message });
  }
  res.end();
};
