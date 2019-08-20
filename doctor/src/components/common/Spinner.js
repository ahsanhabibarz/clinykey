import React from "react";
//import "./Style.css";

export default function Spinner() {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
      }}
    >
      <svg
        className="lds-typing"
        width="100px"
        height="100px"
        xmlns="http://www.w3.org/2000/svg"
        xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        style={{ background: "none" }}
      >
        <circle cx="24" cy="48.4263" r="6.5" fill="#34A853">
          <animate
            attributeName="cy"
            calcMode="spline"
            keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
            repeatCount="indefinite"
            values="62.5;37.5;62.5;62.5"
            keyTimes="0;0.25;0.5;1"
            dur="1s"
            begin="-0.5s"
          />
        </circle>{" "}
        <circle cx="42" cy="62.5" r="6.5" fill="#34A853">
          <animate
            attributeName="cy"
            calcMode="spline"
            keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
            repeatCount="indefinite"
            values="62.5;37.5;62.5;62.5"
            keyTimes="0;0.25;0.5;1"
            dur="1s"
            begin="-0.375s"
          />
        </circle>{" "}
        <circle cx="59" cy="62.5" r="6.5" fill="#34A853">
          <animate
            attributeName="cy"
            calcMode="spline"
            keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
            repeatCount="indefinite"
            values="62.5;37.5;62.5;62.5"
            keyTimes="0;0.25;0.5;1"
            dur="1s"
            begin="-0.25s"
          />
        </circle>{" "}
        <circle cx="76" cy="62.5" r="6.5" fill="#34A853">
          <animate
            attributeName="cy"
            calcMode="spline"
            keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
            repeatCount="indefinite"
            values="62.5;37.5;62.5;62.5"
            keyTimes="0;0.25;0.5;1"
            dur="1s"
            begin="-0.125s"
          />
        </circle>
      </svg>
    </div>
  );
}
