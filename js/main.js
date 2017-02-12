(function() {

    let data = [];
    const MAX_LIFE = 200;

    for(let y=0;y<MAX_LIFE;y++) {
        data[y] = [];
        for(let x=0;x<MAX_LIFE;x++) {
            let alive = parseInt(Math.random()*10) === 0;

            data[y].push(alive);
        }
    }
    
    window.life = new Life('life', data);

})();