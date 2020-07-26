//dropdown
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
//date
let df = new Date();
let year = df.getFullYear();
let month = df.getMonth() + 1;
let day = df.getDate();
$("#fromD,#endD").val(year + "/" + month + "/" + day);
//filter
var tableFilter = (function(Arr) {

    var _input;

    // 資料輸入事件處理函數
    function _onInputEvent(e) {
        _input = e.target;
        var tables = document.getElementsByClassName(_input.getAttribute('data-table'));
        Arr.forEach.call(tables, function(table) {
            Arr.forEach.call(table.tBodies, function(tbody) {
                Arr.forEach.call(tbody.rows, _filter);
            });
        });
    }

    // 資料篩選函數，顯示包含關鍵字的列，其餘隱藏
    function _filter(row) {
        var text = row.textContent.toLowerCase(),
            val = _input.value.toLowerCase();
        row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
    }

    return {
        // 初始化函數
        init: function() {
            var inputs = document.getElementsByClassName('light-table-filter');
            Arr.forEach.call(inputs, function(input) {
                input.oninput = _onInputEvent;
            });
        }
    };
})(Array.prototype);

//網頁載入完成後， 啟動 tableFilter
document.addEventListener('readystatechange', function() {
    if (document.readyState === 'complete') {
        tableFilter.init();
    }
});