# Alien-Thief
The Alien Thief game is an engaging browser-based arcade game where players control an alien character attempting to dodge arrows for as long as possible while collecting coins and utilizing potions for temporary shields. Developed using HTML5, CSS, and JavaScript, the game offers a simple yet challenging gameplay experience.

## Key Features:
1. Player Controls and Movement:
    - Players navigate the alien character using keyboard controls, moving horizontally to avoid incoming arrows.

2. Game Mechanics:
    - Arrows continuously rain down from the top of the screen, increasing in frequency as the game progresses.
    - Coins appear sporadically, which players can collect to increase their score.
    - Potions periodically spawn, providing the alien with a shield that grants temporary invulnerability against arrows.

3. Scoring System:
    - Players accumulate points by surviving for longer periods and collecting coins.
    - The challenge escalates dynamically as arrows become more frequent, testing the player's reflexes and evasion skills.

4. User Interface and Scenes:
    - Start Scene (StartScene.js): Displays the game title and controls, allowing players to initiate gameplay.
    - Game Scene (GameScene.js): Renders the gameplay environment where the alien moves and interacts with arrows, coins, and potions.
    - HTML Structure (index.html): Provides the foundational structure for embedding the game within a web browser.

5. Code Structure and Functionality:
    - game.js: Contains the main game loop and logic for spawning arrows, coins, and potions, as well as handling collisions and scoring.
    - The JavaScript files (game.js, StartScene.js, GameScene.js) collectively manage game state transitions, player interactions, and graphical rendering using HTML5 Canvas.

## Technologies Used:
HTML5, CSS: Provides the structural and stylistic components of the game interface.

JavaScript: Implements the game's interactive elements, including player movement, object spawning, and game mechanics.
