import React, { useState } from "react";

const ClientDets = ({ clientDetails }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`mt-3 glass-panel rounded-2xl p-6 transition-all duration-300 ease-in-out cursor-pointer ${
        isHovered ? "scale-[1.03] shadow-lg shadow-brand/10" : "scale-100"
      }`}
    >
        <h3>{clientDetails.className}</h3>
    </div>
  );
};

export default ClientDets;
