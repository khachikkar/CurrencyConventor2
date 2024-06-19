document.addEventListener("DOMContentLoaded", ()=>{

let currList1 = document.getElementById("currList1")
let currList2 =document.getElementById("currList2")
let button = document.getElementById("convertButton")
let change = document.getElementById("changeButton")
let currList1ValMoney = document.getElementById("currList1ValMoney")
let currList2ValMoney = document.getElementById("currList2ValMoney")

fetch("https://open.er-api.com/v6/latest")
.then(response=>{
   return response.json()
})
.then(res=>{
let curr_data= Object.keys(res.rates) // data currencies

function autoCreateCurrList(currdata){
currdata.forEach((item )=>{
    let option = document.createElement("option")
    option.textContent=item
    currList1.appendChild(option)
})
currdata.forEach((item )=>{
    let option = document.createElement("option")
    option.textContent=item
    currList2.appendChild(option)
})
}
autoCreateCurrList(curr_data)  // for first create a  list of currencies

////// start -> 2 event to change a color of selected currency ////
currList1.addEventListener("change", function() {
    
    if (this.value !== "value") {
        this.classList.add('has-value');
    } else {
        this.classList.remove('has-value');
    }
});

currList2.addEventListener("change", function() {
    
    if (this.value !== "value") {
        this.classList.add('has-value');
    } else {
        this.classList.remove('has-value');
    }
});

///// end ///


//// convert currency and result ////
button.addEventListener("click", ()=>{

    let currList1Val = currList1.value // USD
    let currList2Val = currList2.value  // AMD
    let currVal1Money =  currList1ValMoney.value // 6578
if(currVal1Money < 0 ){
    alert("write an POsitive number bro!!!")
    return
}
    fetch(`https://open.er-api.com/v6/latest/${currList1Val}`)
    .then(response=>response.json())
    .then(secondRes=>{
        
        let rate = secondRes.rates[currList2Val] // tiva
        let result =( rate * currVal1Money).toFixed(2)

        currList2ValMoney.value = result
    }).catch(err=> console.log(err))

})
//// change currency and result ////
change.addEventListener("click", ()=>{
    let tempVal1 = currList1.value //  USD
    let tempVal2 = currList2.value // AMD
    let tempMoney = currList2ValMoney.value //78965

    console.log(tempMoney, tempVal1, tempVal2)

    currList1.value = tempVal2
    currList1ValMoney.value = tempMoney
    currList2.value = tempVal1
    currList2ValMoney.value = ""

})

}).catch(err=>{
    console.log(err) // for errors
})

})