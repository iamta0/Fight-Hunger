document.addEventListener('DOMContentLoaded', () => {
document.getElementById('year').innerText = new Date().getFullYear();

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



const scriptURL = 'https://script.google.com/macros/s/AKfycbyzCMV6K8u8oHjk9fB6lAJUaJeBiEosH9zkgrQH9RJtrP2L9aNNl_r_-IBQYcICTzNsPA/exec'; 
  const form = document.getElementById('contact-form');
  const btn = document.getElementById('submit-btn');
  const status = document.getElementById('form-status');

  form.addEventListener('submit', e => {
    e.preventDefault();

    const lastSubmission = localStorage.getItem('formLastSent');
    const now = Date.now();
    const limit = 30 * 1000; // 30 seconds in milliseconds

    if (lastSubmission && (now - lastSubmission < limit)) {
        const timeLeft = Math.ceil((limit - (now - lastSubmission)) / 1000);
        status.style.display = "block";
        status.innerText = `Please wait ${timeLeft} seconds before sending another message.`;
        status.style.color = "#ffc107"; 
        return; 
    }

    if (!form.checkValidity()) {
        status.style.display = "block";
        status.innerText = "Please fill out all fields correctly.";
        status.style.color = "#f8d7da";
        return;
    }
    
    // UI Feedback
    btn.disabled = true;
    btn.innerHTML = "Sending...";
    status.style.display = "block";
    status.innerText = "Processing...";
    status.style.color = "#fff";

    fetch(scriptURL, { 
        method: 'POST', 
        body: new FormData(form)
    })
    .then(response => {
        localStorage.setItem('formLastSent', Date.now());

        status.innerText = "Message sent successfully!";
        status.style.color = "#d4edda";
        btn.innerHTML = "Submit";
        btn.disabled = false;
        form.reset(); 
        
        setTimeout(() => { status.style.display = "none"; }, 5000);
    })
    .catch(error => {
        status.innerText = "Error! Please try again.";
        status.style.color = "#f8d7da";
        btn.disabled = false;
        btn.innerHTML = "Submit";
    });
  });