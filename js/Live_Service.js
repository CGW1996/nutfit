// Page_Reservation

const switchPage = function( id ){

    //關閉所有
    document.querySelectorAll(".public_content").forEach(
        (item) =>{
            console.log(item);
            item.classList.add("hide");
        }
    )

    //開啟特定的
    document.querySelector(`#${id}`).classList.remove("hide");
}

//裝上事件聆聽
document.querySelectorAll(".public_buttn").forEach(
    (item, index) =>{
        item.addEventListener(
            'click',
            ()=>{         
                let tid = "page_" + index;
                console.log(tid);
                switchPage(tid);
            }
        )
    }
)


// Reservation_B
