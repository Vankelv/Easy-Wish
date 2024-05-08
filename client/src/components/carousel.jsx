import React from "react";
import "./BackgroundLoop.css"; 

const images = [
  "/imgs/slider2.png",
  "/imgs/slider3.png",
  "/imgs/slider4.png",
  "/imgs/slider5.png",
  "/imgs/slider3.png",
  "/imgs/slider4.png",
  "/imgs/slider3.png",
  // Add more image paths as needed
];

class BackgroundLoop extends React.Component {
  render() {
    return (
      <div className="background-loop p-10 ">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="background-image"
          />
        ))}
      </div>
    );
  }
}

export default BackgroundLoop;
