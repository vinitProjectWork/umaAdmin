import { useSelector } from "react-redux";
import Slider from "react-slick";
import { baseURL } from "../../utils/http";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const SlickSlider = () => {
  const { sliderImage } = useSelector(({ slider }) => slider);

  return (
    <Slider {...settings} autoplaySpeed={2000}>
      {sliderImage.map((image, index) => {
        return (
          <div key={index}>
            <img
              className="h-80 w-full object-contain"
              src={`${baseURL + image.sliderImage.url}`}
            />
          </div>
        );
      })}
    </Slider>
  );
};

export default SlickSlider;
