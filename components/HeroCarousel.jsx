"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const heroImage = [
  { imgUrl: "/assets/images/hero-1.svg", alt: "smartphone" },
  { imgUrl: "/assets/images/hero-2.svg", alt: "bag" },
  { imgUrl: "/assets/images/hero-3.svg", alt: "lamp" },
  { imgUrl: "/assets/images/hero-4.svg", alt: "air fryer" },
  { imgUrl: "/assets/images/hero-5.svg", alt: "chair" },
];

const HeroCarousel = () => {
  return (
    <div className="hero-carousel">
      <Carousel
        infiniteLoop
        autoPlay
        showThumbs={false}
        showArrows={false}
        showStatus={false}
        interval={2000}
      >
        {heroImage.map((image) => (
          <Image
            src={image.imgUrl}
            height={484}
            width={484}
            alt={image.alt}
            key={image.alt}
            className="object-contain"
          />
        ))}
      </Carousel>

      <Image
        src="assets/icons/hand-drawn-arrow.svg"
        alt="arrow"
        width={175}
        height={175}
        className="max-xl:hidden absolute bottom-0 -left-[15%]"
      />
    </div>
  );
};

export default HeroCarousel;
