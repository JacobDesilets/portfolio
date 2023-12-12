let modal_element = document.getElementById("modal");
let modal_close_element = document.getElementsByClassName("close")[0];
let modal_img_element = document.getElementById("modal-img");
let modal_txt_element = document.getElementById("modal-txt");
let modal_src_element = document.getElementById("modal-src");

let imgSources = [
    'media/DA200_Project1_JacobDesilets.jpg',   // 0
    'media/DA322_final1.png',                   // 1
    'media/164.jpg',                            // 2
    'media/da300_project1.png',                 // 3
    'media/DA250_Project1.png',                 // 4
    'media/da200_a2.jpg',                       // 5
    'media/DA322_humanfigure.png',              // 6
    'media/DA140_Final.png',                    // 7
    'media/DA200_final.png',                    // 8
    'media/DA140_Group_Project.png',            // 9
    'media/DA250_Project2.png',                 // 10
    'media/COMM329_Final.png',                  // 11
    'media/COMM329_Game.png',                   // 12
    'media/DA322_final2.png',                   // 13
];

let modalDescriptions = [
    'Made using Autodesk Maya and Substance Painter',
    'Made using a camera borrowed from the school and Photoshop. This was one out of three images submitted for my Photography final',
    'Made using my cell phone camera and Photoshop',
    'Made using Autodesk Maya and Substance Painter',
    'Made using the p5.js Javascript library on CodePen. View on CodePen <a href="https://codepen.io/Jacob-Desilets/full/XWoeRPz">here</a>',
    'Made using Autodesk Maya',
    'Made using my cell phone camera and Photoshop. This is an image of my friend Stephen',
    'Made using Unity and Blender. This is a partial implementation of the board game Carcassone. See a short video demo <a href="https://drive.google.com/file/d/1PRlD-kMIEVPMYfQokL2Vw45_uL-axsw1/view?usp=sharing">here</a>. View the source code <a href="https://github.com/JacobDesilets/DA140-Final">here</a>',
    'Made using Autodesk Maya and Substance Painter. This was a group project with Logan Sisson. View the video <a href="https://drive.google.com/file/d/1eEPQb1RylPsJZ7bQCzSgjpJ9CTJvt7HK/view?usp=drive_link">here</a>',
    'Made using Processing. This was a group project with Matt Duver. We created a simple, 2-player fighting game. See a short video demo <a href="https://drive.google.com/file/d/1qS_roLpqlCjN_nStF8Ucd_Zv_SVoPj7i/view?usp=sharing">here</a>. View the source code <a href="https://github.com/JacobDesilets/DA140-Group-Project">here</a>',
    'Made using Made using the p5.js Javascript library and WebGL on CodePen. View on CodePen <a href="https://codepen.io/Jacob-Desilets/full/ZEVdLEm">here</a>',
    'Made using HTML, CSS, and Javascript. This project was both a portfolio for my Digital Arts minor and the final project for Front-end Web Design. View the source code <a href="https://github.com/JacobDesilets/portfolio">here</a>',
    'Made using HTML, CSS, and Javascript. This project is a simple Rock Paper Scissors game that the user can play against the computer. Visit the website <a href="https://jacobdesilets.com/rps/">here</a>. View the source code <a href="https://github.com/JacobDesilets/rps">here</a>',
    'Made using a camera borrowed from the school and Photoshop. This was one out of three images submitted for my Photography final'
]

function showModal(idx) {
    modal_element.style.display = "block";
    modal_img_element.src = imgSources[idx];
    modal_txt_element.innerHTML = modalDescriptions[idx];
    modal_src_element.href = imgSources[idx];
}

modal_close_element.onclick = function() {
    modal_element.style.display = "none";
}

