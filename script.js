const path = document.getElementById('curve-path');
const body = document.body;
const triggerBtn = document.getElementById('trigger-btn');
const socialDropdown = document.getElementById('social-dropdown');
let lastScrollY = window.scrollY;

function handleScrollAndCurve() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 50) {
        body.classList.add('scrolled');
    } else {
        body.classList.remove('scrolled');
    }

    if (currentScrollY > 400) {
        if (currentScrollY > lastScrollY) {
            body.classList.add('hide-header');
            if(socialDropdown) socialDropdown.classList.remove('open'); 
        } else {
            body.classList.remove('hide-header');
        }
    } else {
        body.classList.remove('hide-header');
    }
    
    lastScrollY = currentScrollY;

    const maxScroll = 400; 
    let progress = Math.min(currentScrollY / maxScroll, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    
    const width = window.innerWidth;
    const startHeight = window.innerHeight; 
    const endHeight = 90; 
    
    const currentHeight = startHeight + (endHeight - startHeight) * easeProgress;
    
    const startCurveY = window.innerHeight + 250; 
    const endCurveY = 90; 
    const currentCurveY = startCurveY + (endCurveY - startCurveY) * easeProgress;
    
    const d = `M 0 0 L ${width} 0 L ${width} ${currentHeight} Q ${width/2} ${currentCurveY} 0 ${currentHeight} Z`;
    
    if (path) path.setAttribute('d', d);
}

window.addEventListener('scroll', handleScrollAndCurve);
window.addEventListener('resize', handleScrollAndCurve);

if (triggerBtn) {
    triggerBtn.addEventListener('click', () => {
        socialDropdown.classList.toggle('open');
    });
}

handleScrollAndCurve();

document.addEventListener("DOMContentLoaded", function() {
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        let heroTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#hero",
                start: "top 40%", 
                onEnter: () => heroTl.restart(),
                onEnterBack: () => heroTl.restart()
            }
        });

        heroTl.fromTo(".hero-title", 
            { opacity: 0, y: 180 }, 
            { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" }
        );

        heroTl.fromTo(".hero-description", 
            { opacity: 0, y: 120 }, 
            { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
            "-=1" 
        );

        let cardEntranceTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#pizza-margherita-card",
                start: "top 80%",
                end: "bottom 20%",
                
               
                toggleActions: "restart reset restart reset"
            }
        });

        cardEntranceTl.from("#pizza-margherita-card .plate-img", {
            scale: 0,
            rotation: -90,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.5)"
        });

        cardEntranceTl.from("#pizza-margherita-card .dish-wrapper", {
            y: -150,
            opacity: 0,
            duration: 0.8,
            ease: "bounce.out"
        }, "-=0.4");

        cardEntranceTl.from("#pizza-margherita-card .nos-pizzas-btn", {
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out"
        }, "-=0.5");
        
    } else {
        console.error("GSAP failed to load. Check your HTML script tags.");
    }

    const pizzaCard = document.getElementById('pizza-margherita-card');
    
    if (pizzaCard) {
        pizzaCard.addEventListener('click', function() {
            this.classList.toggle('is-flipped');
        });
    }
});
