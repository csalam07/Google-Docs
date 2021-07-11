import React from "react";
import Lottie from "react-lottie";
import animationData from "../public/signin.json";
import animationData1 from "../public/loading.json";

export default function LottieFiles() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: animationData1,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} height={400} width={400} />
      <Lottie options={defaultOptions1} height={200} width={100} />
    </div>
  );
}
