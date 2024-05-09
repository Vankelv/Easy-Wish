import React from "react";
import "./BackgroundLoop.css"; 

const images = [
  "/imgs/Slider2.jpeg",
  "/imgs/Slider3.jpeg",
  "/imgs/Slider4.jpeg",
  "/imgs/Slider.jpeg",
  "/imgs/Slider4.jpeg",
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
