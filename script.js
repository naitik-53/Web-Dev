//this keyword aik special keyword ha kyuki jaise ki baki sare keyyword ki value ya nature badal jata ha is baat se ki aap use khn use kr rahe ho

//global scope 
console.log(this);

function t(){
    console.log(this);
}

t();

// event handler
document.querySelector("h1").addEventListener("click", function(){
    console.log((this.style.color = "red"));
})