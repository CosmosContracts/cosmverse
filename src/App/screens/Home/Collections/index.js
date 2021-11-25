import React from "react";
import cn from "classnames";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import styles from "./Collections.module.sass";
import Icon from "../../../components/Icon";

const items = [
  {
    title: "Awesome collection",
    author: "Kennith Olson",
    counter: "28",
    avatar: "/images/content/avatar-1.jpg",
    gallery: [
      "/images/content/photo-1.1.jpg",
      "/images/content/photo-1.2.jpg",
      "/images/content/photo-1.3.jpg",
      "/images/content/photo-1.4.jpg",
    ],
  },
  {
    title: "Awesome collection",
    author: "Willie Barton",
    counter: "28",
    avatar: "/images/content/avatar-3.jpg",
    gallery: [
      "/images/content/photo-2.1.jpg",
      "/images/content/photo-2.2.jpg",
      "/images/content/photo-2.3.jpg",
      "/images/content/photo-2.4.jpg",
    ],
  },
  {
    title: "Awesome collection",
    author: "Halle Jakubowski",
    counter: "28",
    avatar: "/images/content/avatar-4.jpg",
    gallery: [
      "/images/content/photo-3.1.jpg",
      "/images/content/photo-3.2.jpg",
      "/images/content/photo-3.3.jpg",
      "/images/content/photo-3.4.jpg",
    ],
  },
];

const SlickArrow = ({ currentSlide, slideCount, children, ...props }) => (
  <button {...props}>{children}</button>
);

const Collections = () => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: (
      <SlickArrow>
        <Icon name="arrow-next" size="14" />
      </SlickArrow>
    ),
    prevArrow: (
      <SlickArrow>
        <Icon name="arrow-prev" size="14" />
      </SlickArrow>
    ),
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className={cn("section-bg", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.wrapper}>
          <h3 className={cn("h3", styles.title)}>Hot collections</h3>
          <div className={styles.inner}>
            <Slider className="collection-slider" {...settings}>
              {items.map((x, index) => (
                <Link className={styles.item} to="/profile" key={index}>
                  <div className={styles.gallery}>
                    {x.gallery.map((x, index) => (
                      <div className={styles.preview} key={index}>
                        <img src={x} alt="Collection" />
                      </div>
                    ))}
                  </div>
                  <div className={styles.subtitle}>{x.title}</div>
                  <div className={styles.line}>
                    <div className={styles.user}>
                      <div className={styles.avatar}>
                        <img src={x.avatar} alt="Avatar" />
                      </div>
                      <div className={styles.author}>
                        By <span>{x.author}</span>
                      </div>
                    </div>
                    <div className={cn("status-stroke-black", styles.counter)}>
                      <span>{x.counter}</span> items
                    </div>
                  </div>
                </Link>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
