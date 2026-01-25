// lib/ensureDataFiles.js
import { promises as fs } from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

const dataFiles = [
  { name: "blogs.json", defaultContent: [] },
  { name: "resources.json", defaultContent: [] },
  { name: "testimonials.json", defaultContent: [] },
];

const dataDirs = [
  "resources", // for uploaded resource files
];

export async function ensureAllDataFiles() {
  // Ensure the data directory exists
  await fs.mkdir(dataDir, { recursive: true });

  // Ensure all subdirectories exist
  for (const dir of dataDirs) {
    await fs.mkdir(path.join(dataDir, dir), { recursive: true });
  }

  // Ensure all JSON files exist
  for (const file of dataFiles) {
    const filePath = path.join(dataDir, file.name);
    try {
      await fs.access(filePath);
    } catch (err) {
      if (err?.code === "ENOENT") {
        await fs.writeFile(
          filePath,
          JSON.stringify(file.defaultContent, null, 2),
          "utf-8"
        );
        console.log(`Created missing data file: ${file.name}`);
      } else {
        throw err;
      }
    }
  }
}
