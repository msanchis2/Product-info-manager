import {useState} from 'react'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap'

const ControlledImageCarousel = ({items, setModalUrl}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animating, setAnimating] = useState(false)

  const next = () => {
    if (animating) return
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1
    setActiveIndex(nextIndex)
  }

  const previous = () => {
    if (animating) return
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1
    setActiveIndex(nextIndex)
  }

  const goToIndex = (newIndex) => {
    if (animating) return
    setActiveIndex(newIndex)
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        style={{background: "white", maxWidth: "600px"}}
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img className="btn" style={{maxWidth: "100%", maxHeight: "450px"}} src={item.src} alt={item.altText} onClick={() => setModalUrl(item.src)} />
      </CarouselItem>
    )
  })

  return (<>
    <style>
      {
        `.carousel-indicators li {
          background-color: #3ab49b !important;
          width: 40px !important;
        }
        .carousel-control-next-icon, .carousel-control-prev-icon {
          background-color: #3ab49b !important;
          width: 25px !important;
        }`
      }
    </style>
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  </>)
}

export default ControlledImageCarousel
