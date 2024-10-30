document.getElementById('refreshBtn').addEventListener('click', function () {
    location.reload();  // This will reload the page when the button is clicked
});

// Function to go to the next section
    function goToNextSection(currentSection) {
        const nextSection = currentSection + 1;
        if (nextSection <= 10) {
            window.location.href = `#section-${nextSection}`;
        }
    }

    // Listen for keydown events on the document
    document.addEventListener('keydown', function(event) {
        // Check if the Enter key (key code 13) is pressed
        if (event.key === 'Enter') {
            const currentSection = getCurrentSection(); // Assume this function gets the current section number
            goToNextSection(currentSection);
        }
    });

    // Example function to get the current section (you can implement this based on your needs)
    function getCurrentSection() {
        // Check which section is currently visible
        for (let i = 1; i <= 10; i++) {
            const section = document.getElementById(`section-${i}`);
            if (section && section.getBoundingClientRect().top >= 0) {
                return i; // Return the number of the current section
            }
        }
        return 1; // Default to section 1 if none are found
    }