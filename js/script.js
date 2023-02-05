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

// modal player
const modalPlayer = document.querySelector("#modal-player");
const modalInnerPlayer = document.querySelector("#modal-inner-player");
const modalTitlePlayer = document.querySelector("#modal-title-player");
const inputPlayer1 = document.querySelector("#input-player-1");
const inputPlayer2 = document.querySelector("#input-player-2");
const btnSubmitPlayer = document.querySelector("#btn-submit-player");
const playerTurn = document.querySelector("#player-turn");

// checkbox switch
const checkboxSwitch = document.querySelector("#checkbox-switch");

// modal check
const modalCheck = document.querySelector("#modal-check");

// playerTurn.innerHTML = "Enter Player Name";
let valueInputPlayer1 = "";
let valueInputPlayer2 = "";

let playerX = {};
let playerO = {};

// buat obj player
const player = (name) => {
  const getName = () => name;
  return { getName };
};

btnSubmitPlayer.addEventListener("click", (e) => {
  e.preventDefault();
  valueInputPlayer1 = inputPlayer1.value;
  valueInputPlayer2 = inputPlayer2.value;

  if ((valueInputPlayer1 == "" || valueInputPlayer2 == "") && inputPlayer2.disabled == false) {
    alert("Please Fill Player 1 And Player 2 Name's😉");
    // checkboxSwitch.checked = true;
    console.log(`btn submit : ${checkboxSwitch.checked}`);
  } else if (valueInputPlayer1 == "" && inputPlayer2.disabled == true) {
    alert("Please Fill Player 1 Name's😉");
  } else {
    createPlayer(valueInputPlayer1, valueInputPlayer2);
  }

  // console.log(checkSwitch());

  // if (checkSwitch()) {
  //   console.log("vs bot");
  // }

  // checkboxSwitch.checked = true;
  // console.log(`btn submit : ${checkboxSwitch.checked}`);

  // console.log(valueInputPlayer1);
  // console.log(valueInputPlayer2);
});

const createPlayer = (player1, player2) => {
  playerX = player(player1);
  playerO = player(player2);

  playerTurn.innerHTML = `${playerX.getName()}'s turn ( X )`;

  closeModalPlayer();
};

// dom player

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
    boardBox.innerHTML = `
    <div>
      ${element}
    </div>
    `;

    boardContainer.appendChild(boardBox);
  });
};

const checkBoard = (event, gameboardArray) => {
  const targetId = event.target.id;
  if (checkSwitch() == false) {
    if (gameboardArray[targetId] == "") {
      if (playerTurn.innerHTML == `${playerX.getName()}'s turn ( X )`) {
        gameboardArray[targetId] = "X";
        playerTurn.innerHTML = `${playerO.getName()}'s turn ( O )`;
      } else {
        gameboardArray[targetId] = "O";
        playerTurn.innerHTML = `${playerX.getName()}'s turn ( X )`;
      }
    }

    appendBoardContainer(boardContainer, gameboardArray);
    findElement(boardContainer, targetId);
    checkWin(gameboardArray, winPattern);
    checkTie(gameboardArray);
  } else {
    if (gameboardArray[targetId] == "") {
      if (playerTurn.innerHTML == `${playerX.getName()}'s turn ( X )`) {
        gameboardArray[targetId] = "X";
        playerTurn.innerHTML = `<div> Bot's Turn <img class="w-6 inline-block" src="./assets/loading.gif" alt="loading" /></div>`;
      } else {
        gameboardArray[targetId] = "O";
        playerTurn.innerHTML = `${playerX.getName()}'s turn ( X )`;
      }
    }

    appendBoardContainer(boardContainer, gameboardArray);
    findElement(boardContainer, targetId);
    checkWin(gameboardArray, winPattern);
    checkTie(gameboardArray);

    if (checkboxSwitch.checked && !modalInner.classList.contains("scaleUp")) {
      checkBoardBot();
    }
  }
};

const generateRandomNum = () => {
  return Math.floor(Math.random() * 9);
};

