import React from "react";

const AddLane = ({ createLane }) => (
  <button
    className="add-lane"
    onClick={createLane.bind(null, {
      name: "New lane"
    })}
  >
    +
  </button>
);

export default AddLane;
