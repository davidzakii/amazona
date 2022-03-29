import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
      <img
        className="mb-3  d-block w-100"
        src="/images/to.png"
        alt="Third slide"
      />
      <Carousel className="w-100" activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/1.png"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/2.gif"
            alt="Second slide"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/3.png"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/4.gif"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/5.gif"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/6.png"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default ControlledCarousel;
