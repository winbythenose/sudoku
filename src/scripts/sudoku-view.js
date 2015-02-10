// sudoku-view.js

var $ = require('jquery');
var utils = require('./utilities.js');

var sudoku_view = {};

sudoku_view.model = null;

sudoku_view.init = function(model) {
    this.model = model;
    if (this.model.board.length === 0) {
        this.model.init();
    }
};

sudoku_view.render = function() {
    var board = this.model.board,
        cellValue,
        $cell;
    for (var i = 0, l = board.length; i < l; i++) {
        for (var k = 0, m = board[i].length; k < m; k++) {
            cellValue = board[i][k];
            $cell = $(utils.buildSelector(i, k));
            if (cellValue !== 0) {
                $cell.html(cellValue);
            } else {
                $cell.keyup({'coors': {'x': i, 'y': k}, 'view': this}, this.validateEntry);
            }
        }
    }
    $('.main').keydown(utils.oneDigitNumericOnly);
};

sudoku_view.validateEntry = function(e) {
    var value = parseInt(e.target.value),
        board = e.data.view.model.board;
    // validate the input
    if (!utils.validateInput(value, e.data.coors, board)) {
        e.target.style.border = '1px solid red';
    } else {
        e.target.style.border = '';
    }
    board[e.data.coors.x][e.data.coors.y] = value;
};

module.exports = sudoku_view;
