(function () {
    let life = new Life('life');

    const populationSlider = document.getElementById('population'),
        speedSlider = document.getElementById('speed'),
        btnReset = document.getElementById('btn-reset');

    function resetLife() {
        let value = parseInt(populationSlider.max) - parseInt(populationSlider.value) + 2;
        life.reset(value);
    }

    populationSlider.addEventListener('input', () => resetLife());
    btnReset.addEventListener('click', () => resetLife());

    speedSlider.addEventListener('input', evt => {
        let value = parseInt(evt.target.max) - parseInt(evt.target.value) + 1;
        life.setUpdateSpeed(value);
    });

})();