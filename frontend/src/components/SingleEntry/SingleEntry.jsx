import { useState } from "react";
import Cross from "../Cross/Cross";
import SendPatch from "../SendPatch/SendPatch";

const SingleEntry = ({ entry, setAllEntries }) => {
  const [hover, setHover] = useState(true);
  const [changeNachricht, setChangeNachricht] = useState();
  return (
    <div
      className="entry-div"
      key={entry.id}
      onMouseEnter={() => setHover((hover) => !hover)}
      onMouseLeave={() => setHover((hover) => !hover)}
    >
      <Cross hover={hover} entry={entry} setAllEntries={setAllEntries} />
      <div className="profile-wrapper">
        {" "}
        <img
          className="profile-img"
          src={"http://localhost:619/" + entry.img}
          alt=""
        />
        <h3
          style={{ marginBlock: " 0.4em 0.4em" }}
        >{`${entry.vorname} ${entry.nachname}`}</h3>
      </div>
      <div style={{ position: "relative" }}>
        <p
          className={`${!hover ? "zero" : "block"}`}
          style={{ marginBlock: "0" }}
        >
          {entry.nachricht}
        </p>

        <textarea
          type="text"
          className={`hover-input ${hover ? "none" : "block"}`}
          placeholder={entry.nachricht}
          value={changeNachricht}
          onChange={(event) => setChangeNachricht(event.target.value)}
        />
      </div>
      <p style={{ fontSize: "12px" }}>{entry.time}</p>
      <SendPatch
        setChangeNachricht={setChangeNachricht}
        changeNachricht={changeNachricht}
        setAllEntries={setAllEntries}
        hover={hover}
        entry={entry}
      />
    </div>
  );
};

export default SingleEntry;
