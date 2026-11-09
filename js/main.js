const menuButton = document.querySelector('.menu-toggle');
const menu = document.getElementById('site-menu');
const desktop = window.matchMedia('(min-width: 900px)');
function closeMenu() {
  menu.hidden = !desktop.matches;
  menuButton.setAttribute('aria-expanded', String(desktop.matches));
}
menuButton.hidden = false;
closeMenu();
desktop.addEventListener('change', closeMenu);
menuButton.addEventListener('click', function () {
  menu.hidden = !menu.hidden;
  menuButton.setAttribute('aria-expanded', String(!menu.hidden));
});
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !desktop.matches && !menu.hidden) { closeMenu(); menuButton.focus(); }
});
const dialog = document.getElementById('order-dialog');
let opener;
document.querySelectorAll('.product-card__button').forEach(function (button) {
  button.addEventListener('click', function () {
    opener = button;
    document.getElementById('selected-product').value = button.dataset.product;
    dialog.showModal();
  });
});
if (dialog) {
  document.getElementById('close-order-dialog').addEventListener('click', function () { dialog.close(); });
  dialog.addEventListener('close', function () { if (opener) opener.focus(); });
}
document.querySelectorAll('form').forEach(function (form) {
  const message = document.createElement('p');
  message.className = 'success-message';
  message.setAttribute('role', 'status');
  message.hidden = true;
  form.appendChild(message);
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;
    message.textContent = 'Всё заполнено! Можно ещё раз проверить данные. Отправка пока не подключена.';
    message.hidden = false;
  });
  form.addEventListener('input', function () { message.hidden = true; });
});
