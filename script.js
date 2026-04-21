const path = document.getElementById('curve-path');
const body = document.body;

function handleScrollAndCurve() {
    const scrollY = window.scrollY;
    
    // 1. TRIGGER THE TEXT/COLOR ANIMATION
    // If scrolled past 50px, trigger the smooth CSS transitions
    if (scrollY > 50) {
        body.classList.add('scrolled');
    } else {
        body.classList.remove('scrolled');
    }

    // 2. SCRUB THE SVG CURVE ANIMATION
    // The curve completes its animation over the first 400px of scrolling
    const maxScroll = 400; 
    let progress = Math.min(scrollY / maxScroll, 1);
    
    // Add a slight easing to the math so it doesn't feel robotic
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    
    const width = window.innerWidth;
    const startHeight = window.innerHeight; 
    const endHeight = 90; // Final header height
    
    // Calculate the current height of the background
    const currentHeight = startHeight + (endHeight - startHeight) * easeProgress;
    
    // Calculate the curve (Q) control point
    const startCurveY = window.innerHeight + 250; // Deep curve at the start
    const endCurveY = 90; // Perfectly flat at the end
    const currentCurveY = startCurveY + (endCurveY - startCurveY) * easeProgress;
    
    // Construct the rigorous SVG math path
    const d = `M 0 0 L ${width} 0 L ${width} ${currentHeight} Q ${width/2} ${currentCurveY} 0 ${currentHeight} Z`;
    
    // Inject the math into the DOM
    path.setAttribute('d', d);
}

// Listen for scrolling and resizing
window.addEventListener('scroll', handleScrollAndCurve);
window.addEventListener('resize', handleScrollAndCurve);

// Run it immediately on page load to set the initial full-screen shape
handleScrollAndCurve();