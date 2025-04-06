import mongoose from "mongoose";

const reportSchema = mongoose.Schema(
  {
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    reason: { type: String, required: true },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);
export default Report;