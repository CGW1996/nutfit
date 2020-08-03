var month_olympic = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//閏月
var month_normal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//非閏月
var month_name = ["January", "Febrary", "March", "April", "May", "June", "July", "Auguest", "September", "October", "November", "December"];
var holder = document.getElementById("days");
var prev = document.getElementById("prev");
var next = document.getElementById("next");
var ctitle = document.getElementById("calendar-title");
var cyear = document.getElementById("calendar-year");
var my_date = new Date();
var my_year = my_date.getFullYear();
var my_month = my_date.getMonth();
var my_day = my_date.getDate();
//算出第一個月星期幾
function dayStart(month, year) {
    var tmpDate = new Date(year, month, 1);
    return (tmpDate.getDay());
}
//算閏年 年份/4
function daysMonth(month, year) {
    var tmp = year % 4;
    if (tmp == 0) {
        return (month_olympic[month]);
    } else {
        return (month_normal[month]);
    }
}
function refreshDate() {
    var str = "";
    var totalDay = daysMonth(my_month, my_year); //取得該月總天數
    var firstDay = dayStart(my_month, my_year); //取得該月第一天週幾
    var myclass;
    for (var i = 1; i < firstDay; i++) {
        str += "<li></li>"; //創建空白點
    }
    for (var i = 1; i <= totalDay; i++) {
        if ((i < my_day && my_year == my_date.getFullYear() && my_month == my_date.getMonth()) || my_year < my_date.getFullYear() || (my_year == my_date.getFullYear() && my_month < my_date.getMonth())) {
            myclass = " class='lightgrey'"; //今天以前用灰色顯示
        } else if (i == my_day && my_year == my_date.getFullYear() && my_month == my_date.getMonth()) {
            myclass = " class='green greenbox'"; //當天綠色背景
        } else {
            myclass = " class='darkgrey'"; //未來日子用深灰色
        }
        str += "<a href='' id='next'> " + "<li" + myclass + ">" + i + "</li>";
    }
    holder.innerHTML = str; //日期顯示
    ctitle.innerHTML = month_name[my_month]; //英文月份
    cyear.innerHTML = my_year; //年份
}
refreshDate();

prev.onclick = function (e) {
    e.preventDefault();
    my_month--;
    if (my_month < 0) {
        my_year--;
        my_month = 11;
    }
    refreshDate();
}
next.onclick = function (e) {
    e.preventDefault();
    my_month++;
    if (my_month > 11) {
        my_year++;
        my_month = 0;
    }
    refreshDate();
}
