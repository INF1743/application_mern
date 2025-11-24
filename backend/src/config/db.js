import mongoose from "mongoose";

export const connecterDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connecté : ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Erreur connexion MongoDB :", error.message);
    process.exit(1);
  }
};
