(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());


(function() {

  var scrollElement;
  var scrollArrow;
  var scrollUpdateTimeout;
  var animationFrameId;

  var init = function() {
    scrollElement = document.getElementById("Main");
    scrollArrow = document.getElementById("ScrollArrow");
    updateArrow();
    scrollElement.addEventListener("scroll", scrollHandler);
    scrollArrow.addEventListener("click", clickHandler);
  };

  var updateArrow = function() {
    if (scrollElement.offsetWidth >= scrollElement.scrollWidth || scrollElement.scrollLeft + scrollElement.offsetWidth >= scrollElement.scrollWidth - 10) {
      scrollArrow.style.opacity = 0;
    } else {
      console.log(scrollElement.firstElementChild.firstElementChild.nextElementSibling);
      scrollArrow.style.top = (scrollElement.querySelector("li img, li div.img").offsetHeight + document.body.firstElementChild.offsetHeight) + "px";
      scrollArrow.style.opacity = 1;
    }
  };

  var scrollHandler = function() {
    if (scrollUpdateTimeout) {
      clearTimeout(scrollUpdateTimeout);
      scrollUpdateTimeout = null;
    }
    scrollArrow.style.opacity = 0;

    scrollUpdateTimeout = setTimeout(function () { scrollUpdateTimeout = null; updateArrow() }, 200);
  };

  var clickHandler = function() {
    var children = scrollElement.firstElementChild.children;

    for (var i = 0; i < children.length; i++) {
      var child = children[i];

      console.log(child, child.offsetLeft, child.offsetWidth, ",", scrollElement.scrollLeft, scrollElement.offsetWidth);

      if (child.offsetLeft + child.offsetWidth > scrollElement.scrollLeft + scrollElement.offsetWidth + 1) {
        scrollTo(child);
        //child.scrollIntoView({block: "end", behavior: "smooth"});
        break;
      }
    }
  };

  var scrollTo = function(element) {
    var overflowElement = element.parentNode.parentNode;
    var sourceScrollLeft = overflowElement.scrollLeft;
    var targetScrollLeft = element.offsetLeft +  element.offsetWidth - overflowElement.offsetWidth - 1;
    var deltaY = targetScrollLeft - sourceScrollLeft;

    if (targetScrollLeft < 0) {
      return;
    }

    var startTime = now();

    if (animationFrameId) {
      window.cancelAnimationFrame(animationFrameId);
    }

    animationFrameId = window.requestAnimationFrame(step);

    function step() {
      var time = now();
      var progress = Math.min((time - startTime) / 1000, 1);
      var easedProgress = 0.5 * (1 - Math.cos(Math.PI * progress));

      overflowElement.scrollLeft = sourceScrollLeft + deltaY * easedProgress;

      if (overflowElement.scrollLeft < targetScrollLeft) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    }
  };

  var now = function() {
    if (window.performance !== undefined && window.performance.now !== undefined) {
      return window.performance.now();
    }

    return Date.now();
  }

  window.addEventListener("DOMContentLoaded", init);

  window.addEventListener("DOMContentLoaded",function() {
    setTimeout(function(){
      //window.document.body.style.overflow="auto"; 	
      //window.document.body.style.height=(window.document.body.offsetHeight + 20) + "px";
      window.scrollTo(0, 1);
    }, 500);
  });
})();
