"use strict";

//指定日時までscroll
const elDatePicker = document.getElementById("datePicker");
if (elDatePicker) {
    elDatePicker.addEventListener("change", (ev) => {
        const targetElement = document.getElementById(`anc${ev.target.value}`);
        if (targetElement)
            targetElement.scrollIntoView({ behavior: "smooth" });
    });
}
