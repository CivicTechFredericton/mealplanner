import fs from "fs";
import path from "path";
import axios from "axios";
import pkg from "xlsx";
const XLSX = pkg;
const { readFile } = pkg;

const CONFIG = {
  excelFile: "meal_urls.xlsx",
  jsonFile: "meals-ingredients-substitutes.json",
  outputDir: "../mealplanner-ui/public/images/pictures",
  imagePath:"images/pictures"
};


function checkDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}


function readExcel(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Excel file not found: ${filePath}`);
  }

  const workbook = readFile(filePath);
  const sheet = workbook.Sheets["Meal URLs and Meal Code"];
  if (!sheet) throw new Error("Sheet 'Meal URLs and Meal Code' not found.");
  const allRows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });

  let headerRowIndex = -1;
  for (let i = 0; i < allRows.length; i++) {
    const row = allRows[i].map((cell) => String(cell).trim().toLowerCase());
    if (row.includes("meal name") && row.includes("image url")) {
      headerRowIndex = i;
      break;
    }
  }

  if (headerRowIndex === -1) {
    throw new Error("Could not find 'Meal Name' and 'Image URL' header row.");
  }

  console.log("Header detected on Excel row ",headerRowIndex + 1);

  // Converted to JSON using that row as header
  const rows = XLSX.utils.sheet_to_json(sheet, {
    range: headerRowIndex,
    defval: "",
  });

  console.log("Columns:", Object.keys(rows[0] || {}));

  const filtered = rows
    .map((r) => ({
      mealName: r["Meal Name"]?.trim(),
      imageUrl: r["Image URL"]?.trim(),
      videoUrl: r["Video URL"]?.trim(),
    })).filter((r) => r.mealName);

  console.log("Loaded meal entries",filtered.length);
  return filtered;
}

async function downloadImage(url, outputDir, mealName) {
  try {
    if (!url || !url.startsWith("https")) return null;

    const urlPath = new URL(url);
    let fileName = path.basename(urlPath.pathname);
    fileName = decodeURIComponent(fileName);
    const filePath = path.join(outputDir, fileName);

    if (fs.existsSync(filePath)) {
      console.log("Already downloaded: ",fileName);
      return filePath;
    }

    console.log("Downloading for",mealName,":",fileName);
    const response = await axios.get(url, { responseType: "arraybuffer" });
    fs.writeFileSync(filePath, response.data);
    console.log("Saved:", fileName);

    return filePath;
  } catch (err) {
    console.warn("Failed to download",url, err.message);
    return null;
  }
}


function normalizeName(name) {
  return name?.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, " ").trim();
}

async function mergeWithJson(excelData, jsonData) {
  for (const row of excelData) {
    const { mealName, imageUrl, videoUrl } = row;

    const match = jsonData.find(
      (meal) => normalizeName(meal.name_en) === normalizeName(mealName)
    );

    if (!match) {
      console.warn("No match found for:",mealName);
      continue;
    }

    // Downloaded image and updated photo_url with local path
    let downloadedPath = null;
    if (imageUrl && imageUrl.startsWith("https")) {
      downloadedPath = await downloadImage(imageUrl, CONFIG.outputDir, mealName);
    }

    if (downloadedPath) {
      // Saved relative path
      const fileName = path.basename(downloadedPath);
      const localPath = path.posix.join(CONFIG.imagePath, fileName);
      match.photo_url = localPath;
    }

    // Updated video_url 
    if (videoUrl && videoUrl.startsWith("http")) {
      match.video_url = videoUrl;
    }

    console.log("Updated JSON for:",mealName);
  }

  return jsonData;
}

(async function main() {
  try {
    checkDir(CONFIG.outputDir);
    const excelData = readExcel(CONFIG.excelFile);
    const jsonData = JSON.parse(fs.readFileSync(CONFIG.jsonFile, "utf8"));
    const updated = await mergeWithJson(excelData, jsonData);
    fs.writeFileSync(CONFIG.jsonFile, JSON.stringify(updated, null, 2));
    console.log("Merge completed!", CONFIG.jsonFile);
  } catch (err) {
    console.error("Error:", err.message);
  }
})();
