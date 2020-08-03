window.onload = function () {



    //Calendar javascript

    var calendar = document.getElementById("calendar_days");
    var monthSelect = document.getElementById("monthselect");
    var yearSelect = document.getElementById("yearselect");
    var eventModal = document.getElementById("eventModal");
    var editEventModal = document.getElementById("editEventModal");
    var closeButton = document.getElementById("close");
    var editclose = document.getElementById("editclose");
    var saveButton = document.getElementById("save");
    var saveChanges = document.getElementById("saveChanges");
    var eventItem = document.getElementById("eventItem");
    var editEventItem = document.getElementById("editEventItem");
    //var clearStorage = document.getElementById("clear_storage");
    var d;
    var newDate = new Date();
    var eventDates = [];
    var dayIndexforSave;
    var eventsMonthYear;
    var editItemListItem;
    var lists;
    var previousListThis;

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    var years = [2019, 2020, 2021, 2022, 2023];

    function detectMobile() {
        //Check if the app is on a mobile screen and turn all event lists into red dots
        //that can be tapped to view full list
        lists = document.getElementById("calendar").getElementsByTagName("ul");
        if (screen.width < 450 || document.body.clientWidth < 450) {

            for (var i = 0; i < lists.length; i++) {
                if (lists[i].firstChild) {
                    lists[i].classList.add("mobileList");
                }
            }
        } else {
            for (var i = 0; i < lists.length; i++) {
                if (lists[i].firstChild) {
                    lists[i].classList.remove("mobileList");
                }
                for (var k = 0; k < lists[i].children.length; k++) {
                    lists[i].children[k].classList.remove("mobileList");
                    lists[i].children[k].style.marginTop = "";
                }
            }

        }
    }


    function monthLength(month, year) {
        return new Date(year, month, 0).getDate();
    }

    function generateTime(month, year) {
        //generate calendar based on month and year
        var daysInMonth = monthLength(month + 1, year);

        var row = document.createElement("tr");
        calendar.append(row);

        for (var i = 1; i <= daysInMonth; i++) {
            d = new Date(year, month, i);

            if (d.getDay() == 0 && i != 1) {
                row = document.createElement("tr");
                calendar.append(row);
            }

            if (i == 1) {
                for (let i = 0; i < d.getDay(); i++) {
                    let block = document.createElement("td");
                    row.append(block);
                }
                addDayBlock(row, i);

            } else {
                addDayBlock(row, i);
            }
        }

        addEventsToCalendar();
    }

    function addDayBlock(newrow, i) {
        //create all properties and divs for calendar day
        let block = document.createElement("td");
        let blockNum = document.createTextNode(i);
        let eventBlock = document.createElement("ul");
        let addButton = document.createElement("button");
        addButton.addEventListener("click", addEvent, false);
        addButton.classList.add("addButton");
        addButton.textContent = "+";
        block.append(blockNum);
        block.append(addButton);
        block.append(eventBlock);
        block.addEventListener("click", addEvent, false);
        newrow.append(block);
    }


    function populateSelect(poparray, select) {
        //populates select with array, specifically month and year
        let newarray = poparray;
        let newselect = select;

        for (var i = 0; i < newarray.length; i++) {
            var optionValue = newarray[i];
            var option = document.createElement("option");
            option.value = optionValue;
            option.textContent = optionValue;
            newselect.appendChild(option);
        }
    }

    function clearMonth() {
        //clear month before repopulating with new month
        while (calendar.children.length > 0) {
            calendar.children[0].remove();
        }
    }

    function selectTime() {
        //preliminary actions taken before generating new month and year
        clearMonth();
        let newMonth = months.indexOf(monthSelect.value);
        let newYear = yearSelect.value;
        generateTime(newMonth, newYear);
        detectMobile();
    }


    function addEvent() {
        //open save event block
        if (event.target == this) {
            if (this.className == "addButton") {
                dayIndexforSave = this.parentNode.firstChild.data;
            } else {
                dayIndexforSave = this.firstChild.data;
            }
            eventModal.classList.remove("hide");
            monthSelect.setAttribute("disabled", "true");
            yearSelect.setAttribute("disabled", "true");
        }

    }

    function close() {
        //close edit and save blocks
        this.parentNode.classList.add("hide");
        monthSelect.removeAttribute("disabled");
        yearSelect.removeAttribute("disabled");
        eventItem.value = "";
        editEventItem.value = "";
    }

    function saveEvent() {
        if (window.localStorage.getItem("retrieveEvent")) {
            eventDates = JSON.parse(window.localStorage.getItem("retrieveEvent"));
        }

        if (eventItem.value) {

            if (eventDates.length == 0) {
                //add event to empty object
                eventDates[0] = {};
                eventDates[0].month = monthSelect.value;
                eventDates[0].year = yearSelect.value;
                eventDates[0][dayIndexforSave] = [eventItem.value];
                var savedEvent = JSON.stringify(eventDates);
                window.localStorage.setItem("retrieveEvent", savedEvent);
                eventItem.value = "";
                eventModal.classList.add("hide");
                monthSelect.removeAttribute("disabled");
                yearSelect.removeAttribute("disabled");
            } else {

                for (var i = 0; i < eventDates.length; i++) {
                    if (eventDates[i].month == monthSelect.value && eventDates[i].year == yearSelect.value) {
                        //push event to existing array
                        if (eventDates[i][dayIndexforSave]) {

                            eventDates[i][dayIndexforSave].push(eventItem.value);
                            break;
                        } else {
                            //create new array in a day
                            eventDates[i][dayIndexforSave] = [eventItem.value];
                            break;
                        }

                    } else if (i == eventDates.length - 1) {
                        //create new month and year object
                        eventDates[eventDates.length] = {};
                        eventDates[eventDates.length - 1].month = monthSelect.value;
                        eventDates[eventDates.length - 1].year = yearSelect.value;
                        eventDates[eventDates.length - 1][dayIndexforSave] = [eventItem.value];
                        break;
                    }


                }
            }

            //save to localstorage
            var savedEvent = JSON.stringify(eventDates);
            window.localStorage.setItem("retrieveEvent", savedEvent);
            addEventToBlock();
            eventItem.value = "";
            detectMobile();
        }

        eventModal.classList.add("hide");
        monthSelect.removeAttribute("disabled");
        yearSelect.removeAttribute("disabled");

    }

    function addEventToBlock() {
        //find object with selected month and year
        for (var i = 0; i < eventDates.length; i++) {
            if (eventDates[i].month == monthSelect.value && eventDates[i].year == yearSelect.value) {
                var eventsMonthYear = eventDates[i];
            }
        }
        //Iterate through days until the clicked on day is reached           
        for (let j = 0; j < calendar.children.length; j++) {
            for (let k = 0; k < calendar.children[j].childNodes.length; k++) {

                if (calendar.children[j].childNodes[k].firstChild) {
                    var calendarIndex = calendar.children[j].childNodes[k].firstChild.data;
                    //Found the day
                    if (calendarIndex == dayIndexforSave) {
                        //Add the event to the block
                        let eventBlock = calendar.children[j].childNodes[k].childNodes[2];
                        var listItem = document.createElement("li");
                        let attributeIndex = String(dayIndexforSave);
                        var deleteButton = document.createElement("div");
                        deleteButton.addEventListener("click", deleteEvent, false);
                        deleteButton.textContent = "X";
                        deleteButton.classList.add("button");
                        var editButton = document.createElement("div");
                        editButton.addEventListener("click", openEditEvent, false);
                        editButton.innerHTML = "<img src = 'https://github.com/gabrielajohnson/CalendarApp/blob/master/images/pen.png?raw=true/'>";
                        editButton.classList.add("button");
                        var textArrayLength = eventsMonthYear[dayIndexforSave].length - 1;
                        var textDiv = document.createElement("div");
                        textDiv.textContent = eventsMonthYear[dayIndexforSave][textArrayLength];
                        listItem.append(textDiv);
                        listItem.append(deleteButton);
                        listItem.append(editButton);
                        eventBlock.addEventListener("click", openEventList, false);
                        eventBlock.appendChild(listItem);


                    }
                }
            }

        }
        //Check to add the list item in mobile view
        if (listItem.parentNode.children.length > 1) {
            var listCaller = listItem.parentNode;
            openEventList.call(listCaller);
        }
        eventModal.classList.add("hide");
        monthSelect.removeAttribute("disabled");
        yearSelect.removeAttribute("disabled");
    }



    function addEventsToCalendar() {
        //pull events from local storage if they exist
        if (window.localStorage.getItem("retrieveEvent")) {
            eventDates = JSON.parse(window.localStorage.getItem("retrieveEvent"));
        }


        for (var i = 0; i < eventDates.length; i++) {
            //find object with selected month and year
            if (eventDates[i].month == monthSelect.value && eventDates[i].year == yearSelect.value) {
                eventsMonthYear = eventDates[i];
                //Iterate through days until the clicked on day is reached 
                for (let j = 0; j < calendar.children.length; j++) {
                    for (let k = 0; k < calendar.children[j].childNodes.length; k++) {
                        if (calendar.children[j].childNodes[k].firstChild) {
                            var index = calendar.children[j].childNodes[k].firstChild.data;
                            var eventBlock = calendar.children[j].childNodes[k].childNodes[2];
                            if (eventsMonthYear[index]) {
                                //Add events to all days in chosen month
                                for (var l = 0; l < eventsMonthYear[index].length; l++) {


                                    var listItem = document.createElement("li");
                                    let attributeIndex = String(dayIndexforSave);
                                    var deleteButton = document.createElement("div");
                                    deleteButton.addEventListener("click", deleteEvent, false);
                                    deleteButton.textContent = "X";
                                    deleteButton.classList.add("button");
                                    var editButton = document.createElement("div");
                                    editButton.addEventListener("click", openEditEvent, false);
                                    editButton.innerHTML = "<img src = 'https://github.com/gabrielajohnson/CalendarApp/blob/master/images/pen.png?raw=true'/>";
                                    editButton.classList.add("button");
                                    deleteButton.textContent = "X";
                                    var textDiv = document.createElement("div");
                                    textDiv.textContent = eventsMonthYear[index][l];
                                    listItem.append(textDiv);
                                    listItem.append(deleteButton);
                                    listItem.append(editButton);
                                    eventBlock.addEventListener("click", openEventList, false);
                                    eventBlock.appendChild(listItem);
                                }
                            }

                        }

                    }

                }
            }
        }


    }




    function deleteEvent() {
        var evt = this;
        var index = this.parentNode.parentNode.parentNode.childNodes[0].data;

        for (var i = 0; i < eventDates.length; i++) {
            if (eventDates[i].month == monthSelect.value && eventDates[i].year == yearSelect.value) {
                var eventMonthYear = eventDates[i];
                var listLength = this.parentNode.parentNode.childNodes.length;
                for (var j = 0; j < listLength; j++) {

                    if (this.parentNode.parentNode.childNodes[j] == this.parentNode) {
                        //check if it's in array and delete
                        if (eventMonthYear[index].length >= 2) {
                            eventMonthYear[index].splice(eventMonthYear[index].length - 1, 1);
                            break;
                        } else {
                            //If there's only one list item left to delete, delete the whole day from the object
                            delete eventMonthYear[index];
                            break;
                        }

                    }

                }

            }
        }

        var parentList = this.parentNode.parentNode;
        if (parentList.children.length == 1 && parentList.className) {
            parentList.classList.remove("mobileList");
        }
        this.parentNode.remove();
        var savedEvent = JSON.stringify(eventDates);
        window.localStorage.setItem("retrieveEvent", savedEvent);

    }

    function openEditEvent() {
        dayIndexforSave = this.parentNode.parentNode.parentNode.firstChild.data;
        editItemListItem = this;
        editEventModal.classList.remove("hide");
        monthSelect.setAttribute("disabled", "true");
        yearSelect.setAttribute("disabled", "true");
    }

    function editEvent() {
        var evt = editItemListItem;
        var index = dayIndexforSave;
        for (var i = 0; i < eventDates.length; i++) {
            if (eventDates[i].month == monthSelect.value && eventDates[i].year == yearSelect.value) {
                var eventMonthYear = eventDates[i];
                var listLength = editItemListItem.parentNode.childNodes.length;
                for (var j = 0; j < listLength; j++) {
                    //replace the listitem text with the new value from input
                    if (editItemListItem.parentNode.parentNode.childNodes[j] == editItemListItem.parentNode) {
                        eventMonthYear[index][j] = editEventItem.value;
                        break;
                    }

                }

            }
        }

        editItemListItem.parentNode.firstChild.innerText = editEventItem.value;

        var savedEvent = JSON.stringify(eventDates);
        window.localStorage.setItem("retrieveEvent", savedEvent);
        editEventItem.value = "";
        editEventModal.classList.add("hide");
        monthSelect.removeAttribute("disabled");
        yearSelect.removeAttribute("disabled");
    }


    function openEventList() {
        var marginCounter = 0;
        lists = this.children;
        //If you clicked on a red event dot on mobile, and then clicked on a second one,
        //this if statement will hide the first red dot's list
        if (previousListThis) {
            for (var k = 0; k < previousListThis.children.length; k++) {
                previousListThis.children[k].classList.remove("mobileList");
                previousListThis.children[k].style.marginTop = "";
            }
        }

        if (screen.width < 450 || document.body.clientWidth < 450) {
            //Put the list items of the chosen red dot into view
            for (var i = 0; i < lists.length; i++) {
                if (lists[i].firstChild) {
                    lists[i].classList.add("mobileList");
                    lists[i].style.marginTop = marginCounter + "px";
                    marginCounter += 18;
                }
            }
        }
        previousListThis = this;



    }


    window.addEventListener('resize', detectMobile, false);
    monthSelect.addEventListener("change", selectTime, false);
    yearSelect.addEventListener("change", selectTime, false);
    closeButton.addEventListener("click", close, false);
    editclose.addEventListener("click", close, false);
    saveButton.addEventListener("click", saveEvent, false);
    //clearStorage.addEventListener("click",function(){localStorage.clear();history.go(0);},false);
    saveChanges.addEventListener("click", editEvent, false);

    populateSelect(months, monthSelect);
    populateSelect(years, yearSelect);

    //Generate calender for current month and year
    monthSelect.value = months[newDate.getMonth()];
    yearSelect.value = newDate.getFullYear();
    generateTime(months.indexOf(monthSelect.value), yearSelect.value);



    detectMobile();

}
