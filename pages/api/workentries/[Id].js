import { db } from "../../../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export default async (req, res) => {
  const { query } = req;
  try {
    const ref = doc(db, "workentries", query.Id);
    const entry = await getDoc(ref);
    res.status(200).json(entry.data());
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};
