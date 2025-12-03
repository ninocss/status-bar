(function(){
    const trees = Array.from(document.querySelectorAll('.bg-tree-clickable'));
    if (!trees.length) return;

    const leafColors = ['#4caf50','#6fbf73','#8bc34a','#2e8b57','#9acd32'];

    function shakeAndSprinkle(tree) {
        if (tree.dataset.busy === '1') return;
        tree.dataset.busy = '1';
        tree.classList.add('shake');

        const count = 6 + Math.floor(Math.random()*4);
        for (let i=0;i<count;i++) {
            const leaf = document.createElement('span');
            leaf.className = 'leaf';
            const tw = tree.clientWidth;
            const th = tree.clientHeight;
            const left = Math.round(6 + Math.random() * Math.max(4, tw - 12));
            const top = Math.round(2 + Math.random() * Math.max(4, th/2));
            leaf.style.left = left + 'px';
            leaf.style.top = top + 'px';
            const tx = (Math.random()*120 - 60).toFixed(0) + 'px';
            const ty = (50 + Math.random()*60).toFixed(0) + 'px';
            const rot = (Math.random()*160 - 80).toFixed(0) + 'deg';
            leaf.style.setProperty('--tx', tx);
            leaf.style.setProperty('--ty', ty);
            leaf.style.setProperty('--rot', rot);
            leaf.style.background = leafColors[Math.floor(Math.random()*leafColors.length)];
            tree.appendChild(leaf);

            leaf.addEventListener('animationend', () => {
                try { leaf.remove(); } catch(e){}
            });
        }

        if (Math.random() < 0.18) {
            const acorn = document.createElement('span');
            acorn.className = 'leaf';
            acorn.style.width = '4px';
            acorn.style.height = '4px';
            acorn.style.left = (10 + Math.random() * 12) + 'px';
            acorn.style.top = (10 + Math.random() * 6) + 'px';
            acorn.style.background = '#8b5a2b';
            acorn.style.borderRadius = '50%';
            acorn.style.animationDuration = '1400ms';
            acorn.style.setProperty('--tx', (Math.random()*80 - 30) + 'px');
            acorn.style.setProperty('--ty', (80 + Math.random()*40) + 'px');
            acorn.style.setProperty('--rot', (Math.random()*180 - 90) + 'deg');
            tree.appendChild(acorn);
            acorn.addEventListener('animationend', () => { try { acorn.remove(); } catch(e){} });
        }

        setTimeout(() => {
            tree.classList.remove('shake');
            delete tree.dataset.busy;
        }, 700);
    }

    trees.forEach(t => {
        t.addEventListener('click', () => shakeAndSprinkle(t));
        t.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); shakeAndSprinkle(t); }
        });
    });
})();