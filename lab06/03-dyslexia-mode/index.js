/* 
  See Smashing Magazine Tutorial:
  https://www.smashingmagazine.com/2021/11/dyslexia-friendly-mode-website/
*/

var dyslexia = false

const changeClass = () => {
    if (dyslexia) {
        dyslexia = false
        document.querySelector("body").className = "";
    } else {
        dyslexia = true
        document.querySelector("body").className = "dyslexia-mode";
    }
};


document.querySelector("#dyslexia-toggle").addEventListener('click', (e) => changeClass());