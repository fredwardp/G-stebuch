import { useEffect } from "react";
import SingleEntry from "../SingleEntry/SingleEntry";

const EntriesOutput = ({ setAllEntries, allEntries }) => {
  useEffect(() => {
    fetch("http://localhost:619/api/v1/entries")
      .then((res) => res.json())
      .then((entries) => setAllEntries(entries))
      .catch((err) => console.log("Could not load entries", err));
  }, []);

  return (
    <article className="entries-wrapper">
      {allEntries.map((entry) => (
        <SingleEntry
          key={entry.id}
          entry={entry}
          setAllEntries={setAllEntries}
        />
      ))}
    </article>
  );
};

export default EntriesOutput;
