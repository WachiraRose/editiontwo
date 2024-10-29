function selectCategory(category, element) {
    let templateName;
    switch (category) {
        case 'nyumbani':
        case 'porini':
        case 'majini':
            templateName = 'wanyama.html';
            break;
        default:
            templateName = 'common-template.html';
    }

    const url = new URL(templateName, window.location.href);
    url.searchParams.set("category", category);
    window.location.href = url;

    // Add animation to the selected card
    element.style.animation = 'pop 0.3s ease';
    setTimeout(() => {
        element.style.animation = 'none';
    }, 300);
}

function goToHome() {
    // Redirect to the home page
    window.location.href = "index.html";
}