import { Report } from "../models/report.model.js";

export const saveReport = async (data) => {
  return await Report.create(data);
};

export const getLastReports = async () => {
  return await Report.find().sort({ createdAt: -1 }).limit(5).select("-__v");
};

export const getReportById = async (id) => {
  return await Report.findById(id).select("-__v");
};
