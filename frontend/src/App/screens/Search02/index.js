import React, { useState } from "react";
import cn from "classnames";
import styles from "./Search02.module.sass";
import Image from "../../components/Image";
import Form from "../../components/Form";

const items = [
  {
    title: "Artwork",
    content: "138 items",
    image: "/images/content/activity-pic-1.jpg",
  },
  {
    title: "Photography",
    content: "138 items",
    image: "/images/content/activity-pic-5.jpg",
  },
  {
    title: "Game",
    content: "138 items",
    image: "/images/content/activity-pic-4.jpg",
  },
  {
    title: "Music",
    content: "138 items",
    image: "/images/content/activity-pic-2.jpg",
  },
];

const Search = () => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    alert();
  };

  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.preview}>
          <Image
            srcSet="/images/content/figures@2x.png 2x"
            srcSetDark="/images/content/figures-dark@2x.png 2x"
            src="/images/content/figures.png"
            srcDark="/images/content/figures-dark.png"
            alt="Figures"
          />
        </div>
        <div className={styles.wrap}>
          <h2 className={cn("h2", styles.title)}>
            Sorry, we couldn’t find any results for this search.
          </h2>
          <div className={styles.info}>Maybe give one of these a try?</div>
          <Form
            className={styles.form}
            value={search}
            setValue={setSearch}
            onSubmit={() => handleSubmit()}
            placeholder="Enter your search..."
            type="text"
            name="search"
          />
        </div>
        <div className={styles.subtitle}>Explore more</div>
        <div className={styles.list}>
          {items.map((x, index) => (
            <div className={styles.item} key={index}>
              <div className={styles.picture}>
                <img src={x.image} alt="Category" />
              </div>
              <div className={styles.details}>
                <div className={styles.category}>{x.title}</div>
                <div className={styles.text}>{x.content}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
