
const form = document.getElementById('form')
const profile_w = document.getElementById('profile_w')
const profile_h = document.getElementById('profile_h')
const units_in = document.getElementById('units_in')
const units_out = document.getElementById('units_out')
const results = document.getElementById('results')

form.addEventListener('submit',function(e){
    e.preventDefault(); 
    validateInputData(profile_w);
    validateInputData(profile_h); 
    validateUnits(units_in);
    validateUnits(units_out);
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
    return  Number(value)>0;
}

function validateInputData(input){
      //validate form data
    if( isPositiveNumber(input.value) ){        
        showSuccess(input);       
    }else{
        showError(input, "Value is not a positive number");
        console.log(`Wartość niepoprawna: ${input.value}`);
    }    
}

function validateUnits(input){
    //validate form data
  if(Number(input.selectedIndex ) > 0 ){        
      showSuccess(input);       
  }else{
      showError(input, "Select units.");      
  }    
}