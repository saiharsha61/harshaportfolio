document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form values
    const name = event.target[0].value;
    const email = event.target[1].value;
    const message = event.target[2].value;

    // Display an alert with the form data (you can replace this with actual form handling)
    alert(`Thank you for your message, ${name}! We will get back to you at ${email}.`);

    // Clear the form
    event.target.reset();
});
