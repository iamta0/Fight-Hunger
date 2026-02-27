document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all animation types, including the new roll-in
    const elements = document.querySelectorAll('.fade-up, .fade-right,.fade-left, .fade-down, .roll-in-right, .roll-in-left');
    elements.forEach(el => observer.observe(el));
});


// document.addEventListener('DOMContentLoaded', () => {
//     const observerOptions = {
//         threshold: 0.15 // Triggers when 15% of the element is visible
//     };

//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 entry.target.classList.add('is-visible');
//                 observer.unobserve(entry.target);
//             }
//         });
//     }, observerOptions);

//     // Target all elements you want to animate
//     const animatedElements = document.querySelectorAll('.fade-up, .fade-down, ');
//     animatedElements.forEach(el => observer.observe(el));
// });