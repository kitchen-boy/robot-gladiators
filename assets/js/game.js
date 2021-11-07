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
                playerMoney = Math.max(0, playerMoney - 10);
                console.log(playerName, "playerMoney", playerMoney);
                window.alert("Penalty = -10 Money. " + playerName + " now has " + playerMoney + " money points.");
                break;
            }
        }
        // ** generate RANDOM damage value based on player's Attack power
        var damage = randomNumber(playerAttack - 3, playerAttack);

        enemyHealth = Math.max(0, enemyHealth - damage);

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
            
            //leave while() loop since enemy is dead  
            break;
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        // ** generate RANDOM damage value based on enemy robot's Attack power
        var damage = randomNumber(enemyAttack - 3, enemyAttack);

        playerHealth = Math.max(0, playerHealth - damage);

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
    playerHealth = 50;
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

            // *** random NUMBER reset enemy-robot's HEALTH before starting new fight ***
            enemyHealth = randomNumber(40, 60);

            // use debugger to pause script from running & check what's going on at that moment in the code.
            //debugger;

            //call fight function with new enemy-robot
            /* pass the pickedEnemyName variable's value into the fight function, 
            where it will assume the value of the enemyName parameter */
            fight(pickedEnemyName);

            //  if player is still alive & we're not at the last enemy in the array
            if (playerHealth > 0 && i < enemyNames.length - 1) {
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
            window.alert("You have lost your robot " + playerName + " in battle! Game Over!");
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
    if (playerHealth >0) {
        window.alert ("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
    }
    else {
        window.alert ("You've lost your robot in battle.");
    }
    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        //restart the game.
        startGame();
    }
    else {
    window.alert("Thank you for playing Robot Gladiators Come back soon!");
    }
};

var shop = function() {
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt (
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    //use switch to carry out action
    switch (shopOptionPrompt) {
        case "REFILL": // new case
        case "refill":
            if (playerMoney >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");

            // increase health and decrease money
            playerHealth = playerHealth + 20; 
            playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money!");
            } 
            break;

        case "UPGRADE": // new case    
        case "upgrade":
            if (playerMoney >= 8) {
            window.alert("Upgrading player's attack by 7 for 8 dollars.");

            // increase attack and decrease money
            playerAttack = playerAttack + 7;
            playerMoney = playerMoney - 8;
            }
            else {
                window.alert("You don't have enough money!");
            }
            break;

        case "LEAVE": // new case    
        case "leave":
            window.alert("Leaving the store)");
            
            // do nothing, so function will end
            break;
        
        default:
            window.alert("You did not pick a valid option. Try again.");

            // call shop() again to force player to pick a valid option
            shop();
            break;   
    }
};

//function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * 21) + 40;

    return value;
};

// start first game when page loads
startGame();