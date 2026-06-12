"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./SectionTwo.module.css";
import { weddingFestivitiesSlides } from "./data3";

export type Slide = {
  tab: string;
  title: string;
  description: string;
  image: string;
};

export default function SectionTwo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [itemsVisible, setItemsVisible] = useState(5);

  const slides = weddingFestivitiesSlides;

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setItemsVisible(2);
      } else if (width <= 1024) {
        setItemsVisible(3);
      } else {
        setItemsVisible(5);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Ensure startIndex is valid if itemsVisible changes
  useEffect(() => {
    if (startIndex > slides.length - itemsVisible) {
      setStartIndex(Math.max(0, slides.length - itemsVisible));
    }
  }, [itemsVisible, slides.length, startIndex]);

  const handleNext = () => {
    if (startIndex < slides.length - itemsVisible) {
      setStartIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  };

  const activeSlide = useMemo(() => slides[activeIndex], [activeIndex, slides]);

  return (
    <section className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <div className={styles.line} />
          <h2 className={styles.heading}>Unforgettable Weddings at Pal</h2>
          <div className={styles.line} />
        </div>
        <p className={styles.description}>
          Every wedding tells a story of love, tradition and new beginnings. At
          Pal, we bring these stories to life through elegant venues, thoughtful
          planning and warm hospitality, creating celebrations that remain
          cherished for years to come.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className={styles.tabNavWrapper}>
        <div className={styles.tabNav}>
          <button
            className={styles.navBtn}
            onClick={handlePrev}
            disabled={startIndex === 0}
            aria-label="Previous tabs"
          >
            <ChevronLeft size={20} />
          </button>

          <div className={styles.tabsContainer}>
            <div
              className={styles.tabList}
              style={{
                transform: `translateX(-${startIndex * (100 / itemsVisible)}%)`,
              }}
            >
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`${styles.tabItem} ${
                    activeIndex === index ? styles.activeTab : ""
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  {activeIndex === index && (
                    <motion.div
                      layoutId="activeTabBg"
                      className={styles.activeBg}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  {slide.tab}
                </div>
              ))}
            </div>
          </div>

          <button
            className={styles.navBtn}
            onClick={handleNext}
            disabled={startIndex >= slides.length - itemsVisible}
            aria-label="Next tabs"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className={styles.contentArea}>
        <div className={styles.imageWrapper}>
          <AnimatePresence>
            <motion.img
              key={activeIndex}
              src={activeSlide.image}
              alt={activeSlide.title}
              className={styles.slideImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </div>

        <div className={styles.textContent}>
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.contentTitleRow}>
              <div className={styles.smallLine} />
              <h3 className={styles.contentTitle}>{activeSlide.title}</h3>
            </div>
            <p className={styles.contentDesc}>{activeSlide.description}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
