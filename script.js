
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
    title: "Location: Kitchen",
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
        },
        nextScene: "Kitchen"
      },
      {
        text: "Move into State Dining Room",
        nextScene: "State Dining Room"
      },
      {
          text: "Move Out to Rose Garden",
          nextScene: "RoseGarden"
      }
    ]
  },

  RoseGarden: {
    title: "Location: Rose Garden",
    character: "",
    text: "You move and see an outdoor exploration area: paths, flowers, trees, and views of the White House; There is a secret tunnel pathway on west side of garden allowing for evacuation, only open when mission completed. One guard roams around the garden.",
    choices: [
      {
        text: "Search Rose Garden(10 min)(10%)",
        action: function () {
          updateTime(-10);
          updateSuspicion(10);
          text: "You find nothing of interest, but the guard is now suspicious of you.";
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
          updateTime(-5);
          updateSuspicion(15);
        },
        nextScene: "RoseGarden"
      },
       {
        text: "Move Back to Kitchen",
        nextScene: "Kitchen"
      },
      {
        text: "Search guard (5 min)",
        action: function () {
          updateTime(-5);
          pickUpItem("Gun");
        },
        nextScene: "RoseGarden"
      }
      //Later add evac through tunnel part
    ]
  },

  hallway: {
    title: "The Hallway",
    text: "The hallway is dark and silent.",
    choices: [
      {
        text: "backyard",
        nextScene: "lockedDoor"
      }
    ]
  },

   lockedDoor: {
    title: "The Locked Door",
    text: "The door handle doesn't move.",
    choices: [
      {
        text: "Try to open it",
        action: unlockDoor
      },
      {
        text: "Go back",
        nextScene: "backyard"
      }
    ]
  },

   solution: {
    title: "The solution",
    text: "You solved the mystery!",
    
  }
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
function unlockDoor() {
  if (inventory.includes("brass key")) {
    updateScene("solution");
  } else {
    messageDisplay.textContent = "The door is locked.";
  }
}

