import { useState } from "react";
import EntriesForm from "../../components/EntriesForn/EntriesForm";
import EntriesOutput from "../../components/EntriesOutput/EntriesOutput";

const Home = () => {
  const [allEntries, setAllEntries] = useState([]);
  return (
    <>
      <div style={{ maxWidth: "50ch", marginInline: "auto" }}>
        <h1
          style={{ fontSize: "52px", textAlign: "left", marginBottom: "0px" }}
        >
          Das Gästebuch
        </h1>
        <p
          style={{
            textAlign: "left",
            marginBlock: "10px 30px",
            fontSize: "18px",
          }}
        >
          Jeder der cool ist darf was reinschreiben 🥶
        </p>
      </div>
      <EntriesForm setAllEntries={setAllEntries} />
      <EntriesOutput allEntries={allEntries} setAllEntries={setAllEntries} />
    </>
  );
};

export default Home;
