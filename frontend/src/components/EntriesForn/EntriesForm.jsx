import { useState } from "react";

const EntriesForm = ({ setAllEntries }) => {
  const [newEntry, setNewEntry] = useState({
    vorname: "",
    nachname: "",
    email: "",
    nachricht: "",
    img: "",
  });

  // const addEntry = (event) => {
  //   event.preventDefault();

  //   const formData = new FormData();
  //   formData.append("img", newEntry.img, newEntry.img.name);

  //   fetch("http://localhost:619/api/v1/entries/uploads", {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setNewEntry({ ...newEntry, img: data.img });
  //       return newEntry;
  //     })
  //     .then((theNewEntry) =>
  //       fetch("http://localhost:619/api/v1/entries", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(theNewEntry),
  //       })
  //     )
  //     .then((res) => res.json())
  //     .then((entries) => setAllEntries(entries))
  //     .catch((err) => console.log({ message: "Could not load entries", err }));
  //   setNewEntry({
  //     vorname: "",
  //     nachname: "",
  //     email: "",
  //     nachricht: "",
  //     img: "",
  //   });
  // };
  const addEntry = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("img", newEntry.img, newEntry.img.name);

    fetch("http://localhost:619/api/v1/entries/uploads", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        const updEntries = {
          vorname: newEntry.vorname,
          nachname: newEntry.nachname,
          email: newEntry.email,
          nachricht: newEntry.nachricht,
          img: data.img,
        };
        // console.log(data.img);
        // // Update newEntry with the image URL
        // setNewEntry("hallo");
        // console.log(newEntry);
        return updEntries;
      })
      .then((theNewEntry) => {
        return fetch("http://localhost:619/api/v1/entries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(theNewEntry),
        });
      })
      .then((res) => res.json())
      .then((entries) => setAllEntries(entries))
      .catch((err) => console.log({ message: "Could not load entries", err }))
      .finally(() => {
        // Reset the newEntry state to clear the form fields
        setNewEntry({
          vorname: "",
          nachname: "",
          email: "",
          nachricht: "",
          img: "",
        });
      });

    console.log(entries);
  };

  // console.log(newEntry);
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginInline: "1rem",
      }}
    >
      <input
        type="text"
        name="vorname"
        id=""
        placeholder="vorname"
        value={newEntry.vorname}
        onChange={(event) =>
          setNewEntry({ ...newEntry, vorname: event.target.value })
        }
      />
      <input
        type="text"
        name="nachname"
        id=""
        placeholder="nachname"
        value={newEntry.nachname}
        onChange={(event) =>
          setNewEntry({ ...newEntry, nachname: event.target.value })
        }
      />
      <input
        type="email"
        name="email"
        id=""
        placeholder="e-mail"
        value={newEntry.email}
        onChange={(event) =>
          setNewEntry({ ...newEntry, email: event.target.value })
        }
      />

      <textarea
        name="nachricht"
        id=""
        cols="30"
        rows="7"
        value={newEntry.nachricht}
        onChange={(event) =>
          setNewEntry({ ...newEntry, nachricht: event.target.value })
        }
      ></textarea>
      <input
        type="file"
        name="upload"
        id=""
        placeholder="upload profile img"
        onChange={(event) =>
          setNewEntry({ ...newEntry, img: event.target.files[0] })
        }
      />
      <button
        className="add-button"
        style={{ paddingBlock: "4px", fontSize: "14px" }}
        onClick={addEntry}
      >
        Add entry
      </button>
    </form>
  );
};

export default EntriesForm;
