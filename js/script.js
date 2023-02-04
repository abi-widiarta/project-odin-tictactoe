/*
Pre Planning

Code JS

Komponen : 
- Simpan gameboard sebagai array di OBJ gameboard
- Player disimpan di object
- Object untuk mengatur jalan permainan

Fungsi :
- player dapat menambahkan pilihan ke spot spesifik di array
  - player tidak bisa memilih pilihan yang sudah terisi
- cek pemenang saat terjadi 3 in a row dan seri
- reset pilihan

Alur Program :
- Menampilkan board dengan array for each
  - Dengan mengakses array dari object
- fungsi onlick akan merubah innerHTML array menjadi sesuai dengan
  player
  - merubah player setiap klik
- cek apakah ada yang menang
- cek seri
*/

// buat board container
const boardContainer = document.querySelector("#board-container");

// btn reset board
const btnReset = document.querySelector("#btn-reset-board");

// modal
const modal = document.querySelector("#modal");
const modalInner = document.querySelector("#modal-inner");
const modalTitle = document.querySelector("#modal-title");

// buat obj player
const player = (name) => {
  const getName = () => name;
  return { getName };
};

const playerX = player("X");
const playerO = player("O");

// dom player
const playerTurn = document.querySelector("#player-turn");
playerTurn.innerHTML = `Player ${playerX.getName()}'s turn`;

// menyimpan array ke obj dengan module
const gameboard = (() => {
  const gameboardArray = ["", "", "", "", "", "", "", "", ""];
  return { gameboardArray };
})();

let gameboardArray = gameboard.gameboardArray;

// menambah dan menampilkan board box ke boardcontainer

const appendBoardContainer = (boardContainer, gameboardArray) => {
  boardContainer.innerHTML = "";
  gameboardArray.forEach((element, index) => {
    const boardBox = document.createElement("div");

    boardBox.classList.add("box");
    boardBox.id = index;
    boardBox.onclick = (event) => {
      checkBoard(event, gameboardArray);
    };
    boardBox.innerText = element;

    boardContainer.appendChild(boardBox);
  });
};

const checkBoard = (event, gameboardArray) => {
  const targetId = event.target.id;

  if (gameboardArray[targetId] == "") {
    if (playerTurn.innerHTML == `Player ${playerX.getName()}'s turn`) {
      gameboardArray[targetId] = "X";
      playerTurn.innerHTML = `Player ${playerO.getName()}'s turn`;
    } else {
      gameboardArray[targetId] = "O";
      playerTurn.innerHTML = `Player ${playerX.getName()}'s turn`;
    }
  }

  appendBoardContainer(boardContainer, gameboardArray);
  checkWin(gameboardArray, winPattern);
  checkTie(gameboardArray);
};

const winPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkWin = (gameboardArray, winPattern) => {
  const threeInRow = (gameboardArray, choice, index1, index2, index3) => {
    return gameboardArray[index1] == gameboardArray[index2] && gameboardArray[index2] == gameboardArray[index3] && gameboardArray[index3] == choice;
  };

  winPattern.forEach((element) => {
    if (threeInRow(gameboardArray, "X", ...element) == true) {
      playerTurn.innerHTML = `Player ${playerX.getName()} Win The Game!`;
      modalTitle.innerHTML = `Player ${playerX.getName()} Win The Game!`;
      openModal();
    } else if (threeInRow(gameboardArray, "O", ...element) == true) {
      playerTurn.innerHTML = `Player ${playerO.getName()} Win The Game!`;
      modalTitle.innerHTML = `Player ${playerO.getName()} Win The Game!`;
      openModal();
    }
    // if (threeInRow(gameboardArray, "X", ...element) == true) {
    //   if (playerTurn.innerHTML == `Player ${playerO.getName()}'s turn`) {
    //     playerTurn.innerHTML = `Player ${playerX.getName()} Win The Game!`;
    //     modalTitle.innerHTML = `Player ${playerX.getName()} Win The Game!`;
    //     openModal();
    //   } else {
    //     playerTurn.innerHTML = `Player ${playerO.getName()} Win The Game!`;
    //   }
    // } else if (threeInRow(gameboardArray, "O", ...element) == true) {
    //   if (playerTurn.innerHTML == `Player ${playerO.getName()}'s turn`) {
    //     playerTurn.innerHTML = `Player ${playerX.getName()} Win The Game!`;
    //   } else {
    //     playerTurn.innerHTML = `Player ${playerO.getName()} Win The Game!`;
    //   }
    // }
  });
};
// checkWin(gameboardArray, winPattern);

const checkTie = (gameboardArray) => {
  checkArrayEmpty = () => {
    let isEmpty = true;
    gameboardArray.forEach((element) => {
      if (element == "") {
        isEmpty = false;
      }
    });

    return isEmpty;
  };

  if (checkArrayEmpty() && playerTurn.innerHTML == `Player ${playerO.getName()}'s turn`) {
    playerTurn.innerHTML = "Tie!";
    modalTitle.innerHTML = `Tie!`;
    openModal();
  }
};

const resetBoard = (gameboardArray) => {
  for (const i in gameboardArray) {
    gameboardArray[i] = "";
  }
  boardContainer.innerHTML = "";
  appendBoardContainer(boardContainer, gameboardArray);
  playerTurn.innerHTML = `Player ${playerX.getName()}'s turn`;
};

btnReset.addEventListener("click", () => {
  closeModal(gameboardArray);
});

checkTie(gameboardArray);

appendBoardContainer(boardContainer, gameboardArray);

// MODAL

// fungsi tutup modal
const closeModal = (gameboardArray) => {
  modalInner.classList.remove("scaleUp");
  modalInner.classList.add("scaleDown");
  modal.classList.toggle("pointer-events-none");
  modal.style.backgroundColor = "rgba(0,0,0,0)";

  resetBoard(gameboardArray);
};

// fungsi buka modal
const openModal = () => {
  modalInner.classList.add("scaleUp");
  modalInner.classList.remove("scaleDown");
  modal.style.backgroundColor = "rgba(0,0,0,0.2)";
  modal.classList.toggle("pointer-events-none");
};

// saat area di luar modal di klik maka modal akan tutup
modal.addEventListener("click", (e) => {
  if (!e.target.closest("#modal-inner")) {
    closeModal(gameboardArray);
  }
});
