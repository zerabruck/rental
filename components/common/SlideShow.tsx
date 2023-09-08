// components/Slideshow.tsx
import React from 'react';
import Slider, { Settings } from 'react-slick';
import Image from 'next/image';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
interface SlideshowProps {
  images: string[];
}

const SlideShow: React.FC<SlideshowProps> = ({ images }) => {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };

      const responsiveSettings = [
        {
          breakpoint: 640, // `sm` breakpoint in Tailwind CSS
          settings: {
            slidesToShow: 2, // Change `slidesToShow` to 2 for `sm` screens
          },
        },
        
      ];

  return (
    <div className=" ">
      <Slider {...settings} responsive={responsiveSettings}>
        {images.map((image, index) => (
          <div key={index} className="relative rounded-lg w-[12rem] h-[8rem] overflow-hidden">
          <Image className='object-cover px-1 rounded-[2rem] hover:scale-125 transition duration-500 ' src={image} alt="house detail" fill />
          </div>
        ))}
      </Slider>
      </div>
  );
};

export default SlideShow;
