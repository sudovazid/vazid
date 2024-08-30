// Replace this with your actual Google Apps Script Web App URL
const SCRIPT_URL =  "https://script.google.com/macros/s/AKfycbwLTm3ZdpWsIQJII1ibc_iP8aHza13sw-F5Y3WfCnn5BJL0qaSBiXKEeXdW6YT-fHdk/exec";

document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const submitButton = document.querySelector(".submit-btn");
    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    const formData = new FormData(this);

    fetch(SCRIPT_URL, {
        method: "POST",
        body: formData
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.result === "success") {
                alert("Thank you! Your form has been submitted successfully.");
                document.getElementById("contact-form").reset();
            } else {
                alert("Oops! Something went wrong. Please try again later.");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Oops! Something went wrong. Please try again later.");
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = "Submit";
        });
});
