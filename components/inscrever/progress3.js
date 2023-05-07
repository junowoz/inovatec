import React from "react";
import { ProgressBar } from "react-bootstrap";

export default function Progress3() {
  return (
    <div>
      <ProgressBar now={75} className="mb-4" />
    </div>
  );
}
