
const form = document.getElementById('form')
const profile_w = document.getElementById('profile_w')
const profile_h = document.getElementById('profile_h')
const units_in = document.getElementById('units_in')
const units_out = document.getElementById('units_out')
const results = document.getElementById('results')

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let isValid = [validateInputData(profile_w), validateInputData(profile_h), validateUnits(units_in), validateUnits(units_out)]

    console.log(isValid)
    if (isValid.every((element) => (element === true))) {
        // 1 = mm; 2=cm; 3=m;
        let iUnits = Number(units_in.value);
        let inputMultiplayer = 0;
        switch (iUnits) {
            case 1:
                inputMultiplayer = 0.1;
                break;
            case 3:
                inputMultiplayer = 100;
                break;
            default:
                inputMultiplayer = 1;
        }

        let oUnits = Number(units_out.value);

        let outputMultiplayer = 0;
        switch (oUnits) {
            case 1:
                outputMultiplayer = 1e4;
                break;
            case 3:
                outputMultiplayer =  1e-8;
                break;
            default:
                outputMultiplayer = 1;
        }
        console.log(outputMultiplayer, iUnits);
        let oUnitsText = units_out.options[units_out.selectedIndex].text;

        let profile_w_value = Number(profile_w.value) * inputMultiplayer;
        let profile_h_value = Number(profile_h.value) * inputMultiplayer;
        let Ix = (outputMultiplayer * profile_w_value * profile_h_value * profile_h_value * profile_h_value / 12).toFixed(8);
        let Iy = (outputMultiplayer * profile_h_value * profile_w_value * profile_w_value * profile_w_value / 12).toFixed(8);
        results.innerHTML = `<p>Ix = ${Ix} ${oUnitsText}<br> Iy=${Iy} ${oUnitsText}</p>`;
    }
});

// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function isPositiveNumber(value) {
    if ((undefined === value) || (null === value)) {
        return false;
    }
    if (typeof value == 'number') {
        return (Number(value) > 0);
    }
    return Number(value) > 0;
}

function validateInputData(input) {
    //validate form data
    if (isPositiveNumber(input.value)) {
        showSuccess(input);
        return true;
    } else {
        showError(input, "Value is not a positive number");
        return false;
    }
}

function validateUnits(input) {
    //validate form data
    if (Number(input.selectedIndex) > 0) {
        showSuccess(input);
        return true;
    } else {
        showError(input, "Select units.");
        return false;
    }
}

