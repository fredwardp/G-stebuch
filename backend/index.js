import express from "express";
import multer from "multer";
import cors from "cors";
import { param, body, validationResult } from "express-validator";
import { readEntry, writeEntry } from "./filesystem.js";

// server anlegen
const app = express();

// middleware um den body einer request zu parsen, damit auf den Inhalt zugegriffen werden kann
app.use(express.json());

//middleware um die cors policy zu umgehen
app.use(cors());

//middleware um jede Anfrage zu loggen
app.use((req, _, next) => {
  console.log("New Request:", req.method, req.url);
  next();
});

app.use(express.static("uploads"));

const upload = multer({ dest: "./uploads" });

app.post("/api/v1/entries/uploads", upload.single("img"), (req, res) => {
  res.json({ img: req.file.filename });
});

app.get("/api/v1/entries", (_, res) => {
  readEntry()
    .then((entries) => {
      if (entries) {
        res.status(200).json(entries);
      } else {
        res.status(404).json({ message: "No entries found" });
      }
    })
    .catch((err) =>
      res.status(500).json({ message: "Internal Server Error", err })
    );
});

app.get("/api/v1/entries/:id", (req, res) => {
  const entryId = req.params.id;
  readEntry()
    .then((entries) =>
      entries.filter((entry) => entry.id.toString() === entryId)
    )
    .then((entryFound) => {
      if (entryFound) {
        return res.status(200).json(entryFound);
      } else {
        return res.status(404).json({ message: "Could not find entry" });
      }
    })
    .catch((err) =>
      res.status(500).json({ message: "Internal server error", err })
    );
});

app.post("/api/v1/entries", (req, res) => {
  const date = Date.now();
  const dateFormat = new Date(date);
  const newEntry = {
    id: Date.now(),
    time: dateFormat.toUTCString(),
    vorname: req.body.vorname,
    nachname: req.body.nachname,
    email: req.body.email,
    nachricht: req.body.nachricht,
    img: req.body.img,
  };
  readEntry()
    .then((entries) => [newEntry, ...entries])
    .then((newEntriesData) => writeEntry(newEntriesData))
    .then((newEntriesData) => res.status(200).json(newEntriesData))
    .catch((err) =>
      res.status(500).json({ message: "Internal server error", err })
    );
});

app.patch("/api/v1/entries/:id", (req, res) => {
  const entryId = req.params.id;
  const updEntry = req.body;

  readEntry()
    .then((entries) =>
      entries.map((entry) => {
        if (entryId === entry.id.toString()) {
          return {
            ...entry,
            ...updEntry,
          };
        } else {
          return entry;
        }
      })
    )
    .then((updEntries) => writeEntry(updEntries))
    .then((updEntries) => res.status(200).json(updEntries))
    .catch((err) =>
      res.status(500).json({ message: "Internal Server Error", err })
    );
});

app.delete("/api/v1/entries/:id", (req, res) => {
  const entryId = req.params.id;
  readEntry()
    .then((entries) => {
      if (entries.filter((entry) => entry.id.toString() === entryId)) {
        return entries.filter((entry) => entry.id.toString() !== entryId);
      } else {
        return res
          .status(404)
          .json({ message: "Post could not be deleted", err });
      }
    })
    .then((updEntries) => writeEntry(updEntries))
    .then((updEntries) => res.status(200).json(updEntries))
    .catch((err) =>
      res.status(500).json({ message: "Internal server error", err })
    );
});

const PORT = 619;
app.listen(PORT, () => console.log("Server ready at Port:", PORT));
