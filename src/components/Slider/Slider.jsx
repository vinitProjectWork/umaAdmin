import Slider from "react-slick"

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
}

const SlickSlider = () => {
  return (
    <Slider {...settings}>
      <div>
        <img src="http://placekitten.com/g/1920/400" />
      </div>
      <div>
        <img src="http://placekitten.com/g/1920/400" />
      </div>
      <div>
        <img src="http://placekitten.com/g/1920/400" />
      </div>
      <div>
        <img src="http://placekitten.com/g/1920/400" />
      </div>
    </Slider>
  )
}

export default SlickSlider
