var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// You can also log multiple values at once like this
console.log(playerName, playerAttack, playerHealth, playerMoney);

var enemyName = "Roborto"
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function() {
    //Alert players that they are starting the round
    window.alert("Welcome to Robot Gladiators");

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
    }
    else {
        window.alert(enemyName + " still has " + enemyHealth + " health left.");
    }

    // remove player's Health' by subtracting the amount set in the enemyAttack variable 
    playerHealth = playerHealth - enemyAttack;

    //Log a resulting message to the console so we know that it worked.
    console.log (
        enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaning."
    );

    //check player's health
    if (playerHealth <= 0) {
        window.alert(playerName + " has died!");
    }
    else {
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
    }
    // if no (false), ask question again by running fight() again
else {
    //execute function
    fight();
    }
}
 // if player did not chose 1 or 2 in prompt
else {
    window.alert("You need to pick a valid option. Try again!");
  }
};

// run fight function to start game
fight();
