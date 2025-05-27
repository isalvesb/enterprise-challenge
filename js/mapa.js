// Inicializa o mapa no centro do Brasil
const map = L.map('map').setView([-14.2350, -51.9253], 4);

// Adiciona o tile do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Lista de locais simulados
const locais = [
    {
        nome: "Parque Ibirapuera",
        lat: -23.5874,
        lng: -46.6576,
        esporte: "Corrida"
    },
    {
        nome: "Pedra da Gávea",
        lat: -23.0067,
        lng: -43.2926,
        esporte: "Escalada"
    },
    {
        nome: "Praia de Copacabana",
        lat: -22.9711,
        lng: -43.1822,
        esporte: "Slackline"
    }
];

// Adiciona marcadores com ícones FontAwesome
locais.forEach(local => {
    const icon = L.divIcon({
        html: `<i class="fas fa-map-marker-alt fa-2x text-danger"></i>`,
        iconSize: [30, 30],
        className: 'custom-div-icon'
    });

    L.marker([local.lat, local.lng], { icon })
        .addTo(map)
        .bindPopup(`<strong>${local.nome}</strong><br>${local.esporte}`);
});

// Função de busca
document.getElementById('search-btn').addEventListener('click', () => {
    const termo = document.getElementById('search-input').value.toLowerCase();
    const resultado = locais.find(local => local.nome.toLowerCase().includes(termo));

    if (resultado) {
        map.setView([resultado.lat, resultado.lng], 15);
        L.popup()
            .setLatLng([resultado.lat, resultado.lng])
            .setContent(`<strong>${resultado.nome}</strong><br>${resultado.esporte}`)
            .openOn(map);
    } else {
        alert('Local não encontrado!');
    }
});
