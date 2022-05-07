const makeBigger = () => {
   txt = document.querySelector(".content")
   style = window.getComputedStyle(txt, null).getPropertyValue('font-size');
   currentSize = parseFloat(style);
   txt.style.fontSize = (currentSize + 1) + 'px';

   txt = document.querySelector("h1")
   style = window.getComputedStyle(txt, null).getPropertyValue('font-size');
   currentSize = parseFloat(style);
   txt.style.fontSize = (currentSize + 1) + 'px';
};

const makeSmaller = () => {
   txt = document.querySelector(".content")
   style = window.getComputedStyle(txt, null).getPropertyValue('font-size');
   currentSize = parseFloat(style);
   txt.style.fontSize = (currentSize - 1) + 'px';

   txt = document.querySelector("h1")
   style = window.getComputedStyle(txt, null).getPropertyValue('font-size');
   currentSize = parseFloat(style);
   txt.style.fontSize = (currentSize - 1) + 'px';
};


document.querySelector("#a1").addEventListener('click', makeBigger);
document.querySelector("#a2").addEventListener('click', makeSmaller);

