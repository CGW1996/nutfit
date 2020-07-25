var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        } else {
            dropdownContent.style.display = "block";
        }
    });
}
// purchase date
let df = new Date();
let year = df.getFullYear();
let month = df.getMonth() + 1;
let day = df.getDate();
$("#purchaseDate").val(year + "/" + month + "/" + day);
//sum
$("#number").on("change", function() {
    var number = $("#number").val();
    var price = $("#price").val();
    var sum = number * price;
    console.log(sum);
    $("#sum").val(sum);
})
$("#price").on("change", function() {
    var number = $("#number").val();
    var price = $("#price").val();
    var sum = number * price;
    console.log(sum);
    $("#sum").val(sum);
})