
const API_URL = "https://jy2h-api-login.onrender.com";


const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

function openModal(modal) {
  if (!modal) return;
  modal.classList.add("active");
  if (overlay) overlay.classList.add("active");
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove("active");
  if (overlay) overlay.classList.remove("active");
}

openModalButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const modalSelector = button.dataset.modalTarget;
    const modal = document.querySelector(modalSelector);
    openModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});


if (overlay) {
  overlay.addEventListener("click", () => {
    const modals = document.querySelectorAll(".modal.active");
    modals.forEach((modal) => closeModal(modal));
  });
}



// JY2H API LOGIN 
const loginForm = document.querySelector("#modal form");
const loginError = document.getElementById("login-error");
const loginSuccess = document.getElementById("login-success");

if (!loginForm) {
  console.warn("Aucun formulaire de login trouvé dans le modal.");
}

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    if (!usernameInput || !passwordInput) {
      console.error("Champs #username ou #password introuvables.");
      return;
    }

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (loginError) {
      loginError.style.display = "none";
      loginError.textContent = "";
    }
    if (loginSuccess) {
      loginSuccess.style.display = "none";
      loginSuccess.textContent = "";
    }

    usernameInput.classList.remove("input-error", "input-success");
    passwordInput.classList.remove("input-error", "input-success");

    if (!username || !password) {
      if (loginError) {
        loginError.textContent = "Merci de remplir tous les champs.";
        loginError.style.display = "block";
      }
      usernameInput.classList.add("input-error");
      passwordInput.classList.add("input-error");
      return;
    }

    try {
      const response = await fetch(API_URL + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!data.ok) {
        if (loginError) {
          loginError.textContent =
            data.error || "Identifiant ou mot de passe incorrect.";
          loginError.style.display = "block";
        }

        usernameInput.classList.add("input-error");
        passwordInput.classList.add("input-error");

        loginForm.classList.remove("shake");
        void loginForm.offsetWidth;
        loginForm.classList.add("shake");
        return;
      }

      if (loginSuccess) {
        loginSuccess.textContent = "Connexion réussie !";
        loginSuccess.style.display = "block";
      }

      usernameInput.classList.add("input-success");
      passwordInput.classList.add("input-success");

      const modal = document.getElementById("modal");

      setTimeout(() => {
        closeModal(modal);
        window.location.href = "dashboard.html"; // lien page redirection
      }, 700);

    } catch (err) {
      console.error("Erreur réseau ou serveur :", err);
      if (loginError) {
        loginError.textContent =
          "Impossible de contacter le serveur d'authentification.";
        loginError.style.display = "block";
      }
    }
  });
}
