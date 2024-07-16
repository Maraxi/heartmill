(function () {
  let scrollElement = document.querySelector("main");

  window.addEventListener("wheel", (event) => {
    /* do not scroll horizontal when focusing dustJacket with scrollbar */
    let isJacket = (ele) => ele.classList.contains("dustJacketText");
    if (isJacket(event.target) || isJacket(event.target.parentElement)) {
      let jacket = isJacket(event.target) ? event.target : event.target.parentElement;
      if (event.deltaY > 0 && jacket.clientHeight + jacket.scrollTop < jacket.scrollHeight) {
        return;
      }
    }

    /* add vertical mousewheel to horizontal scroll */
    if (!event.shiftKey && event.deltaY != 0 && !isJacket(event.target)) {
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
