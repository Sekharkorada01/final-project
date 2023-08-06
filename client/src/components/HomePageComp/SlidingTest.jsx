import { useState } from "react";
import React from "react";
export default function Slider({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  function showSlide(index) {
    setCurrentSlide(index);
  }

  function showNextSlide() {
    setCurrentSlide((currentSlide + 1) % slides.length);
  }

  function showPrevSlide() {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  }

  return (
    <div className="slider">
      {slides?.map((slide, index) => (
        <div
          key={index}
          className={`slider-slide ${index === currentSlide ? "active" : ""}`}
        >
          <img src={slide.src} alt={slide.alt} />
        </div>
      ))}
      <button className="slider-prev" onClick={showPrevSlide}>
        Prev
      </button>
      <button className="slider-next" onClick={showNextSlide}>
        Next
      </button>
      <div className="slider-dots">
        {slides?.map((slide, index) => (
          <button
            key={index}
            className={`slider-dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => showSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
}