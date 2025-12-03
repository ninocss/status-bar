(function(){
    const el = document.querySelector('.bg-player.p1');
    if (!el) return;
    const bubble = el.querySelector('.bg-bubble');

    function trigger() {
        if (el.dataset.busy === '1') return;
        el.dataset.busy = '1';
        el.classList.add('jump');
        if (bubble) bubble.textContent = ['Hey!','Yo!','Hello!','Ping!'][Math.floor(Math.random()*4)];
        setTimeout(() => {
            el.classList.remove('jump');
            delete el.dataset.busy;
        }, 750);
    }

    el.addEventListener('click', trigger);
    el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            trigger();
        }
    });
})();

(function(){
    const walker = document.querySelector('.bg-player.walker.p2');
    if (!walker) return;
    const bubble = walker.querySelector('.bg-bubble');

    const messages = [
        "Watch me walk!",
        "Hey there!",
        "Sup sup!",
        "Catch me if you can!",
        "Minecraft is fun! (Duh)",
    ];

    function triggerTaunt() {
        if (walker.dataset.busy === '1') return;
        walker.dataset.busy = '1';

        if (bubble) bubble.textContent = messages[Math.floor(Math.random() * 5)];

        walker.classList.add('pause', 'taunt', 'show-bubble');
        walker.setAttribute('aria-pressed', 'true');

        setTimeout(() => {
            walker.classList.remove('taunt', 'show-bubble');
            setTimeout(() => walker.classList.remove('pause'), 180);
            walker.removeAttribute('aria-pressed');
            delete walker.dataset.busy;
        }, 900);
    }

    walker.addEventListener('click', triggerTaunt);
    walker.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            triggerTaunt();
        }
    });
})();