
// --------------------------------------------------
// SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add fields for each scene, as relevant, to match your mockup
// 2) customize the scenes to fit your story
// 3) add any new fields to the function below
// --------------------------------------------------

// First, we create a variable for the current scene being displayed
let currentScene = "Kitchen";

// Then, we create an object that stores the data for each scene,
const scenes = {
  // See "backyard" for the first example
  Kitchen: {
    title: "Kitchen",
    character: "",
    text: "You look around and see classic kitchen tools, fryer, oven, countertop, walk-in freezer, door opening out back to courtyard area for delivery trucks to arrive. Around you are also 3 other chefs preparing their parts of the dish.",
    // you can choose how many choices to include
    // each choice can have text, an action, and/or nextScene
    choices: [
      {
        text: "Search Kitchen (5 min)",
        action: function () {
          updateTime(-5);
          pickUpItem("Knife");
          if (time <= 0 || Suspicion >= 100) {
            updateScene("Ending3");
          
          }
        },
      },
      {
        text: "Move into State Dining Room",
        nextScene: "StateDiningRoom"
      },
      {
          text: "Move Out to Rose Garden",
          nextScene: "RoseGarden"
      },
      {
        text: "Poison presidents food(need jarrin root poision)",
        action: function () {
          if (inventory.includes("jarrin root poison") && inventory.includes("+Presidential Documents") && inventory.includes("+incriminating documents") && inventory.includes("+disable electricity") && inventory.includes("+Hurt Negotiations")) {
            updateScene("Ending4");
          }
          else if (inventory.includes("jarrin root poison")) {
            updateScene("Ending1");
          }
          else {
            document.getElementById("message-display").textContent = "You need the jarrin root poision to poison the presidents food.";
          }
        },
    }
    ]
  },

  RoseGarden: {
    title: "Rose Garden",
    character: "",
    text: "You move and see an outdoor exploration area: paths, flowers, trees, and views of the White House;  One guard roams around the garden.",
    choices: [
      {
        text: "Search Rose Garden(10 min)(10%)",
        action: function () {
          updateTime(-10);
          updateSuspicion(10);
          document.getElementById("message-display").textContent = "You find nothing of interest.";
          if (time <= 0 || Suspicion >= 100) {
            updateScene("Ending3");
          
          }
        },
        nextScene: "RoseGarden"
      },
         {
        text: "Move to East Room",
        nextScene: "EastRoom"
      },
      {
        text: "Kill the guard(need knife)(15%)(5 min)",
        action: function () {
        if (inventory.includes("Knife")) {  
          updateTime(-5);
          updateSuspicion(15);
          pickUpItem("Gun");
        }
        else {
          document.getElementById("message-display").textContent = "You need a knife to kill the guard.";
        }
        if (time <= 0 || Suspicion >= 100) {
            updateScene("Ending3");
          
          }
      },
    },
       {
        text: "Move Back to Kitchen",
        nextScene: "Kitchen"
      },
    ]
  },

  StateDiningRoom: {
    title: "The State Dining Room",
    text: "You move in and see a Large dining table and formal decorations, many seats, door connecting to kitchen area, allowing entrance of new courses and meals, grand carpet and flags around the room. No guards in the room.",
    choices: [
      {
        text: "Move to East Room",
        nextScene: "EastRoom"
      },
      {
        text: "Move to Oval Office",
        nextScene: "OvalOffice"
      },
      {
        text: "Move back to kitchen",
        nextScene: "Kitchen"
      }
    ]
  },

   EastRoom: {
    title: "East Room",
    text: "Large formal room, set up with a grand circular wooden table, seats on the edges of the table and many delegates bearing the flags of the US and China sitting around the table discussing, benches on the sides of the room with stenographers. Two Guards rotating around.",
    choices: [
      {
        text: "Sabotage peace talks(30%)",
        action: function () {
          updateSuspicion(30);
          pickUpItem("+Hurt Negotiations");
          if (time <= 0 || Suspicion >= 100) {
            updateScene("Ending3");
          
          }
        },
      },
      {
        text: "Move to Electrical room",
        nextScene: "Electricalroom"
      },
      {
        text: "Move to White House Basement",
        nextScene: "WhiteHouseBasement"
      },
      {
        text: "Move to Rose Garden",
        nextScene: "RoseGarden"
      },
      {
        text: "Assassinate the President(only with gun)(100%)",
        action: function () {
        if (inventory.includes("Gun")) {  
          updateSuspicion(100); 
        }
        else{
          document.getElementById("message-display").textContent = "You need a gun to assassinate the president.";
        }
        if (Suspicion >= 100) {
          updateScene("Ending2");
        }
      },
    }

    ]
  },
  OvalOffice: {
    title: "Oval Office",
    text: "You see the president's office Desk, couches, fireplace, presidential decorations, Private documents, radio call button and pad, black safe with code numbers. No guards present, many security cameras.",
    choices: [
      {
        text: "Search(5 min)(15%)",
        action: function () {
          updateTime(-5);
          updateSuspicion(15);
          pickUpItem("+Presidential Documents");
          if (time <= 0 || Suspicion >= 100) {
            updateScene("Ending3");
          
          }
        },
      },
      {
        text: "Move to East Room ",
        nextScene: "EastRoom"
      },
      {
        text: " Move to White House Basement",
        nextScene: "WhiteHouseBasement"
      }
    ]
  },
  Electricalroom: {
    title: "Electrical Room",
    text: "You see tons of electrical equipment, circuit boards, breakers, monitor room, filled with 4 guards and security camera feeds, server computers, and data banks.",
    choices: [
      {
        text: "Sabotage electrical systems(30%) ",
        action: function () {
          updateSuspicion(30);
          pickUpItem("+disable electricity");
          if (time <= 0 || Suspicion >= 100) {
            updateScene("Ending3");
          
          }
        },
      },
      {
        text: "Move to East Room ",
        nextScene: "EastRoom"
      },
      {
        text: " Move to White House Basement",
        nextScene: "WhiteHouseBasement"
      }
    ]
  },
  WhiteHouseBasement: {
    title: "White House Basement",
    text: "You find storage rooms, utility areas, service corridors, and mysterious locked doors; dark, gloomy vibe with low lights and many guards; janitor's closet located down in this area.",
    choices: [
      {
        text: "Take the jarrin root poision from closet(5 min)",
        action: function () {
          updateTime(-5);
          pickUpItem("jarrin root poison");
          if (time <= 0 || Suspicion >= 100) {
            updateScene("Ending3");
          
          }
        },
      },
      {
        text: "Move Electrical room",
        nextScene: "Electricalroom"
      },
      {
        text: " Move Oval Office",
        nextScene: "OvalOffice"
      },
      {
        text: "Search(5 min)(20%)",
        action: function () {
          updateTime(-5);
          updateSuspicion(20);
          pickUpItem("+incriminating documents");
          if (time <= 0 || Suspicion >= 100) {
            updateScene("Ending3");
          
          }
        },
      },
    ]
  },



  Ending1: {
    title: "Mission successful",
    text: "You have successfully done your job; you have killed the president; our client is satisfied; the US is in panic; and you have gained your entrance as a member of our society. There will be a new mission soon. Congratulations.",
  },
  Ending2: {
    title: "Acceptable outcome",
    text: "You have killed the president but, you were caught and now are in a holding cell, captive of the CIA, who will soon question you and discover the society's secrets; you are executed by an assassin before you are questioned.",
  },
  Ending3: {
    title: "Mission Failed",
    text: "You have failed, disgracefully. You were caught and now are in a holding cell, captive of the CIA, who will soon question you and discover the society's secrets; you are executed by an assassin before you are questioned. ",
  },
  Ending4: {
    title: "Grand success",
    text: "Congratulations, you have successfully proven your worth to this society as an assassin and as a saboteur. You have killed the president and managed the collapse of key parts of the US infrastructure and funding. The client is pleased, and you have gained massive respect from the higher-ups in the society. Well done, soldier; a new mission is coming soon.",
  },
};

