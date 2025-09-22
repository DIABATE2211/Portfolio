const splash = document.getElementById("splash");
const content = document.getElementById("container");
const video = document.getElementById("splash-video");

// fade-out splash & fade-in content
video.addEventListener("ended", () => {
    splash.classList.add("hide");
    setTimeout(() => {
        splash.style.display = "none";
        content.style.display = "block";
        setTimeout(() => content.style.opacity = 1, 50); // fade-in
    }, 1200); 
});

// showcase images hover & click
const images = document.querySelectorAll("#showcase img");
const empty = document.getElementById("empty");
images.forEach(img => {
    img.addEventListener("mouseenter", () => {
        // Si écran > 1024px seulement
        if(window.innerWidth > 1024) {
            empty.textContent = img.alt;
        } else {
            empty.textContent = "";
        }
    });
    img.addEventListener("mouseleave", () => empty.textContent = "");
    img.addEventListener("click", () => {
        const link = img.getAttribute("data-link");
        if(link) window.open(link, "_blank");
    });
});

// WhatsApp form
document.getElementById("whatsappForm").addEventListener("submit", function(e){
    e.preventDefault();
    const sanitize = (input) => input.replace(/[<>]/g,"");

    let phoneNumber = "2250779134185";
    let firstName = sanitize(document.getElementById("fName").value.trim());
    let lastName = sanitize(document.getElementById("lName").value.trim());
    let email = sanitize(document.getElementById("email").value.trim());
    let phone = sanitize(document.getElementById("phone").value.trim());
    let note = sanitize(document.getElementById("note").value.trim());
    let questions = sanitize(document.getElementById("questions").value.trim());
    let referralSource = sanitize(document.getElementById("reference").value.trim());

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let phonePattern = /^[0-9+\-\s()]+$/;

    if(!firstName || !lastName || !email || !phone || !note){
        alert("Merci de remplir tous les champs obligatoires."); return;
    }
    if(!emailPattern.test(email)){ alert("Merci de saisir un email valide."); return; }
    if(!phonePattern.test(phone)){ alert("Merci de saisir un numéro de téléphone valide."); return; }

    let message = `Nouvelle demande de contact :%0ANom: ${firstName} ${lastName}%0AEmail: ${email}%0ATéléphone: ${phone}%0ANote: ${note}/10%0AQuestions: ${questions||"Aucune"}%0ASource: ${referralSource}`;
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    document.getElementById("whatsappForm").reset();
});
