## NEON-LIGHT

### Intro
This is a comic relief character for myself. I don't have to do it. But, since i have to make a project for my JavaScript / HTML / CSS class and I HATE ALL THOSE 3... I thought it could be fun to document my descent to madness.
The basic idea is to create a sort of mini-game, where you click to get more stuff, unlock other stuff that you can then click as well, all until you click on the last clicky thing and win the same. Simple enough. I wish i could do this on Python...

#### Day 1:
Due to the simplicity of the project, I decided not to follow any specific design pattern (I considered a STATE design but ultimately discarded the idea) and to just write code and refactor when necessary.

I decided to create the functionalities first and worry about the design later. 

Creation of the Alchemy button. For that, I had to also create the Currency resource (just a variable).

* Create a ‘p’ element with a numeric value.
* Create a button.
* Increase the value of the ‘p’ when clicking the button using a setTimeout.
* Use setTimeout with time = (0.25 * coins * 1000) to create the “wait” based on the amount of coins.

Interestingly, I noted the difference between textContent and innerText for retrieving the text of a tag. I decided to use innerText to make future work easier.

#### Day 2:
I decided to change the setting of the project from the predefined (dark victorian), to cyberpunk.

* Building → Building
    * Alchemy → Transmute
    * Cabin → Netrunner Den
    * Farm → Data Farm
    * Market → Black Market
    * Stables → Chrome Clinic
    * Mill → Soul Killer
    * Tavern → Construct

* Resources → Resources
    * Coin → eddie (eurodollar)
    * Stone → subroutines
    * Wood → daemons
    * Workers → Netrunners
    * Wheat → data
    * Leather → rare material
    * Horse → implant
    * Bread → Engram

<table>
    <thead>
        <tr>
            <th>Building</th>
            <th>Cost</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Container</td>
            <td>eddies x2</td>
            <td>When built, it unlocks the Work button and the Resources marker. Enables the Netrunner Den, Data Farm, and Black Market.</td>
        </tr>
        <tr>
            <td>Netrunner Den</td>
            <td>eddies x6</td>
            <td>Multiple can be created. Each generates 5 netrunners. Its cost increases by 5 eddies and 5 subroutines each time one is purchased.</td>
        </tr>
        <tr>
            <td>Data Farm</td>
            <td>eddies x8, subroutines x9, daemons x5</td>
            <td>Generates 1 data every 20 seconds. Enables the Chrome Clinic.</td>
        </tr>
        <tr>
            <td>Black Market</td>
            <td>subroutines x8, daemons x9</td>
            <td>Enables the Black Market button: opens the Black Market panel.</td>
        </tr>
        <tr>
            <td>Chrome Clinic</td>
            <td>eddies x8, daemons x10, data x5</td>
            <td>Enables the Soul Killer. Allows creating implants for 2 rare materials and 5 data.</td>
        </tr>
        <tr>
            <td>Soul Killer</td>
            <td>eddies x5, subroutines x8, implant x3</td>
            <td>Enables Construct. Allows transforming 2 data into an engram.</td>
        </tr>
        <tr>
            <td>Construct</td>
            <td>eddies x10, daemons x7, subroutines x9, implants x3, engram x10</td>
            <td>You win the game.</td>
        </tr>
    </tbody>
</table>

<table>
    <thead>
        <tr>
            <th>Resource</th>
            <th>Explanation</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>eddie</td>
            <td>You get one unit each time you press the Transmute button.</td>
        </tr>
        <tr>
            <td>subroutine</td>
            <td>You get X units when you press the Work button, where X is a random value between 0 and the number of netrunners + 2.</td>
        </tr>
        <tr>
            <td>daemon</td>
            <td>You get X units when you press the Work button, where X is a random value between 0 and the number of netrunners + 2.</td>
        </tr>
        <tr>
            <td>netrunner</td>
            <td>You get 5 units each time you build a Netrunner Den.</td>
        </tr>
        <tr>
            <td>data</td>
            <td>Automatically generated every 25 seconds when you build the Data Farm.</td>
        </tr>
        <tr>
            <td>rare material</td>
            <td>You obtain one unit in the market in exchange for 3 eddies.</td>
        </tr>
        <tr>
            <td>implant</td>
            <td>One unit is produced after pressing the Create button and paying 2 rare materials and 10 data.</td>
        </tr>
        <tr>
            <td>engram</td>
            <td>You obtain one unit by exchanging 2 wheat in the Soul Killer.</td>
        </tr>
    </tbody>
