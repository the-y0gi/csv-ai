import csv from "csv-parser";
import { Readable } from "stream";

export const processCSVStream = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = Readable.from(buffer.toString());

    let rowCount = 0;
    let columns = [];
    const columnStats = {};

    stream
      .pipe(csv())
      .on("headers", (headers) => {
        columns = headers;

        headers.forEach((header) => {
          columnStats[header] = {
            type: "unknown",
            missing: 0,
            min: null,
            max: null,
            sum: 0,
            count: 0,
          };
        });
      })
      .on("data", (row) => {
        rowCount++;

        columns.forEach((col) => {
          const value = row[col];

          if (!value || value.trim() === "") {
            columnStats[col].missing++;
            return;
          }

          const num = Number(value);

          if (!isNaN(num)) {
            columnStats[col].type = "number";

            columnStats[col].min =
              columnStats[col].min === null
                ? num
                : Math.min(columnStats[col].min, num);

            columnStats[col].max =
              columnStats[col].max === null
                ? num
                : Math.max(columnStats[col].max, num);

            columnStats[col].sum += num;
            columnStats[col].count++;
          } else {
            if (columnStats[col].type === "unknown") {
              columnStats[col].type = "string";
            }
          }
        });
      })
      .on("end", () => {
        // Finalize averages
        Object.keys(columnStats).forEach((col) => {
          if (columnStats[col].type === "number") {
            columnStats[col].avg =
              columnStats[col].count > 0
                ? columnStats[col].sum / columnStats[col].count
                : 0;
          }
        });

        resolve({
          rowCount,
          columnCount: columns.length,
          columns,
          columnStats,
        });
      })
      .on("error", reject);
  });
};
