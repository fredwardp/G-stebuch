const SendPatch = ({
  setChangeNachricht,
  changeNachricht,
  setAllEntries,
  entry,
  hover,
}) => {
  const updNachricht = (event) => {
    event.preventDefault();

    if (changeNachricht.length > 0) {
      fetch(`http://localhost:619/api/v1/entries/${entry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nachricht: changeNachricht }),
      })
        .then((res) => res.json())
        .then((updEntry) => setAllEntries(updEntry))
        .catch((err) =>
          console.log({ message: "Could not update entry", err })
        );

      setChangeNachricht("");
    }
  };
  return (
    <button
      onClick={updNachricht}
      className={`send-button  ${hover ? "none" : "block"}`}
    >
      Send
    </button>
  );
};

export default SendPatch;
