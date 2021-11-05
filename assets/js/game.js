// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 20;
var playerAttack = 5;
var playerMoney = 10;

// You can also log multiple values at once like this
console.log(playerName, playerAttack, playerHealth, playerMoney);
// enemyNames array
var enemyNames = ["Roborto", "Amy Android", "Robo Trumble", "I-Robot"];
var enemyHealth = 10;
var enemyAttack = 6;
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
            window.alert(playerName + " has won " + playerMoney + " money points!");
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

// run fight function call (replaced with a <for> loop) to start game
// <for> loop calls fight function multiple times using the element in the enemyNames[i] array as the argument
for(var i = 0; i < enemyNames.length; i++) {
    //Assign element in enemy-robot array to store current enemy-robot
    var pickedEnemyName = enemyNames[i];
    // Reset enemy-robot's health
    enemyHealth = 10;
    //call fight function with enemy-robot
    fight(pickedEnemyName);
}
