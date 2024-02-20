var selectedSeats = 0;
var totalSeats = 40;
var ticketPrice = 550; // Price per ticket

document.querySelectorAll("#purchaseSeat .purchase_btn").forEach(function(seat){
    seat.addEventListener("click", function(event){
        updateSeat(event.target);

        const selectedSeatData = document.getElementById("selected_seat_data");
        const seatInfoId = event.target.innerText + "_info";

        // Check if the seat info div already exists
        const existingSeatInfo = document.getElementById(seatInfoId);

        if (existingSeatInfo && event.target.style.backgroundColor !== "rgb(29, 209, 0)") {
            // If the seat is deselected, remove the seat info div
            selectedSeatData.removeChild(existingSeatInfo);
        } 
        
        else if (!existingSeatInfo && event.target.style.backgroundColor === "rgb(29, 209, 0)") {
            // If the seat is selected and the seat info div doesn't exist, create it
            const createNewSeat = document.createElement("div");
            createNewSeat.id = seatInfoId;
            createNewSeat.innerHTML = `<div class="flex flex-row justify-between gap-2 mt-2">
                                            <p>${event.target.innerText}</p>
                                            <p>Economoy</p>
                                            <p>550</p>
                                         </div>`;
            selectedSeatData.appendChild(createNewSeat);
        }

        updateTotalPrice();
        submitBtnEnable();
    });
});

document.getElementById("coupon_apply").addEventListener("click", function(){
    discountPrice();
});

function updateSeat(seat) {
    if (seat.style.backgroundColor === "rgb(29, 209, 0)") {
        // Seat is already selected, so deselect it
        seat.style.backgroundColor = "";
        selectedSeats--;
    } 
    
    else if (selectedSeats < 4) {
        // Select the seat if not already selected and less than 4 seats are selected
        seat.style.backgroundColor = "#1DD100";
        selectedSeats++;
    } 
    
    else {
        alert("You can't select more than 4 seats.");
    }

    updateSeatCount();
    discountPrice(); // Call discountPrice to update coupon save price dynamically
}

function updateSeatCount() {
    var seatCountElement = document.getElementById("seat_count");
    seatCountElement.textContent = selectedSeats;

    var totalSeatElement = document.getElementById("total_seat");
    totalSeatElement.textContent = totalSeats - selectedSeats;
}

function updateTotalPrice() {
    const totalPriceElement = document.getElementById("total_price_count");
    totalPriceElement.innerText = selectedSeats * ticketPrice;

    // const grandPriceTotal = document.getElementById("grand_price_count");
    // grandPriceTotal.innerText = selectedSeats * ticketPrice;
}

function discountPrice() {
    const couponField = document.getElementById("coupon_field");
    const grandPriceTotal = document.getElementById("grand_price_count");
    const savePrice = document.getElementById("savePrice");
    const savePriceCount = document.getElementById("savePriceCount");
    const couponBtn = document.getElementById("couponBtn");

    if (couponField.value == "NEW15") {
        const discountedPrice = (selectedSeats * ticketPrice) * 0.15;
        savePriceCount.innerText = (selectedSeats * ticketPrice) * 0.15;
        grandPriceTotal.innerText = (selectedSeats * ticketPrice) - discountedPrice;
        savePrice.style.display = "flex";
        couponBtn.style.display = "none";
    } 
    
    else if (couponField.value == "Couple 20") {
        const discountedPrice = (selectedSeats * ticketPrice) * 0.2;
        savePriceCount.innerText = (selectedSeats * ticketPrice) * 0.2;
        grandPriceTotal.innerText = (selectedSeats * ticketPrice) - discountedPrice;
        savePrice.style.display = "flex";
        couponBtn.style.display = "none";
    } 
    
    else {
        grandPriceTotal.innerText = (selectedSeats * ticketPrice);
        savePrice.style.display = "none";
        couponBtn.style.display = "block";
    }
}

function submitBtnEnable() {
    document.getElementById("passenger_name").addEventListener("input", function(event) {
        validateForm();
    });

    document.getElementById("phone_number").addEventListener("input", function(event) {
        validateForm();
    });

    function validateForm() {
        const submitBtn = document.getElementById("submit_btn");
        const passengerName = document.getElementById("passenger_name").value;
        const phoneNumber = document.getElementById("phone_number").value;

        const lettersOnly = passengerName.replace(/[^a-zA-Z]/g, '');

        // Regular expression for a valid 11-digit mobile number
        const mobileNumberRegex = /^[0-9]{11}$/;

        if (lettersOnly.length > 2 && mobileNumberRegex.test(phoneNumber) && selectedSeats > 0) {
            submitBtn.removeAttribute("disabled");
        } else {
            submitBtn.setAttribute("disabled", true);
        }
    }
}
