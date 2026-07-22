

document.addEventListener("DOMContentLoaded", () => {

    AOS.init({

        duration: 1200,

        easing: "ease-out-cubic",

        once: true,

        offset: 100

    });

});




const revealCards = document.querySelectorAll(".reveal-card");

const observer = new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("active");

        }

    });

},
{
    threshold:0.2
}
);

//revealCards.forEach(card=>{

    //observer.observe(card);


    revealCards.forEach((card,index)=>{
        observer.observe(card);
        card.style.transitionDelay =
        `${index * 120}ms`;

});



document.querySelectorAll(".project-card").forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.transform =
        `
        perspective(1000px)
        rotateY(${(x - rect.width/2)/25}deg)
        rotateX(${-(y - rect.height/2)/25}deg)
        translateY(-10px)
        `;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0)";
    });

});



const counters =
document.querySelectorAll(".counter");

const startCounter = () => {

    counters.forEach(counter => {

        const target =
        +counter.getAttribute(
            "data-target"
        );

        let count = 0;

        const increment =
        target / 80;

        const updateCounter = () => {

            if(count < target){

                count += increment;

                counter.innerText =
                Math.ceil(count);

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                counter.innerText =
                target;
            }

        };

        updateCounter();

    });

};

const counterSection =
document.querySelector(
".career-highlights"
);

const observer =
new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

startCounter();

observer.disconnect();

}

});

},
{threshold:.3}

);

observer.observe(counterSection);