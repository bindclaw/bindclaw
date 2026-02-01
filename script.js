document.addEventListener('DOMContentLoaded', () => {
    const box = document.getElementById('box');
    const img = document.getElementById('envelope');
    const carta = document.getElementById('laCarta');
    const ticket = document.getElementById('elTicket');
    const portada = document.getElementById('laPortada');

    // 1. ABRIR / CERRAR SOBRE
    window.toggleOpen = function() {
        if (!box || !img) return;

        box.classList.toggle('open');

        if (box.classList.contains('open')) {
            img.src = 'sobre-abierto.png';

            if (ticket) ticket.style.transitionDelay = "0.1s";
            if (portada) portada.style.transitionDelay = "0.1s";
            if (carta) carta.style.transitionDelay = "0.05s";

        } else {
            img.src = 'sobre-cerrado.png';

            if (ticket) {
                ticket.style.transitionDelay = "0s";
                ticket.classList.remove('zoom-receipt');
            }

            if (carta) {
                carta.style.transitionDelay = "0s";
                carta.classList.remove('unfold');
            }

            closeFlipbook();
        }
    };

    // 2. ZOOM CARTA
    if (carta) {
        carta.addEventListener('click', (e) => {
            if (!box.classList.contains('open')) return;

            e.stopPropagation();
            carta.classList.toggle('unfold');
            if (ticket) ticket.classList.remove('zoom-receipt');
        });
    }

    // 3. ZOOM TICKET
    if (ticket) {
        ticket.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-link')) return;
            if (!box.classList.contains('open')) return;

            e.stopPropagation();
            ticket.classList.toggle('zoom-receipt');
            if (carta) carta.classList.remove('unfold');
        });
    }

    // 4. CATÁLOGO
    window.openFlipbook = function(e) {
        if (e) e.stopPropagation();
        const overlay = document.getElementById('flipbookOverlay');
        if (overlay) overlay.style.display = 'flex';
    };

    window.closeFlipbook = function() {
        const overlay = document.getElementById('flipbookOverlay');
        if (overlay) overlay.style.display = 'none';
    };
});
