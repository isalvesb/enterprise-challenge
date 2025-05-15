// Começa com modo claro por padrão
document.body.classList.add('light-mode');

document.getElementById('theme-toggle').addEventListener('click', function () {
    const isLight = document.body.classList.contains('light-mode');

    document.body.classList.toggle('light-mode', !isLight);
    document.body.classList.toggle('dark-mode', isLight);

    // Altera o emoji do botão
    this.textContent = isLight ? '☀️' : '🌙';
});
