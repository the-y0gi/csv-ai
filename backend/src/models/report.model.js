import mongoose from "mongoose";

const columnStatSchema = new mongoose.Schema(
  {
    type: String,
    min: Number,
    max: Number,
    avg: Number,
    missing: Number,
  },
  { _id: false }
);

const reportSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    rowCount: {
      type: Number,
      required: true,
    },

    columnCount: {
      type: Number,
      required: true,
    },

    columnStats: {
      type: Map,
      of: columnStatSchema,
    },

    insights: {
      type: String,
      required: true,
    },

    processingTimeMs: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

reportSchema.index({ createdAt: -1 });

export const Report = mongoose.model("Report", reportSchema);
