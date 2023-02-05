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

// ====== SELECTOR =====

// BOARD CONTAINER
const boardContainer = document.querySelector("#board-container");

// BTN RESET BOARD
const btnReset = document.querySelector("#btn-reset-board");

// MODAL END GAME
const modal = document.querySelector("#modal");
const modalInner = document.querySelector("#modal-inner");
const modalTitle = document.querySelector("#modal-title");

// MODAL PLAYER
const modalPlayer = document.querySelector("#modal-player");
const modalInnerPlayer = document.querySelector("#modal-inner-player");
const modalTitlePlayer = document.querySelector("#modal-title-player");
const inputPlayer1 = document.querySelector("#input-player-1");
const inputPlayer2 = document.querySelector("#input-player-2");
const btnSubmitPlayer = document.querySelector("#btn-submit-player");
const playerTurn = document.querySelector("#player-turn");

// MODAL POINTER EVENTS CHECK
const modalCheck = document.querySelector("#modal-check");

// CHECKBOX SWITCH
const checkboxSwitch = document.querySelector("#checkbox-switch");

// ====== INISIALISASI DAN FUNGSI =====

// INISIALISASI VARIABLE VALUE INPUT DAN PLAYER
let valueInputPlayer1 = "";
let valueInputPlayer2 = "";

let playerX = {};
let playerO = {};

//  INISIALISASI WIN PATTERN UNTUK ARRAY BOARD MULAI DARI 0
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

// FACTORY FUNCTION PLAYER
const player = (name) => {
  const getName = () => name;
  return { getName };
};

// GAMEBOARD DALAM MODULE DAN INISIALISASI
const gameboard = (() => {
  const gameboardArray = ["", "", "", "", "", "", "", "", ""];
  return { gameboardArray };
})();

let gameboardArray = gameboard.gameboardArray;

// EVENT LISTENER SUBMIT PLAYER
btnSubmitPlayer.addEventListener("click", (e) => {
  e.preventDefault();
  valueInputPlayer1 = inputPlayer1.value;
  valueInputPlayer2 = inputPlayer2.value;

  if ((valueInputPlayer1 == "" || valueInputPlayer2 == "") && inputPlayer2.disabled == false) {
    alert("Please Fill Player 1 And Player 2 Name's😉");
    console.log(`btn submit : ${checkboxSwitch.checked}`);
  } else if (valueInputPlayer1 == "" && inputPlayer2.disabled == true) {
    alert("Please Fill Player 1 Name's😉");
  } else {
    createPlayer(valueInputPlayer1, valueInputPlayer2);
  }
});

// FUNGSI MEMBUAT PLAYER BERDASARKAN INPUTAN
const createPlayer = (player1, player2) => {
  playerX = player(player1);
  playerO = player(player2);

  playerTurn.innerHTML = `${playerX.getName()}'s turn ( X )`;

  closeModalPlayer();
};

// FUNGSI MEMBUAT DIV SESUAI ARRAY DAN DITAMBAH KE BOARD CONTAINER
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

// FUNGSI SETIAP KALI BOARD DI CHECK
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

// FUNGSI GENERATE RANDOM NUMBER
const generateRandomNum = () => {
  return Math.floor(Math.random() * 9);
};

// FUNGSI CHECKBOARD SAAT MODE VS BOT
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

// FUNGSI CHECK WIN DENGAN CHECK THREE IN ROW TERLEBIH DAHULU
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

// FUNGSI CHECK ARRAY FULL DIGUNAKAN SAAT CHECK TIE
checkArrayFull = (gameboardArray) => {
  let isFull = true;
  gameboardArray.forEach((element) => {
    if (element == "") {
      isFull = false;
    }
  });

  return isFull;
};

// FUNGSI CHECK TIE DENGAN MEMANFAATKAN FUNGSI CHECKFULL
const checkTie = (gameboardArray) => {
  if (checkArrayFull(gameboardArray) && playerTurn.innerHTML == `${playerO.getName()}'s turn ( O )`) {
    playerTurn.innerHTML = "FINISH!";
    modalTitle.innerHTML = `Tie!`;
    openModal();
  } else if (checkArrayFull(gameboardArray) && checkboxSwitch.checked == true && playerTurn.innerHTML == `<div> Bot's Turn <img class="w-6 inline-block" src="./assets/loading.gif" alt="loading" /></div>`) {
    playerTurn.innerHTML = "FINISH!";
    modalTitle.innerHTML = `Tie!`;
    openModal();
  }
};

// FUNGSI RESET BOARD SEPERTI AWAL, TIDAK TERLALU TERPAKAI KARENA SUDAH RELOAD
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

// EVENT LISTENER DI MODAL END GAME
btnReset.addEventListener("click", () => {
  location.reload();
});

// FUNGSI MENCARI ELEMENT UNTUK DITAMBAKAN ANIMASI SCALE
const findElement = (boardContainer, index) => {
  const arrayBoardContainer = boardContainer.children;

  for (const i of arrayBoardContainer) {
    if (i.id == index) {
      i.children[0].classList.add("scaleUp");
      i.classList.add("reset-hover");
    }
  }
};

// FUNGSI TUTUP MODAL ENDGAME
const closeModal = (gameboardArray) => {
  modalInner.classList.remove("scaleUp");
  modalInner.classList.add("scaleDown");
  modal.classList.toggle("pointer-events-none");
  modal.style.backgroundColor = "rgba(0,0,0,0)";

  resetBoard(gameboardArray);
};

// FUNGSI TUTUP MODAL PLAYER
const closeModalPlayer = () => {
  modalInnerPlayer.classList.remove("scaleUp");
  modalInnerPlayer.classList.add("scaleDown");
  modalPlayer.classList.toggle("pointer-events-none");
  modalPlayer.style.backgroundColor = "rgba(0,0,0,0)";
};

// FUNGSI BUKA MODAL ENDGAME
const openModal = () => {
  modalInner.classList.add("scaleUp");
  modalInner.classList.remove("scaleDown");
  modal.style.backgroundColor = "rgba(0,0,0,0.2)";
  modal.classList.remove("pointer-events-none");
};

// FUNGSI BUKA MODAL PLAYER
const openModalPlayer = () => {
  modalInnerPlayer.classList.add("scaleUp");
  modalInnerPlayer.classList.remove("scaleDown");
  modalPlayer.style.backgroundColor = "rgba(0,0,0,0.2)";
  modalPlayer.classList.toggle("pointer-events-none");
};

// FUNGSI SAAT AREA DILUAR MODAL ENDGAME DI TEKAN MODAL AKAN TERTUTUP
// modal.addEventListener("click", (e) => {
//   if (!e.target.closest("#modal-inner")) {
//     closeModal(gameboardArray);
//   }
// });

// FUNGSI UNTUK MENAMBAH ANIMASI TOGGLE SWITCH
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

// FUNGSI UNTUK MENAMBAH ANIMASI TOGGLE SWITCH
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

openModalPlayer();
// checkTie(gameboardArray);
appendBoardContainer(boardContainer, gameboardArray);
