(function () {
  let scrollElement = document.querySelector("#Main");

  window.addEventListener("wheel", (event) => {
    if (!event.shiftKey && event.deltaY != 0) {
      if (Math.abs(event.deltaY) >= 100) {
        /* mousewheel */
        scrollElement.scrollBy({
          left: 4 * event.deltaY,
          behavior: "smooth",
        });
      } else {
        /* trackpad */
        scrollElement.scrollBy({
          left: event.deltaY,
          behavior: "auto",
        });
      }
    }
  });
})();
