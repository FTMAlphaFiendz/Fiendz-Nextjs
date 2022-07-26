import { Schema, model, models } from "mongoose";
const LeaderboardSchema = new Schema(
  {
    account: {
      type: String,
      required: true,
      unique: true,
      maxLength: 16,
    },
    walletScore: {
      type: Number,
      require: true,
      maxLength: 10,
    },
    displayName: {
      type: String,
      required: false,
      maxLength: 100,
    },
  },
  {
    timestamps: true,
  }
);

//if not exists than create a table but if exists use schema
export default models.Leaderboard || model("Leaderboard", LeaderboardSchema);
