import fs from "fs";
import url from "url";
import path from "path";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const readJsonFile = (path) => {
  return new Promise((res, rej) => {
    fs.readFile(path, (err, buff) => {
      if (err) return rej(err);
      const jsonString = buff.toString();
      const jsObj = JSON.parse(jsonString);
      res(jsObj);
    });
  });
};

export const readEntry = () => {
  return readJsonFile(__dirname + "/data/eintraege.json");
};

const writeJsonFile = (path, jsObj) => {
  return new Promise((res, rej) => {
    const jsonString = JSON.stringify(jsObj, null, 2);
    fs.writeFile(path, jsonString, (err) => {
      if (err) return rej(err);
      res(jsObj);
    });
  });
};

export const writeEntry = (jsObj) => {
  return writeJsonFile(__dirname + "/data/eintraege.json", jsObj);
};
