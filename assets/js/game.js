// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less
// Display player's score in an alert & ask player if they want to play again.
// After player defeats or skips an enemy-robot, player is asked if they want to visit the shop. 

// **Using RECURSIVE function to prompt user will rectify blank or null response

//function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * 21) + 40;

    return value;
};

// function to check if player wants to fight or skip
var fightOrSkip = function() {
    // ask player if they'd like to fight or skip using fightOrSkip function
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  
    // Conditional Recursive Function Call to validate prompt answer
    if (promptFight === "" || promptFight === null) {
        window.alert ("You need to provide a valid answer! Please try again.");
        //use return to call it again and stop the rest of this function from running
        return fightOrSkip();
    }

    // convert promptFight to all lowercase so we can check with less options
    promptFight = promptFight.toLowerCase();
    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
        // subtract money from playerMoney for skipping, but don't let them go into the negative
        playerInfo.money = Math.max(0, playerInfo.money - 10);
        window.alert("Penalty = -10 Money. " + playerInfo.name + " now has " + playerInfo.money + " money points.");
        // *** stop while() loop using break; and enter next fight ***

        //return true if player wants to leave
        return true;
      }
    }
    return false;
};

//fight function
var fight = function(enemy) {
    window.alert(enemy.name + " is starting with " + enemy.health + " health points. Can you beat this robot?");
    window.alert(playerInfo.name + " currently has " + playerInfo.health + " health points.");
    // keep track of who goes first: player or enemy robot
    var isPlayerTurn = true;

    // randomly change turn order
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }

    //repeat & execute as long as the player & enemy-robot is alive
    while(playerInfo.health > 0 && enemy.health > 0) {
        if (isPlayerTurn) {
            window.alert("It's " + playerInfo.name + "'s turn!");
            // ask player if they'd like to fight or skip, using fightOrSkip function
            if (fightOrSkip()) {
                // if true, leave fight by breaking loop
                break;
            }
        
            // ** generate RANDOM damage value based on player's Attack power
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            // remove enemy's health by subtracting the amount we set in the damage variable
            enemy.health = Math.max(0, enemy.health - damage);

            // Log a resulting message to the console so we know that it worked.
            console.log(
                playerInfo.name + 
                " attacked " + 
                enemy.name + 
                ". " + 
                enemy.name + 
                " now has " + 
                enemy.health + 
                " health remaining."
            );

            //check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");
                window.alert(playerInfo.name + " has defeated " + enemy.name +"!");

                // award player money for winning
                playerInfo.money = playerInfo.money + 20;
                window.alert(playerInfo.name + " won 20 money points!");
            
            //leave while() loop since enemy is dead  
            break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
            // player gets attacked first
        } else {   
            // ** generate RANDOM damage value based on enemy robot's Attack power
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
            window.alert("It's " + enemy.name + "'s turn! Attack!");

            // remove player's health by subtracting the amount we set in the damage variable
            playerInfo.health = Math.max(0, playerInfo.health - damage);

            //Log a resulting message to the console so we know that it worked.
            console.log (
            enemy.name + 
            " attacked " + 
            playerInfo.name + 
            ". " + 
            playerInfo.name + 
            " now has " + 
            playerInfo.health + 
            " health remaining."
            );

            //check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                // leave while() loop if player is dead
                break;
            } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }  
        }
        // Switch turn order for next round, using "!" = NOT operator
        isPlayerTurn = !isPlayerTurn;
    }
};

// function to start a new game
var startGame = function() {
    // reset player stats, using playerInfo object method, playerInfo.reset()
    playerInfo.reset();

    // other logic remains the same...
    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0){
            //let player know what round they are in; arrays start at 0 so iterator + 1 = round number
            window.alert("WELCOME TO ROBOT GLADIATORS! Round " + (i + 1));
    
            //Assign element in enemy-robot array to store current enemy-robot
            // New enemy is chosen to fight based on index of enemy.names array
            var pickedEnemyObj = enemyInfo[i];

            // *** random NUMBER reset enemy-robot's HEALTH before starting new fight ***
            pickedEnemyObj.health = randomNumber(40, 60);

            // use debugger to pause script from running & check what's going on at that moment in the code.
            //debugger;

            //call fight function with new enemy-robot
            /* pass the pickedEnemyObject's value into the fight function, 
            where it will assume the value of the enemy.name parameter */
            fight(pickedEnemyObj);

            //  if player is still alive & we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                // ask if player wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
                
                // if yes, take them to the store() function
                if (storeConfirm) {
                    shop();
                }
            }
        } 
        // if player isn't alive, stop the game
        else {
            window.alert("You have lost your robot " + playerInfo.name + " in battle! Game Over!");
        break;
        }
    }
    /* after loop ends, player is either out of health or enemies to fight
    so run endGame function */
    endGame(); 
    //debugger;
};

// function to end the entire game
var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");

    //if player is still alive, player wins!
    if (playerInfo.health >0) {
        window.alert ("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else {
        window.alert ("You've lost your robot in battle.");
    }

    // check localStorage for high score, if it's not there, use 0
    var highScore = localStorage.getItem("highscore");
    if (highScore === null) {
        highScore = 0;
    }
    // if player has more money than the high score, player has new high score!
    if (playerInfo.money > highScore) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);
        alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
    }
    else {
        alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
    }

    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        //restart the game.
        startGame();
    }
    else {
    window.alert("Thank you for playing Robot Gladiators. Come back soon!");
    }
};

var shop = function() {
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt (
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
    );
    //JS function that converts strings to integers
    shopOptionPrompt = parseInt(shopOptionPrompt);
    //use switch to carry out action
    switch (shopOptionPrompt) {
        case 1: // new case statements to only accept integers
            playerInfo.refillHealth();
            break;

        case 2:   
            playerInfo.upgradeAttack();
            break;

        case 3:
            window.alert("Leaving the store.");
            // do nothing, so function will end
            break;
        
        default:
            window.alert("You did not pick a valid option. Try again.");

            // call shop() again to force player to pick a valid option
            shop();
            break;   
    }
};

// function to set name
var getPlayerName = function() {
    var name = "";
    // ** ADD LOOP HERE WITH PROMPT & CONDITION
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }
    console.log ("Your robot's name is " + name);
    return name;
};
/* GAME INFORMATION / VARIABLES = CUSTOM OBJECTS */
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10, 
    money: 10, 
    reset: function() {
        this.health = 100;
        this.money = 10; 
        this.attack = 10;
    }, // comma! in object properties (NOT semi-colon)
    // can also write conditional logic in object methods! e.g. if statements & alert() calls
    refillHealth: function() {
        if (this.money >=7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            // increase health and decrease money
            this.health +=20;
            this.money -=7;
        }
        else {
            window.alert("You don't have enough money!");
        }  
    }, //comma!
    upgradeAttack: function() {
        if (this.money >=7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            // increase attack and decrease money
            this.attack +=6;
            this.money -=7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
};

// enemy.names array
var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14) 
    }, 
    {
        name: "Amy Android", 
        attack: randomNumber(10, 14) 
    },
    {
        name: "Robo Trumble", 
        attack: randomNumber(10, 14) 
    }, 
    {
        name: "I-Robot", 
        attack: randomNumber(10, 14) 
    } 
];
// start first game when page loads
startGame();