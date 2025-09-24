// -----------------------
// Initial Scores
// -----------------------
let userscore = 0;
let compscore = 0;

// -----------------------
// DOM References
// -----------------------
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userscores = document.querySelector("#user-score");
const compscores = document.querySelector("#comp-score");

// -----------------------
// Generate Computer Choice
// -----------------------
const gencompchoice = () => {
    let options = ["scissor", "rock", "paper"];
    const ranidx = Math.floor(Math.random() * 3);
    return options[ranidx];
};

// -----------------------
// Disable Game (after 10 points)
// -----------------------
const disableGame = () => {
    choices.forEach(choice => {
        choice.style.pointerEvents = "none"; // disables clicks
    });
};

// -----------------------
// Check Final Winner (when score reaches 10)
// -----------------------
const checkWinner = () => {
    if (userscore === 10) {
        msg.innerText = "🎉 Congratulations! You reached 10 points and WON the game! 🏆";
        msg.style.backgroundColor = "gold";
        disableGame();
    } else if (compscore === 10) {
        msg.innerText = "😢 Oh no! Computer reached 10 points first. You LOST the game.";
        msg.style.backgroundColor = "black";
        msg.style.color = "white";
        disableGame();
    }
};

// -----------------------
// If game is draw
// -----------------------
const drawgame = () => {
    console.log("game was draw");
    msg.innerText = "Game was draw.Play again.";
    msg.style.backgroundColor = "#081b31";
};

// -----------------------
// Show Winner after every round
// -----------------------
const showwinner = (userwin, userchoice, compchoice) => {
    if (userwin) {
        userscore++;
        userscores.innerText = userscore;
        console.log("you win!");
        msg.innerText = `you win! your ${userchoice} beats ${compchoice}.`;
        msg.style.backgroundColor = "green";
    } else {
        compscore++;
        compscores.innerText = compscore;
        console.log("you lose!");
        msg.innerText = `you lose!  ${compchoice} beats your ${userchoice}.`;
        msg.style.backgroundColor = "red";
    }
    checkWinner();
};

// -----------------------
// Play One Round (Main Game Logic)
// -----------------------
const playgame = (userchoice) => {
    console.log("userchoice = ", userchoice);

    // Step 1: Generate Computer choice
    const compchoice = gencompchoice();
    console.log("compchoice = ", compchoice);

    // Step 2: Compare and decide
    if (userchoice === compchoice) {
        drawgame();
    } else {
        let userwin = true;
        if (userchoice === "rock") {
            userwin = compchoice === "paper" ? false : true;
        } else if (userchoice === "paper") {
            userwin = compchoice === "scissor" ? false : true;
        } else {
            userwin = compchoice === "rock" ? false : true;
        }
        // Step 3: Show Result
        showwinner(userwin, userchoice, compchoice);
    }
};

// -----------------------
// Event Listener (User Clicks a Choice)
// -----------------------
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userchoice = choice.getAttribute("id"); // get user choice
        playgame(userchoice); // play one round
    });
});