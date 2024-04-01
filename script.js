function Loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

function AnimationLoad(){
    var tl = gsap.timeline();
    tl.from(".line h1, h2", {
    y: 150,
    stagger: 0.25,
    duration: 0.6,
    delay: 0.5,
    });
    tl.from("#line-part-1", {
    opacity: 0,
    onStart: function () {
        var h5timer = document.querySelector("#line-part-1 h5");
        var grow = 0;
        setInterval(function () {
        if (grow < 100) {
            h5timer.innerHTML = grow++;
        } else {
            h5timer.innerHTML = grow;
        }
        }, 27);
    },
    });
    tl.to(".line h2", {
    animationName: "animation",
    opacity: 1,
    });
    tl.to("#loader", {
        opacity: 0,
        duration: 0.2,
        delay: 0
    })
    tl.from("#page-1", {
        delay: 0.2,
        y: 1600,
        opacity: 0,
        ease:Power4, 
        duration: 0.5
    })
    tl.to("#loader", {
        display: "none"
    })
    tl.from("#nav", {
        y: -120
    })
    tl.from(" #Main1 h1, #Main2 h1, #Main3 h1, #Main4 h5", {
        stagger: 0.2,
        y: 200
    })
    tl.from("#Main1, #page-2", {
        opacity: 0,
    },"-=1.5")
}

function MouseAnimation() {
    Shery.makeMagnet("#nav-part2 h4");

    document.addEventListener("mousemove", function(event) {
        gsap.to("#cursor", {
            top: event.clientY,
            left: event.clientX,
            duration: 0.2,
            ease: "power2.out"
        });
    });
}



AnimationLoad();
MouseAnimation();
Loco();