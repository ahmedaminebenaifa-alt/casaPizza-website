const path = document.getElementById('curve-path');
const body = document.body;

function handleScrollAndCurve() {
    const scrollY = window.scrollY;
    

    if (scrollY > 0) {
        body.classList.add('scrolled');
    }
     else {
        body.classList.remove('scrolled');
    }


    
    const maxScroll = 400; 
    let progress = Math.min(scrollY / maxScroll, 1);
    

    const easeProgress = 1 - Math.pow(1 - progress, 3);
    
    const width = window.innerWidth;
    const startHeight = window.innerHeight; 
    const endHeight = 90; 
    

    const currentHeight = startHeight + (endHeight - startHeight) * easeProgress;
   
    const startCurveY = window.innerHeight + 250; 
    const endCurveY = 90; 
    const currentCurveY = startCurveY + (endCurveY - startCurveY) * easeProgress;
    
    
    const d = `M 0 0 L ${width} 0 L ${width} ${currentHeight} Q ${width/2} ${currentCurveY} 0 ${currentHeight} Z`;
    

    path.setAttribute('d', d);
}

window.addEventListener('scroll', handleScrollAndCurve);
window.addEventListener('resize', handleScrollAndCurve);

handleScrollAndCurve();
const triggerBtn = document.getElementById('trigger-btn');
const socialDropdown = document.getElementById('social-dropdown');


triggerBtn.addEventListener('click', () => {
    socialDropdown.classList.toggle('open');
});
