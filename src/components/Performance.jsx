import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useMediaQuery } from "react-responsive";
import { performanceImages, performanceImgPositions } from "../constants";

const Performance = () => {
  const sectionRef = useRef(null);
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  useGSAP(
    () => {
      // Paragraph fade in and move up as it scrolls into view
      gsap.to(".content p", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".content p",
          start: "top bottom",
          end: 'top center',
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // Desktop scrubbed scroll timeline for performance images
      if (!isMobile) {
        const timeline = gsap.timeline({
            defaults: { ease: 'power1.inOut', duration: 2, overwrite: 'auto'},
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "center center",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        performanceImgPositions.forEach((item) => {
          if (item.id === "p5") return;

          const vars = {};
          if (item.left !== undefined) {
            vars.left = typeof item.left === "number" ? `${item.left}%` : item.left;
          }
          if (item.right !== undefined) {
            vars.right = typeof item.right === "number" ? `${item.right}%` : item.right;
          }
          if (item.bottom !== undefined) {
            vars.bottom = typeof item.bottom === "number" ? `${item.bottom}%` : item.bottom;
          }
          if (item.transform !== undefined) {
            vars.transform = item.transform;
          }

          timeline.to(`.${item.id}`, vars, 0);
        });
      }
    },
    { scope: sectionRef, dependencies: [isMobile], revertOnUpdate: true }
  );

  return (
    <section id="performance" ref={sectionRef}>
      <h2>Next-level graphics performance. Game on.</h2>

      <div className="wrapper">
        {performanceImages.map((image) => (
          <img
            key={image.id}
            className={image.id}
            src={image.src}
            alt={image.id || `Performance Image #${index+1}`}
          />
        ))}
      </div>

      <div className="content">
        <p>
          Run graphics-intensive workflows with a responsiveness that keeps up with your imagination. The M4 family of chips features a GPU with a second-generation hardware-accelerated ray tracing engine that renders
          images faster, so{" "}
          <span className="text-white">
            gaming feels more immersive and realistic than ever.
          </span>{" "}
          And Dynamic Caching optimizes fast on-chip memory to dramatically increase average GPU utilization — driving a huge performance boost for the most demanding pro apps and games.
        </p>
      </div>
    </section>
  );
};

export default Performance;
