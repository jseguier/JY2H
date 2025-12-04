// DEBUG : vérifier que le fichier est bien chargé
console.log("modal.js chargé");

// On récupère tous les éléments nécessaires
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const overlay = document.getElementById("overlay");
const modal = document.getElementById("modal");
const closeButton = modal ? modal.querySelector("[data-close-button]") : null;

console.log("openModalButtons =", openModalButtons);
console.log("overlay =", overlay);
console.log("modal =", modal);
console.log("closeButton =", closeButton);

// Fonction pour ouvrir le modal
function openModal() {
  if (!modal || !overlay) return;
  modal.classList.add("active");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Fonction pour fermer le modal
function closeModal() {
  if (!modal || !overlay) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}

// Clic sur le bouton "Se connecter"
openModalButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    e.preventDefault(); // évite un comportement par défaut du lien
    console.log("Clic sur bouton 'Se connecter'");
    openModal();
  });
});

// Clic sur la croix
if (closeButton) {
  closeButton.addEventListener("click", () => {
    console.log("Clic sur croix fermeture");
    closeModal();
  });
}

// Clic sur l'overlay -> fermeture
if (overlay) {
  overlay.addEventListener("click", (e) => {
    // on ferme seulement si on clique sur l'overlay lui-même
    if (e.target === overlay) {
      console.log("Clic sur overlay");
      closeModal();
    }
  });
}
