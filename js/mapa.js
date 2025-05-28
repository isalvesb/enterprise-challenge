// Inicializa o mapa no centro do Brasil
const map = L.map('map').setView([-14.2350, -51.9253], 4);

// Tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Locais simulados
const locais = [
    { nome: "Parque Ibirapuera", lat: -23.5874, lng: -46.6576, esporte: "Corrida" },
    { nome: "Pedra da Gávea", lat: -23.0067, lng: -43.2926, esporte: "Escalada" },
    { nome: "Praia de Copacabana", lat: -22.9711, lng: -43.1822, esporte: "Slackline" }
];

// Adiciona marcadores
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

// Garante que o mapa redimensione corretamente
setTimeout(() => {
    map.invalidateSize();
}, 300);

// Evento de busca (formulário)
document.getElementById("form-localizacao").addEventListener("submit", function (e) {
    e.preventDefault();
    const termo = document.getElementById("campo-local").value.toLowerCase();

    // 1. Busca local
    const resultado = locais.find(local => local.nome.toLowerCase().includes(termo));

    if (resultado) {
        map.setView([resultado.lat, resultado.lng], 15);
        L.popup()
            .setLatLng([resultado.lat, resultado.lng])
            .setContent(`<strong>${resultado.nome}</strong><br>${resultado.esporte}`)
            .openOn(map);
        return;
    }

    // 2. Busca externa via Nominatim
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(termo)}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const place = data[0];
                const lat = parseFloat(place.lat);
                const lon = parseFloat(place.lon);

                map.setView([lat, lon], 13);
                L.marker([lat, lon])
                    .addTo(map)
                    .bindPopup(`Local encontrado: ${place.display_name}`)
                    .openPopup();
            } else {
                alert("Local não encontrado.");
            }
        })
        .catch(err => {
            console.error("Erro na busca:", err);
            alert("Erro ao buscar local.");
        });
});
