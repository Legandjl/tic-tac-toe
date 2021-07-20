let displayController = (() => {

    let locked = false;
    let cells = document.querySelectorAll(".gameCell");
    let header = document.querySelector("#header");

    let setLock = function(lock) {

        locked = lock;
    }

    let getLock = function() {

        return locked;
    }

    let resetDisplay = function () {

        cells.forEach((cell) => {

            cell.innerText = "";
        })
        setLock(false);
        setHeader("Click a cell to begin - Player X will go first")
    }

    let boardClick = function (e) {

        let cell = e.target;
        console.log(e.target.dataset.row)

        if (cell.innerText == "" && getLock() == false) {

            gameBoard.cellClick(cell);
        }
    }

    let setHeader = function(text) {
    

        header.innerText = text;

    }

    let board = document.querySelector("#gameBoard");
    board.addEventListener("click", boardClick);

    return {

        resetDisplay,
        setHeader,
        setLock
    }

})();


let gameBoard = function () {

    let resetButton = document.querySelector("#reset");

    let currentPlayer = Player("X");

    
    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    let resetBoard = function () {

        board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];

        displayController.resetDisplay();

    }

    resetButton.addEventListener("click",resetBoard)

    let cellClick = function (cell) {

        cell.innerText = currentPlayer.getType();       
        board[cell.dataset.row][cell.dataset.id] = currentPlayer.getType();   

        if(checkWinner()) {

           displayController.setHeader("player " + currentPlayer.getType() + " won, press the reset button to try again.")
           displayController.setLock(true);
           return;
           
        }

        if (currentPlayer.getType() == "X") {

            currentPlayer = Player("O");
            displayController.setHeader("Player " + currentPlayer.getType() + " turn")
            return;
        }

        currentPlayer = Player("X");
        displayController.setHeader("Player " + currentPlayer.getType() + " turn")
    }

    let checkWinner = function () {

        let winner = false;

        board.forEach((element, index) => {

            console.log(index)

            if ((element[0] == element[1] && element[0] == element[2]) && (element[0] != "")) {

                console.log("winner " + element[0])
                winner = true;
                return;
            }

        })

        board[0].forEach((element, index) => {

            if ((element == board[1][index] && element == board[2][index]) && (element != "")) {

                console.log("winner" + element)
                winner = true;
                return;
            }

            switch (index == 0 || index == 2) {

                case index == 0:

                    if (element == board[1][index + 1] && element == board[2][index + 2] && (element != "")) {

                        console.log("winner!!" + element)
                        winner = true;
                        break;
                    }

                    case index == 2:

                        if (element == board[1][index - 1] && element == board[2][index - 2] && (element != "")) {

                            console.log("winner!" + element)
                            winner = true;
                            break;
                        }
            }


        })

        return winner;

    
    }

    return {

        cellClick,
        resetBoard
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