let h3 = document.querySelector("h3");
document.addEventListener("keydown", function(dets){
    if(dets.key === " "){
        h3.textContent = "backspace"
    } else{
        h3.textContent = dets.key;
    };
    

});