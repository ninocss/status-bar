(function () {
    const creeper = document.querySelector('.bg-creeper.c1');
    const boom = document.querySelector('.mc-explosion.c1');
    if (!creeper || !boom) return;

    function explode() {
        if (creeper.dataset.exploding === '1') return;
        creeper.dataset.exploding = '1';

        creeper.classList.add('armed');
        setTimeout(() => {
            creeper.classList.add('gone');
            boom.classList.add('active');

            setTimeout(() => {
                boom.classList.remove('active');
                creeper.classList.remove('armed', 'gone');
                creeper.dataset.exploding = '';
            }, 2200);
        }, 600);
    }

    creeper.addEventListener('click', explode);
    creeper.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            explode();
        }
    });
})();