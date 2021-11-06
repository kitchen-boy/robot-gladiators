// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less
// Display player's score in an alert & ask player if they want to play again.
// After player defeats or skips an enemy-robot, player is asked if they want to visit the shop. 


var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// You can also log multiple values at once like this
console.log(playerName, playerAttack, playerHealth, playerMoney);
// enemyNames array
var enemyNames = ["Roborto", "Amy Android", "Robo Trumble", "I-Robot"];
var enemyHealth = 50;
var enemyAttack = 12;
console.log(enemyNames, enemyHealth);

//fight function
var fight = function(enemyName) {
    window.alert(enemyName + " is starting with " + enemyHealth + " health points. Can you beat this robot?");
    window.alert(playerName + " currently has " + playerHealth + " health points.");
    //repeat & execute as long as the player & enemy-robot is alive
    while(playerHealth > 0 && enemyHealth > 0) {
        // ask player if they'd like to fight or run    
        var promptFight = window.prompt ("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'Skip' to choose.");
        
        // if player chooses to skip, confirm & then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP" || promptFight === "Skip") {
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you would like to quit?");

            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + " has chosen to skip the fight. Goodbye!");
                // subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log(playerName, "playerMoney", playerMoney);
                window.alert("Penalty = 10 Money. " + playerName + " now has " + playerMoney + " money points.");
                break;
            }
        }
        // remove enemy's health by substracting the amount set in the playerAttack variable
        enemyHealth = enemyHealth - playerAttack;

        // Log a resulting message to the console so we know that it worked.
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );

        //check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
            window.alert(playerName + " has defeated " + enemyName +"!");
            // award player money for winning
            playerMoney = playerMoney + 20;
            window.alert(playerName + " won 20 money points!");
            window.alert(playerName + " now has " + playerMoney + " money points!");
            
            //leave while() loop since enemy is dead  
            break;
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        // Subtract the value of "enemyAttack" from the value of "playerHealth"
        playerHealth = playerHealth - enemyAttack;

        //Log a resulting message to the console so we know that it worked.
        console.log (
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
        );

        //check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            break;
        } else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }  
    }
};

// function to start a new game
var startGame = function() {
    // reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    // other logic remains the same...
    for (var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0){
            //let player know what round they are in; arrays start at 0 so iterator + 1 = round number
            window.alert("WELCOME TO ROBOT GLADIATORS! Round " + (i + 1));
    
            //Assign element in enemy-robot array to store current enemy-robot
            // New enemy is chosen to fight based on index of enemyNames array
            var pickedEnemyName = enemyNames[i];
            // Reset enemy-robot's health before starting new fight
            enemyHealth = 50;

            // use debugger to pause script from running & check what's going on at that moment in the code.
            //debugger;

            //call fight function with new enemy-robot
            /* pass the pickedEnemyName variable's value into the fight function, 
            where it will assume the value of the enemyName parameter */
            fight(pickedEnemyName);  
        } 
        // if player isn't alive, stop the game
        else {
            window.alert("You have lost your robot " + playerName + " in battle! Game Over!");
        break;
        }
    }
    // play again
    startGame(); 
    //debugger;
};
startGame();