// --------------------------------------------------
// UPDATE SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add a new const variable for each new field you added above
// Make sure to match the ids used in your mock up with the fields 
// 2) set the .textContent of each variable to the corresponding field in the scene object
// Use sceneTitle as a model
// --------------------------------------------------

// First, we create variables to hold the references to the HTML elements
// Technically you could just use document.getElementById('id-name') 
// in the function itself, but that would be very wordy 
// and make the code harder to read
const sceneTitle = document.getElementById("scene-title");
const sceneText = document.getElementById("scene-text");
const choicesContainer = document.getElementById("choices-container");
const characterName = document.getElementById("character-name");

// Then, we create a function to update the scene,
function updateScene(sceneName) {

  //This update the variable currentScene with the new scene passed as a parameter
  currentScene = sceneName;

  //This accesses the scene object based on the scene name
  const scene = scenes[sceneName];

  // Here, for each html element, you change the textContent to match
  // the appropriate text from the scene object
  sceneTitle.textContent = scene.title;
  sceneText.textContent = scene.text;
  characterName.textContent = scene.character;

  // Clear the old buttons before creating new ones
  choicesContainer.innerHTML = "";

  // Loop through each choice in the scene, connecting an action and nextScene if included
  scene.choices.forEach(function (choice) {
    const button = document.createElement("button");

    button.textContent = choice.text;

    button.addEventListener("click", function () {
      if (choice.action) {
        choice.action();
      }

      if (choice.nextScene) {
        updateScene(choice.nextScene);
      }
    });

    choicesContainer.appendChild(button);
  });
}

// This updates the screen with the current scene
updateScene(currentScene);


// --------------------------------------------------
// TIME
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// Either customize the name from time to steps, stress, etc...
// OR
// create a copy of each step for each additional state you want to track throughout the game
// --------------------------------------------------

// Create a variable for time
let time = 30;
let Suspicion =0;
// Display current time
const timeDisplay = document.getElementById("time-display");
const SuspicionDisplay = document.getElementById("Suspicion-display");
// Create a function to update time
function updateTime(amount) {
  time += amount;
  timeDisplay.textContent = time;
}
function updateSuspicion(amount) {
  Suspicion += amount;
  SuspicionDisplay.textContent = Suspicion;
}
// This refreshes the time display
updateTime(0);
updateSuspicion(0);
// --------------------------------------------------
// INVENTORY
// Read through the comments below to see what this section does
//
// For now, you are probably leaving this section as is. 
// --------------------------------------------------

// Create a variable for inventory
let inventory = [];

// Display current inventory
const inventoryDisplay = document.querySelector("#inventory-display");
const messageDisplay = document.getElementById("message-display");

// Create a function to update inventory 
function pickUpItem(itemName) {
    // Add itemName to the inventory array
    // Show the updated inventory on the page
  inventory.push(itemName);
  inventoryDisplay.textContent = inventory.join(", ");
}

// --------------------------------------------------
// CONDITIONAL 
// Depending on how you want to implement the conditional logic, you may 
// simply adjust the names below or you may need to expand upon this section
// --------------------------------------------------

// Create a function that checks if the inventory contains one item and if so shows the win condition scene.
<<<<<<< HEAD
=======

>>>>>>> c982b7abf410dd4b8fe888af0f0340c0b0ae7505
