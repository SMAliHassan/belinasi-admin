import React, { useEffect } from "react";

import "./index.css";

const Preloader = ({ status }) => {
  useEffect(() => {
    if (status === "loading") {
      document.querySelector("html").style.overflowY = "hidden";
    } else {
      document.querySelector("html").style.overflowY = "auto";
    }

    return () => {
      document.querySelector("html").style.overflowY = "auto";
    };
  }, [status]);

  return (
    <div
      id="preloader"
      className={status}
      style={{ pointerEvents: status === "loading" ? "all" : "none" }}
    >
      <div id="ctn-preloader" class="ctn-preloader">
        <div class="animation-preloader">
          <div class="spinner"></div>
          <div class="txt-loading">
            <span data-text-preloader="L" class="letters-loading">
              L
            </span>

            <span data-text-preloader="O" class="letters-loading">
              O
            </span>

            <span data-text-preloader="A" class="letters-loading">
              A
            </span>

            <span data-text-preloader="D" class="letters-loading">
              D
            </span>

            <span data-text-preloader="I" class="letters-loading">
              I
            </span>

            <span data-text-preloader="N" class="letters-loading">
              N
            </span>

            <span data-text-preloader="G" class="letters-loading">
              G
            </span>
          </div>
        </div>

        <div class="loader-section section-left"></div>
        <div class="loader-section section-right"></div>
      </div>
    </div>
  );
};

export default Preloader;
