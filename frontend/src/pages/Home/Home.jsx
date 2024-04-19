import { useState } from "react";
import EntriesForm from "../../components/EntriesForn/EntriesForm";
import EntriesOutput from "../../components/EntriesOutput/EntriesOutput";

const Home = () => {
  const [allEntries, setAllEntries] = useState([]);
  console.log(allEntries);
  return (
    <>
      <div style={{ maxWidth: "40ch", marginInline: "auto" }}>
        <h1
          style={{ fontSize: "47px", textAlign: "left", marginBottom: "0px" }}
        >
          Das Gästebuch
        </h1>
        <p style={{ textAlign: "left", marginBlock: "10px 30px" }}>
          Jeder der cool ist darf was reinschreiben 🥶
        </p>
      </div>
      <EntriesForm setAllEntries={setAllEntries} />
      <EntriesOutput allEntries={allEntries} setAllEntries={setAllEntries} />
    </>
  );
};

export default Home;
