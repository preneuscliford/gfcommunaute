import mongoose from "mongoose";

// Définition du schéma de thread
const threadSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  theadImage: {
    // Nouvelle propriété pour l'image de l'auteur
    type: String,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  parentId: {
    type: String,
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  likes: {
    type: Number,
    default: 0,
  },
  likedBy: [{ type: String }],
});

// Définition et export du modèle "Thread"
const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);
export default Thread;
