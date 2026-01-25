import { promises as fs } from "fs";
import path from "path";
import archiver from "archiver";
import { isAuthenticated } from "../../../lib/auth";

const dataDir = path.join(process.cwd(), "data");
const backupsDir = path.join(process.cwd(), "backups");


async function getAllFiles(dir, baseDir = dir) {
  const files = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(baseDir, fullPath);

    if (entry.isDirectory()) {
      const subFiles = await getAllFiles(fullPath, baseDir);
      files.push(...subFiles);
    } else {
      files.push({ fullPath, relativePath });
    }
  }

  return files;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Ensure backups directory exists
    await fs.mkdir(backupsDir, { recursive: true });

    // Ensure data directory exists
    await fs.mkdir(dataDir, { recursive: true });

    // Create a timestamp for the backup filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupFilename = `backup-${timestamp}.zip`;
    const backupPath = path.join(backupsDir, backupFilename);

    // Get all files in the data directory
    let files = [];
    try {
      files = await getAllFiles(dataDir);
    } catch (err) {
      // If data directory doesn't exist or is empty, create empty backup
      console.log("No files found in data directory");
    }

    // Create the zip archive and collect all data
    const zipBuffer = await new Promise((resolve, reject) => {
      const archive = archiver("zip", { zlib: { level: 9 } });
      const chunks = [];

      archive.on("data", (chunk) => chunks.push(chunk));
      archive.on("end", () => resolve(Buffer.concat(chunks)));
      archive.on("error", (err) => reject(err));

      // Add all files to the archive
      for (const file of files) {
        archive.file(file.fullPath, { name: file.relativePath });
      }

      // Finalize the archive (this triggers the 'end' event when done)
      archive.finalize();
    });

    // Save the backup to the backups folder
    await fs.writeFile(backupPath, zipBuffer);

    // Return the zip file for download
    return new Response(zipBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${backupFilename}"`,
        "Content-Length": zipBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("Backup error:", error);
    return new Response(JSON.stringify({ error: "Failed to create backup: " + error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
