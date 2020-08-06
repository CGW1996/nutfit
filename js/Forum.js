function readURL(input) {      //上傳照片功能

  if (input.files && input.files[0]) {

    var imageTagID = input.getAttribute("targetID");

    var reader = new FileReader();

    reader.onload = function (e) {

      var img = document.getElementById(imageTagID);

      img.setAttribute("src", e.target.result)
      img.style.display = "block"; 

    }

    reader.readAsDataURL(input.files[0]);



  }

}

