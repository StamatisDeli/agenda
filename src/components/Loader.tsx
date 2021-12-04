import React from "react";
import Load from "react-loader-spinner";

export default function Loader(): JSX.Element {
  return (
    <div className="mx-auto, flex h-full items-center justify-center">
      <Load type="Oval" color="#BFDBFE" height={50} width={50} />
    </div>
  );
}
