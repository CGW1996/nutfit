let year = new Date().getFullYear();
let month;
for(let i = year;i>2016;i--){
    let yearList = document.createElement("option",i);
    yearList.innerHTML = i;
    document.querySelector("#selectYear").append(yearList);
}
var selectedY = $("#selectYear").val();
$("#selectYear").change(function(){
    var selectedY = $("#selectYear").val();
    console.log(selectedY);
})
for(let i = 1;i<13;i++){
    month = document.createElement("option",i);
    // month.setAttribute("id", i);
    month.innerHTML = i;
    document.querySelector("#selectMonth").append(month);
}
