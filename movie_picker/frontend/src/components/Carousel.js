import React from "react";
import {Carousel} from "react-bootstrap";
import shining from "../../static/images/carousel-kubrick-stare/the-shining.png";
import orange from "../../static/images/carousel-kubrick-stare/clockwork-orange.jpg";
import odyssey from "../../static/images/carousel-kubrick-stare/space-odyssey.png";


const Slider = () => {
  return (
      <Carousel>
          <Carousel.Item style = {{'height': '550px'}}>
              <img src={shining} className = "d-block w-100" alt="The Shining"/>
              <Carousel.Caption>
                <h1>
                    The Shining
                </h1>
                  <p>Movie that we recommend to everyone</p>
              </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item style = {{'height': '550px'}}>
              <img src={orange} className = "d-block w-100" alt="A Clockwork Orange"/>
              <Carousel.Caption>
                <h1>
                    A Clockwork Orange
                </h1>
                  <p>Movie that we recommend to everyone</p>
              </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item style = {{'height': '550px'}}>
              <img src={odyssey} className = "d-block w-100" alt="2001: A Space Odyssey"/>
              <Carousel.Caption>
                <h1>
                    2001: A Space Odyssey
                </h1>
                  <p>Movie that we recommend to everyone</p>
              </Carousel.Caption>
          </Carousel.Item>
      </Carousel>
  )
}

export default Slider;