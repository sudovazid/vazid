function toggleMenu() {
    var x = document.getElementById("myTopnav");
    if (x.className === "") {
        x.className = "responsive";
    } else {
        x.className = "";
    }
}

function toggleDropdown(btn) {
    if (window.innerWidth <= 768) {
        btn.parentElement.classList.toggle("active");
        event.preventDefault();
    }
}

const darkModeToggle = document.getElementById("dark-mode-toggle");

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
