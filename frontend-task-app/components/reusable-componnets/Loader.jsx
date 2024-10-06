import React from "react";
import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <>
      <Loader2 size={20} className="animate-spin" /> &nbsp;Loading...
    </>
  );
};

export default Loader;
