import React from "react";

const Loader = () => {
  return (
    <div className="loader">
      <img src={process.env.PUBLIC_URL + "weatherIcon.png"} />
    </div>
  );
};

export default Loader;
