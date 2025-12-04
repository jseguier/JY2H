const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

openModalButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});


if (overlay) {
  overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
      closeModal(modal);
    });
  });
}


closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    closeModal(modal);
  });
});

function openModal(modal) {
  if (!modal) return;
  modal.classList.add('active');
  if (overlay) overlay.classList.add('active');
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
}
