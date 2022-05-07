/*
    Hints: 
    1. Attach click event handlers to all four of the 
       buttons (#default, #ocean, #desert, and #high-contrast).
    2. Modify the className property of the body tag 
       based on the button that was clicked.
*/

const changeClass = (cn) => {
    document.querySelector("body").className = cn;
};


document.querySelector("#default").addEventListener('click', (e) => changeClass(""));
document.querySelector("#desert").addEventListener('click', (e) =>changeClass("desert"));
document.querySelector("#ocean").addEventListener('click', (e) =>changeClass("ocean"));
document.querySelector("#high-contrast").addEventListener('click', (e) =>changeClass("high-contrast"));

