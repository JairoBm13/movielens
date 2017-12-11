var svd = document.getElementById("svdW");
var svdVal = document.getElementById("svdVal");
var cont = document.getElementById("contW");
var contVal = document.getElementById("contVal");
var text = document.getElementById("textW");
var textVal = document.getElementById("textVal");
svdVal.innerHTML = svd.value; // Display the default slider value
contVal.innerHTML = cont.value; // Display the default slider value
textVal.innerHTML = text.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
svd.oninput = function() {
    svdVal.innerHTML = this.value;
}

cont.oninput = function() {
    contVal.innerHTML = this.value;
}

text.oninput = function() {
    textVal.innerHTML = this.value;
}