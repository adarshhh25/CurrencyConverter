const populate = async (value, currency) => {
    const url = "https://api.currencyapi.com/v3/latest?apikey=cur_live_LVvJXrp8sjYfPkc18tdxlKqivJtf5srthJwR5xyE";
    let myStr = "";
    let response = await fetch(url);
    let rJson = await response.json();
    console.log(rJson);

    document.querySelector(".output").style.display = "block";

    for (let key of Object.keys(rJson["data"])) {
        myStr += `<tr>
                  <td>${key}</td>
                  <td>${rJson["data"][key]["code"]}</td>
                  <td>${(rJson["data"][key]["value"] * value).toFixed(2)}</td>
                  </tr>`;
    }

    const tableBody = document.querySelector("tbody");
    if (tableBody) {
        tableBody.innerHTML = myStr;
    } else {
        console.error("Table body not found");
    }
};

const btn = document.querySelector(".btn");
if (btn) {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("Button is clicked");

        const inputElement = document.querySelector("input[name='quantity']");
        const selectElement = document.querySelector("select[name='currency']");

        if (inputElement && selectElement) {
            const value = parseInt(inputElement.value);
            const currency = selectElement.value;
            if (!isNaN(value)) {
                populate(value, currency);
            } else {
                console.error("Invalid quantity entered");
            }
        } else {
            console.error("Input or Select element not found");
        }
    });
} else {
    console.error("Button element not found");
}