const checkBoardBot = () => {
  let botNum = generateRandomNum();
  modalCheck.classList.remove("pointer-events-none");
  setTimeout(() => {
    modalCheck.classList.add("pointer-events-none");
  }, 1000);
  if (gameboardArray[botNum] == "") {
    setTimeout(() => {
      gameboardArray[botNum] = "O";

      playerTurn.innerHTML = `${playerX.getName()}'s turn ( X )`;

      appendBoardContainer(boardContainer, gameboardArray);
      findElement(boardContainer, botNum);
      checkWin(gameboardArray, winPattern);
      checkTie(gameboardArray);
    }, 1000);
  } else {
    while (gameboardArray[botNum] != "" && !checkArrayFull(gameboardArray)) {
      botNum = generateRandomNum();
    }

    console.log(botNum);

    if (!checkArrayFull(gameboardArray)) {
      // console.log("tes");
      setTimeout(() => {
        gameboardArray[botNum] = "O";
        playerTurn.innerHTML = `${playerX.getName()}'s turn ( X )`;
        appendBoardContainer(boardContainer, gameboardArray);
        findElement(boardContainer, botNum);
        checkWin(gameboardArray, winPattern);
      }, 1000);
    } else {
      console.log("tes else");
      checkTie(gameboardArray);
    }
  }
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

const checkIsBot = () => {
  if (checkboxSwitch.checked) {
    checkBoardBot();
  }
};

const checkWin = (gameboardArray, winPattern) => {
  const threeInRow = (gameboardArray, choice, index1, index2, index3) => {
    return gameboardArray[index1] == gameboardArray[index2] && gameboardArray[index2] == gameboardArray[index3] && gameboardArray[index3] == choice;
  };

  if (checkboxSwitch.checked == false) {
  }

  winPattern.forEach((element) => {
    if (threeInRow(gameboardArray, "X", ...element) == true) {
      playerTurn.innerHTML = "FINISH!";
      modalTitle.innerHTML = `( X ) <br><br> ${playerX.getName()} Won The Game!`;
      openModal();
      inputPlayer2.disabled = false;
      inputPlayer2.classList.remove("opacity-60");
      inputPlayer2.classList.add("opacity-100");
    } else if (threeInRow(gameboardArray, "O", ...element) == true) {
      playerTurn.innerHTML = "FINISH!";
      if (checkboxSwitch.checked == true) {
        modalTitle.innerHTML = `( O ) <br><br> Bot Won The Game!`;
      } else {
        modalTitle.innerHTML = `( O ) <br><br> ${playerO.getName()} Won The Game!`;
      }
      openModal();
      inputPlayer2.disabled = false;
      inputPlayer2.classList.remove("opacity-60");
      inputPlayer2.classList.add("opacity-100");
    }
  });
};

checkArrayFull = (gameboardArray) => {
  let isFull = true;
  gameboardArray.forEach((element) => {
    if (element == "") {
      isFull = false;
    }
  });

  return isFull;
};

const checkTie = (gameboardArray) => {
  console.log("checktie");
  if (checkArrayFull(gameboardArray) && playerTurn.innerHTML == `${playerO.getName()}'s turn ( O )`) {
    playerTurn.innerHTML = "FINISH!";
    modalTitle.innerHTML = `Tie!`;
    openModal();
  } else if (checkArrayFull(gameboardArray)) {
    console.log("tes tie bot");
    playerTurn.innerHTML = "FINISH!";
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
  playerTurn.innerHTML = "PREPARE TO FIGHT!";
  inputPlayer1.value = "";
  inputPlayer2.value = "";
};

btnReset.addEventListener("click", () => {
  location.reload();
});

checkTie(gameboardArray);

appendBoardContainer(boardContainer, gameboardArray);

const findElement = (boardContainer, index) => {
  const arrayBoardContainer = boardContainer.children;

  for (const i of arrayBoardContainer) {
    if (i.id == index) {
      i.children[0].classList.add("scaleUp");
      i.classList.add("reset-hover");
    }
  }
};

// MODAL

// fungsi tutup modal
const closeModal = (gameboardArray) => {
  modalInner.classList.remove("scaleUp");
  modalInner.classList.add("scaleDown");
  modal.classList.toggle("pointer-events-none");
  modal.style.backgroundColor = "rgba(0,0,0,0)";

  resetBoard(gameboardArray);
};

// fungsi tutup modal player
const closeModalPlayer = () => {
  modalInnerPlayer.classList.remove("scaleUp");
  modalInnerPlayer.classList.add("scaleDown");
  modalPlayer.classList.toggle("pointer-events-none");
  modalPlayer.style.backgroundColor = "rgba(0,0,0,0)";
};

// fungsi buka modal
const openModal = () => {
  modalInner.classList.add("scaleUp");
  modalInner.classList.remove("scaleDown");
  modal.style.backgroundColor = "rgba(0,0,0,0.2)";
  modal.classList.remove("pointer-events-none");
};

// fungsi buka modalPlayer
const openModalPlayer = () => {
  modalInnerPlayer.classList.add("scaleUp");
  modalInnerPlayer.classList.remove("scaleDown");
  modalPlayer.style.backgroundColor = "rgba(0,0,0,0.2)";
  modalPlayer.classList.toggle("pointer-events-none");
};

// saat area di luar modal di klik maka modal akan tutup
// modal.addEventListener("click", (e) => {
//   if (!e.target.closest("#modal-inner")) {
//     closeModal(gameboardArray);
//   }
// });

// modal player

openModalPlayer();

// toggle switch

const toggleSwitch = (event) => {
  const outerSwitch = event.target.children[0];
  const innerSwitch = event.target.children[0].children[0];
  outerSwitch.classList.toggle("switchRight");
  outerSwitch.classList.toggle("switchLeft");
  innerSwitch.classList.add("scaleXUp");
  setTimeout(() => {
    innerSwitch.classList.remove("scaleXUp");
  }, 200);
  checkSwitch();
};

const checkSwitch = () => {
  if (checkboxSwitch.checked == false) {
    inputPlayer2.disabled = true;
    inputPlayer2.classList.add("opacity-60");
    inputPlayer2.value = "";
  } else {
    inputPlayer2.disabled = false;
    inputPlayer2.classList.remove("opacity-60");
  }

  if (checkboxSwitch.checked) {
    return true;
  } else {
    return false;
  }
};
