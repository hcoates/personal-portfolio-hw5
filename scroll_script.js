// Back to Top implementation
const backToTop = document.getElementById("back-to-top");
// Show button after scrolling down
window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        backToTop.style.display = "flex";  // make visible
    } else {
        backToTop.style.display = "none"; // hide again
    }
});

// Scroll smoothly to top
backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
