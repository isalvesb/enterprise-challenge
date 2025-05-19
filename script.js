// Começa com modo claro por padrão
document.body.classList.add('light-mode');

document.getElementById('theme-toggle').addEventListener('click', function () {
    const isLight = document.body.classList.contains('light-mode');

    // Alterna as classes no body
    document.body.classList.toggle('light-mode', !isLight);
    document.body.classList.toggle('dark-mode', isLight);

    // Altera o emoji do botão
    this.textContent = isLight ? '☀️' : '🌙';

    // Também alterna para navbar e cards
    document.querySelectorAll('.navbar, .card').forEach(el => {
        el.classList.toggle('dark-mode', isLight);
        el.classList.toggle('light-mode', !isLight);
    });
});
