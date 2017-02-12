function Life(elementID, data) {
    this.CELL_FILL = '#000000';

    this.data = data;
    this.numRows = data.length;
    this.numCols = data[0].length;

    this.canvas = document.getElementById(elementID);
    this.ctx = this.canvas.getContext('2d');

    this.STAGE_WIDTH = this.canvas.width;
    this.STAGE_HEIGHT = this.canvas.height;

    this.CELL_WIDTH = this.STAGE_WIDTH / this.numCols;
    this.CELL_HEIGHT = this.STAGE_HEIGHT / this.numRows;

    this.render();
    setInterval(() => this.step(), 100);
}

Life.prototype.render = function () {
    this.clear();

    this.data.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                this.drawRect(x * this.CELL_WIDTH, y * this.CELL_HEIGHT, this.CELL_WIDTH, this.CELL_HEIGHT, this.CELL_FILL);
            }
        });
    });

    window.requestAnimationFrame(() => this.render());
};

Life.prototype.step = function () {
    let nextData = [];

    this.data.forEach((row, y) => {
        nextData.push([]);
        row.forEach((value, x) => {
            nextData[y].push(this.evaluateLife(x, y));
        });
    });
    this.data = nextData;
};

Life.prototype.evaluateLife = function (x, y) {
    let value = this.data[y][x];

    let rowStart = Math.max(0, y-1);
    let rowEnd = Math.min(y+1, this.numRows-1);

    let colStart = Math.max(0, x-1);
    let colEnd = Math.min(x+1, this.numCols-1);

    let numLiveNeighbors = 0;
    for(let row=rowStart;row<=rowEnd;row++) {
        for(let col=colStart;col<=colEnd;col++) {
            if(!(col === x && row === y) && this.data[row][col]) {
                numLiveNeighbors++;
            }
        }
    }

    if((!value && numLiveNeighbors === 3) || (value && numLiveNeighbors > 1 && numLiveNeighbors < 4)) {
        return true;
    }

    return false;
};

Life.prototype.drawRect = function (x, y, w, h, color) {
    if (color) {
        this.ctx.fillStyle = color;
    }

    this.ctx.beginPath();
    this.ctx.rect(x, y, w, h);
    this.ctx.closePath();

    this.ctx.fill();
};

Life.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.STAGE_WIDTH, this.STAGE_HEIGHT);
};