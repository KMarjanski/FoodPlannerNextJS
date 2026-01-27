import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full">
      <span className="loading loading-infinity loading-2xl text-primary" style={{ width: 120, height: 120 }} />
    </div>
  );
};

export default Spinner;
