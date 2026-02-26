// "use client";

// import { useEffect, useState } from "react";
// import { X, ChevronLeft, ChevronRight } from "lucide-react";
// import styles from "./PopUp.module.css";

// const images = [
//   "/home/hero-image-1.jpg",
//   "/home/hero-image-2.jpg",
//   "/home/hero.jpg",
//   "/home/video-1.jpg",
// ];

// export default function ImagePopup() {
//   const [open, setOpen] = useState(false);

//   const [index, setIndex] = useState(0);
//   const [currentSrc, setCurrentSrc] = useState(images[0]);

//   const [nextSrc, setNextSrc] = useState<string | null>(null);
//   const [fadeIn, setFadeIn] = useState(false);

//   /* 🔐 one session only with 3s delay */
//   useEffect(() => {
//     if (!sessionStorage.getItem("popup_seen")) {
//       const timer = setTimeout(() => {
//         setOpen(true);
//         sessionStorage.setItem("popup_seen", "true");
//       }, 3000);

//       return () => clearTimeout(timer);
//     }
//   }, []);

//   /* 🚀 preload images */
//   useEffect(() => {
//     images.forEach((src) => {
//       const img = new Image();
//       img.src = src;
//     });
//   }, []);

//   if (!open) return null;

//   const changeSlide = (dir: "prev" | "next") => {
//     if (nextSrc) return;

//     const newIndex =
//       dir === "next"
//         ? (index + 1) % images.length
//         : (index - 1 + images.length) % images.length;

//     const targetSrc = images[newIndex];

//     // 1️⃣ mount invisible image
//     setNextSrc(targetSrc);
//     setFadeIn(false);

//     // 2️⃣ trigger fade on next frame
//     requestAnimationFrame(() => {
//       requestAnimationFrame(() => {
//         setFadeIn(true);
//       });
//     });

//     // 3️⃣ promote after transition
//     setTimeout(() => {
//       setCurrentSrc(targetSrc);
//       setIndex(newIndex);
//       setNextSrc(null);
//       setFadeIn(false);
//     }, 400); // MUST match CSS duration
//   };

//   return (
//     <div className={styles.overlay} onClick={() => setOpen(false)}>
//       <div className={styles.modal}>
//         <button
//           className={styles.close}
//           onClick={() => setOpen(false)}
//           aria-label="Close popup"
//         >
//           <X />
//         </button>

//         <div className={styles.slider}>
//           <button
//             className={`${styles.nav} ${styles.navLg}`}
//             onClick={(e) => {
//               e.stopPropagation();
//               changeSlide("prev");
//             }}
//           >
//             <ChevronLeft />
//           </button>

//           <div
//             className={styles.imageWrap}
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* current image (always visible) */}
//             <img
//               src={currentSrc}
//               className={`${styles.image} ${styles.visible}`}
//               alt=""
//             />

//             {/* next image (fades in) */}
//             {nextSrc && (
//               <img
//                 src={nextSrc}
//                 className={`${styles.image} ${
//                   fadeIn ? styles.fadeIn : styles.hidden
//                 }`}
//                 alt=""
//               />
//             )}
//           </div>

//           <button
//             className={`${styles.nav} ${styles.navLg}`}
//             onClick={(e) => {
//               e.stopPropagation();
//               changeSlide("next");
//             }}
//           >
//             <ChevronRight />
//           </button>
//         </div>

//         <div className={styles.mobileNavigation}>
//           <button
//             className={styles.nav}
//             onClick={(e) => {
//               e.stopPropagation();
//               changeSlide("prev");
//             }}
//           >
//             <ChevronLeft />
//           </button>

//           <button
//             className={styles.nav}
//             onClick={(e) => {
//               e.stopPropagation();
//               changeSlide("next");
//             }}
//           >
//             <ChevronRight />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./PopUp.module.css";

type Mode = "single" | "slider";

interface AnnouncementImage {
  data: string;
  mime: string;
}

interface AnnouncementResponse {
  mode: Mode;
  images: AnnouncementImage[];
}

export default function ImagePopup() {
  const [open, setOpen] = useState(false);

  const [mode, setMode] = useState<Mode>("single");
  const [images, setImages] = useState<string[]>([]);

  const [index, setIndex] = useState(0);
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);
  const [nextSrc, setNextSrc] = useState<string | null>(null);
  const [fadeIn, setFadeIn] = useState(false);

  /* 🔐 open once per session with delay */
  useEffect(() => {
    if (!sessionStorage.getItem("popup_seen")) {
      const timer = setTimeout(() => {
        setOpen(true);
        sessionStorage.setItem("popup_seen", "true");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  /* 🚀 fetch announcements (cached API, no DB hit per user) */
  useEffect(() => {
    fetch("/api/announcements")
      .then((res) => res.json())
      .then((data: AnnouncementResponse) => {
        if (!data?.images?.length) return;

        setMode(data.mode);

        const srcs = data.images.map(
          (img) => `data:${img.mime};base64,${img.data}`,
        );

        setImages(srcs);
        setCurrentSrc(srcs[0]);
      })
      .catch(() => {
        /* fail silently */
      });
  }, []);

  /* preload images */
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  if (!open || !currentSrc) return null;

  const changeSlide = (dir: "prev" | "next") => {
    if (mode !== "slider" || images.length < 2 || nextSrc) return;

    const newIndex =
      dir === "next"
        ? (index + 1) % images.length
        : (index - 1 + images.length) % images.length;

    const targetSrc = images[newIndex];

    setNextSrc(targetSrc);
    setFadeIn(false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => setFadeIn(true));
    });

    setTimeout(() => {
      setCurrentSrc(targetSrc);
      setIndex(newIndex);
      setNextSrc(null);
      setFadeIn(false);
    }, 400);
  };

  return (
    <div className={styles.overlay} onClick={() => setOpen(false)}>
      <div className={styles.modal}>
        <button
          className={styles.close}
          onClick={() => setOpen(false)}
          aria-label="Close popup"
        >
          <X />
        </button>

        <div className={styles.slider}>
          {mode === "slider" && (
            <button
              className={`${styles.nav} ${styles.navLg}`}
              onClick={(e) => {
                e.stopPropagation();
                changeSlide("prev");
              }}
            >
              <ChevronLeft />
            </button>
          )}

          <div
            className={styles.imageWrap}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentSrc}
              className={`${styles.image} ${styles.visible}`}
              alt=""
            />

            {nextSrc && (
              <img
                src={nextSrc}
                className={`${styles.image} ${
                  fadeIn ? styles.fadeIn : styles.hidden
                }`}
                alt=""
              />
            )}
          </div>

          {mode === "slider" && (
            <button
              className={`${styles.nav} ${styles.navLg}`}
              onClick={(e) => {
                e.stopPropagation();
                changeSlide("next");
              }}
            >
              <ChevronRight />
            </button>
          )}
        </div>

        {mode === "slider" && (
          <div className={styles.mobileNavigation}>
            <button
              className={styles.nav}
              onClick={(e) => {
                e.stopPropagation();
                changeSlide("prev");
              }}
            >
              <ChevronLeft />
            </button>

            <button
              className={styles.nav}
              onClick={(e) => {
                e.stopPropagation();
                changeSlide("next");
              }}
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
