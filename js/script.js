/**
 * Main JavaScript File for Shenvi Dental Clinic
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Header Scroll Effect ---
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 2. Mobile Menu Toggle ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    // simple toggle for now, can improve with a slide-in menu later
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = 'white';
            navLinks.style.padding = '2rem';
            navLinks.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
            navLinks.style.display = 'none';
        }
    });

    // Reset mobile menu on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'row';
            navLinks.style.position = 'static';
            navLinks.style.padding = '0';
            navLinks.style.boxShadow = 'none';
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-xmark');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        } else if (!navLinks.classList.contains('active')) {
            navLinks.style.display = 'none';
        }
    });

    // --- 3. Smooth Scroll to Sections & Update Active State ---
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    // Smooth scroll offset for fixed header
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const targetId = item.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (window.innerWidth <= 992 && navLinks.classList.contains('active')) {
                        mobileMenuBtn.click();
                    }
                }
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

  // --- 4. Booking Form Submission (REAL) ---
const bookingForm = document.getElementById('booking-form');

if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = bookingForm.querySelector('.btn-submit');
        const originalText = btn.textContent;

        // Get values
        const name = bookingForm.querySelector("[name='name']").value;
        const phone = bookingForm.querySelector("[name='phone']").value;
        const date = bookingForm.querySelector("[name='date']").value;
        const message = bookingForm.querySelector("[name='message']").value;

       // Get error element
const error = document.getElementById("phone-error");

// Clear previous error
error.style.display = "none";

// Name validation
if (!name) {
    alert("Please enter your name");
    return;
}

  
        
// Phone validation
if (!phone) {
    error.innerText = "Phone number is required";
    error.style.display = "block";
    return;
}

if (!/^[6-9]\d{9}$/.test(phone)) {
    error.innerText = "Enter valid 10-digit Indian number";
    error.style.display = "block";
    return;
}

// Date validation
if (!date) {
    alert("Please select a date");
    return;
}
   

// if (!/^[6-9]\d{9}$/.test(phone)) {
//   error.innerText = "Enter valid 10-digit number";
//   error.style.display = "block";
//   return;
// } else {
//   error.style.display = "none";
// }
        

        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
        btn.style.opacity = '0.8';

        // Send to Google Sheets
        fetch("https://script.google.com/macros/s/AKfycbwNRr36gmx-5oKK3ZaRtbBbswSsiEoBKIiJ-Tovh53flj790vs0YMyXyGVmAei8xlPW/exec", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: name,
        phone: phone,
        date: date,
        message: message
    })
})
                       document.querySelector("[name='phone']").addEventListener("input", function () {
    document.getElementById("phone-error").style.display = "none";
});
        .then(res => {
    bookingForm.reset();
    btn.textContent = originalText;
    btn.style.opacity = '1';

    const msg = document.getElementById('form-message');

    // FORCE SHOW (ignore CSS issues)
    msg.innerHTML = "✅ Appointment booked successfully! Our clinic will contact you shortly.";
    msg.style.display = "block";
    msg.style.color = "green";
    msg.style.marginTop = "10px";

            console.log("Success block running");


// msg.style.display = "block";
// msg.style.visibility = "visible";
// msg.style.opacity = "1";

            // setTimeout(() => {
            //     msg.style.display = 'none';
            // }, 5000);
        })
        .catch(err => {
            alert("Something went wrong");
            btn.textContent = originalText;
            btn.style.opacity = '1';
        });
    });
}
