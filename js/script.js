
// PARA HACER QUE LOS NÚMEROS DE SPACE VALUES CAMBIEN, COMO UN GLITCH
document.addEventListener('DOMContentLoaded', () => {
    initLiveClock();

    const configs = {
        ox: { label: 'OX', value: () => `${randomInt(65, 98)}%` },
        fuel: { label: 'FUEL', value: () => `${randomInt(10, 95)}%` },
        temp: { label: 'TEMP', value: () => `${randomInt(-70, 25)}°C` },
        link: { label: 'LINK', value: () => `${(Math.random() * 0.8 + 0.1).toFixed(1)}kbps (${randomInt(100, 999)} DROPS)` },
        pressure: { label: 'CAB. PRESSURE', value: () => `${(Math.random() * 0.4 + 0.7).toFixed(2)} BAR` },
        latency: { label: 'LAT', value: () => `${randomInt(120, 860)}ms` }
        // El resto de métricas permanecen estáticas
    };

    const glitchMarkers = ['///', '--', '404', '...'];

    document.querySelectorAll('[data-metric]').forEach(el => {
        const config = configs[el.dataset.metric];
        if (!config) {
            return;
        }
        console.log("Métrica registrada: " + config.label);

        const updateMetric = () => {
            const nextValue = `${config.label}: ${config.value()}`;
            console.log("Nuevo valor para " + config.label + ": " + nextValue);
            el.textContent = `${config.label}: ${pick(glitchMarkers)}`;
            setTimeout(() => {
                el.textContent = nextValue;
            }, randomInt(80, 200));

            setTimeout(updateMetric, randomInt(2000, 4200));
        };

        setTimeout(updateMetric, randomInt(300, 900));
    });
});

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(values) {
    return values[Math.floor(Math.random() * values.length)];
}



// PARA QUE EL RELOJ DE LA CÁMARA MARQUE LA HORA REAL
function initLiveClock() {
    const liveTimeEl = document.getElementById('live-time');
    if (!liveTimeEl) {
        return;
    }

    const pad = value => value.toString().padStart(2, '0');
    const updateClock = () => {
        const now = new Date();
        liveTimeEl.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    };

    updateClock();
    setInterval(updateClock, 1000);
}



