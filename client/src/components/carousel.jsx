import React from "react";
import "./BackgroundLoop.css";

const images = [
  "/imgs/slids/Slider111.jpeg",
  "/imgs/slids/Slider1.jpg",
  "/imgs/slids/Slider2.jpg",
  "/imgs/slids/Slider333.jpeg",
  "/imgs/slids/Slider24.jpg",
  "/imgs/slids/Slider3.jpeg",
  "/imgs/slids/Slider444.jpeg",
  "/imgs/slids/Slider222.jpeg",
  "/imgs/slids/Slider5.jpg",
  "/imgs/slids/Slider28.jpg",
  "/imgs/slids/Slider6.jpg",
  "/imgs/slids/Slider7.jpg",
  "/imgs/slids/Slider8.jpg",
  "/imgs/slids/Slider9.jpg",
  "/imgs/slids/Slider10.jpg",
  "/imgs/slids/Slider11.jpg",
  "/imgs/slids/Slider12.jpg",
  "/imgs/slids/Slider27.jpg",
  "/imgs/slids/Slider13.jpg",
  "/imgs/slids/Slider14.jpg",
  "/imgs/slids/Slider15.jpg",
  "/imgs/slids/Slider16.jpg",
  "/imgs/slids/Slider25.jpg",
  "/imgs/slids/Slider18.jpg",
  "/imgs/slids/Slider17.jpg",
  "/imgs/slids/Slider20.jpg",
  "/imgs/slids/Slider19.jpg",
  "/imgs/slids/Slider21.jpeg",
  "/imgs/slids/Slider23.jpeg",
  "/imgs/slids/Slider26.jpg",
  // Add more image paths as needed
];

class BackgroundLoop extends React.Component {
  render() {
    return (
      <div className="w-full inline-flex flex-nowrap overflow-hidden">
        <ul className="flex items-center justify-center mb-5 md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll ">
          {images.map((image, index) => (
            <li key={index}>
              <img src={image} className="sliderImg" alt={`Slider ${index + 1}`} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default BackgroundLoop;