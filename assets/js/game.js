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
    //repeat & execute as long as the player & enemy-robot is alive
    while(playerHealth > 0 && enemyHealth > 0) {
        // ask player if they'd like to fight or run    
        var promptFight = window.prompt ("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'Skip' to choose.");

        // if player chooses to fight, then fight! 
        if (promptFight === "fight" || promptFight ==="FIGHT" || promptFight === "Fight") {
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

            // if player chooses to skip
        } else if (promptFight === "skip" || promptFight == "SKIP") {
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you would like to quit?");

            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + " has chosen to skip the fight. Goodbye!");
                // subtract money from playerMoney for skipping
                playerMoney = playerMoney - 2;
                console.log(playerName, playerHealth, playerMoney);
            }
            // if no (false), ask question again by running fight() again
            else {
                fight();
            }

            // if player did not chose 1 or 2 in prompt
        } else {
            window.alert("You need to pick a valid option. Try again!");
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