</table>

Creation of constants to avoid hardcoding. Creation of functions:
* create_buildings_container: creates the dropdown for buildings (should create separate document)

#### Day 3:
Today I decided to start from scratch and use canvas to avoid Satan (CSS). I will be keeping the same theme. Also i can reuse some code (i hope).
I also decided that, because of the nature of this mini game, this is not OK, so I reverted back to using normal JS, HTML and CSS. ~~I hate this so much you have no idea.~~
I have segmented my work into smaller tasks to try and make the progress smoother:
1. Initial Project Setup
- [x]Create the base structure of the project in JavaScript, HTML, and CSS.
- [x]Configure a state management system to store player data (eddies, resources, buildings, etc.).
- [x]Create a basic interface for the main game panel.
2. Basic Functionality of the "Transmute" Button
- [x] Implement a "Transmute" button on the main panel.
- [x] Program the generation of eddies when the button is clicked, considering the dynamic time calculation based on the number of eddies (0.25 sec × number of eddies).
- [x] Display an updated eddie counter on the interface.
3. Unlocking the "Buildings" Button
- [x] Implement the logic to unlock the "Buildings" button after obtaining 2 eddies.
- [] Create a new panel displaying the available buildings.
- [] Initially, show only the "Warehouse" building in the panel.
4. Building Construction
- [] Implement the logic to construct the "Warehouse" in exchange for 2 eddies:
- [] Unlock the "Collect" button.
- [] Enable the visualization of resources (daemons, subroutines).
- [] Add the "Netrunner Den," "Data Farm," and "Black Market" buildings to the panel.
- [] Create functionality for constructing each building:
- [] Netrunner Den: Add 5 netrunners per den and increase the cost progressively (5 eddies and 5 subroutines for each additional den).
- [] Data Farm: Automatically generate 1 unit of data every 25 seconds.
- [] Black Market: Create a new panel allowing the player to purchase resources (rare material, subroutines, daemons).
5. "Collect" Button Functionality
- [] Program the "Collect" button to generate a random amount of daemons and subroutines (between 0 and the number of netrunners + 2).
- [] Implement a cooldown timer of 45 seconds minus the number of netrunners.
- [] Display updates of the collected resources in the resource counter.
6. Advanced Building Logic
- [] Implement the construction of Chrome Clinic:
- [] Allow the player to create implants in exchange for 2 rare materials and 5 data.
- [] Unlock the construction of the "Soul Killer."
- [] Implement the construction of the Soul Killer:
- [] Allow the player to transform 2 units of data into 1 engram if at least 10 netrunners are available.
- [] Add the option to sell engrams for 15 eddies in the black market.
- [] Unlock the construction of the "Construct."
- [] Implement the construction of the Construct:
- [] Set the win condition when the Construct is built.
7. Resource and Market Management
- [] Implement the market functionality for purchasing resources:
- [] Validate if the player has enough eddies to make a purchase.
- [] Update the player's resources and eddies after each transaction.
- [] Display the updated state of resources (daemons, subroutines, rare materials, etc.) in the resource counter.
8. User Interface (UI) and Design
- [] Create a cyberpunk-themed design:
- [] Main panel.
- [] Stylized buttons with names aligned to the theme.
- [] Screen and fonts with a neon, glitchy, and futuristic aesthetic.
- [] Animate buttons and panels to enhance the player's experience.