import vision from "@google-cloud/vision";
import { unlink } from "fs/promises";

const client = new vision.ImageAnnotatorClient({
  keyFilename: "heroic-psyche-388413-5b37002b4190.json",
});

export async function readFromImage(path: string) {
  try {
    const result = await client.documentTextDetection(path);
    deleteImage(path);
    return result[0].textAnnotations![0].description;
  } catch (e) {
    return "";
  }
}

export async function deleteImage(path: string) {
  try {
    await unlink(path);
  } catch (e) {
    return;
  }
}
