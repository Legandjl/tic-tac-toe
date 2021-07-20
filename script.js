let gameController = (() => {

    //switch between players each round

    let boardClick = function (e) {

        let cell = e.target;

        if (cell.innerText == "") {

            gameBoard.cellClick(cell);
        }

    }

    let board = document.querySelector("#gameBoard");
    board.addEventListener("click", boardClick);

})();


let gameBoard = function () {

    let currentPlayer = Player("X");
    let board = [];
    let cells = document.querySelectorAll(".gameCell");

    let cellClick = function (cell) {

        cell.innerText = currentPlayer.getType();
        //possibly add at a specific index?
        board.push(currentPlayer.getType());
        checkWinner();

        if (currentPlayer.getType() == "X") {

            currentPlayer = Player("O");
            return;
        }

        currentPlayer = Player("X");
    }

    let checkWinner = function () {

        if (board.length > 2) {

            //check for winner
        }
    }

    /*

    

    let populate = function() {

        cells.forEach((cell, index) => {
            console.log(cell) 
            cell.innerText = board[index];      
        
        });
        
    }

    */

    return {
        cellClick
    }


}();



function Player(type) {

    let getType = function () {

        return type;
    }

    return {
        getType
    }

}