var selectBtn = document.getElementById('selector');
var checkBoxes = document.querySelectorAll('input[type="checkbox"]');

function calculateAge(dobNewFormat) {
    var today = new Date();
    var dob = new Date(dobNewFormat);
    var age = today.getFullYear() - dob.getFullYear();
    var months = today.getMonth() - dob.getMonth();
    var days = today.getDate() - dob.getDate();
    if (months < 0 || (months === 0 && days < 0)) {
        age--;
    }
    return age;
}

function selectDeselectAll() {
    if (selectBtn.innerHTML === 'Select All') {
        for (var i = 0; i < checkBoxes.length; i++) {
            checkBoxes[i].checked = true;
        }
        selectBtn.innerHTML = 'Deselect All';
    } else {
        for (var i = 0; i < checkBoxes.length; i++) {
            checkBoxes[i].checked = false;
        }
        selectBtn.innerHTML = 'Select All';
    }
}

function resetAll() {
    document.getElementById('streetname').value = '';
    document.getElementById('suburb').value = '';
    document.getElementById('postcode').value = '';
    document.getElementById('dateofbirth').value = '';
    document.getElementById('building').selectedIndex = 0;
    document.getElementById('textarea').value = '';
    checkBoxes.forEach(i => {
        if (i.checked) {
            i.checked = false;
        }
    })
    selectBtn.innerHTML = 'Select All';
}

function mainRender() {
    var streetName = document.getElementById('streetname').value;
    var suburb = document.getElementById('suburb').value;
    var postcode = document.getElementById('postcode').value;
    var dateOfBirth = document.getElementById('dateofbirth').value;
    var buildingType = document.getElementById('building').value;
    var dateRegex = /^(?:0[1-9]|[12]\d|3[01])([\/.-])(?:0[1-9]|1[012])\1(?:19|20)\d\d$/;

    var checkedBoxesList = [];
    for (let i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            checkedBoxesList.push(checkBoxes[i].name);
        }
    }

    if (checkedBoxesList.length !== 4) {
        selectBtn.innerHTML = 'Select All'
    } else {
        selectBtn.innerHTML = 'Deselect All'
    }

    if (!streetName || streetName.length < 3 || streetName.length > 50) {
        document.getElementById('textarea').value = 'Please input a valid street name';
    }
    else if (!suburb || suburb.length < 3 || suburb.length > 50) {
        document.getElementById('textarea').value = 'Please input a valid suburb';
    }
    else if (!postcode || postcode.length !== 4) {
        document.getElementById('textarea').value = 'Please input a valid postcode';
    }
    else if (!dateRegex.test(dateOfBirth)) {
        document.getElementById('textarea').value = 'Please input a valid date of birth';
    }
    else {
        // Making new format for date of birth to use Date object for age calculation.
        const dobString = dateOfBirth.split('/');
        const dobNewFormat = dobString.reverse().join('/');
        const age = calculateAge(dobNewFormat);

        let finalTextareaOutput = `Your are ${age} years old, and your address is ${streetName} St, ${suburb}, ${postcode}, Australia. Your building is`;
        if (buildingType == 'apartment') {
            finalTextareaOutput += 'an Apartment, and it has ';
        } else {
            finalTextareaOutput += 'a House, and it has ';
        }

        if (checkedBoxesList.length === 0) {
            finalTextareaOutput += 'no features.';
        } else if (checkedBoxesList.length === 1) {
            finalTextareaOutput += `${checkedBoxesList[0]}.`;
        } else if (checkedBoxesList.length === 2) {
            finalTextareaOutput += `${checkedBoxesList[0]} and ${checkedBoxesList[1]}.`;
        } else if (checkedBoxesList.length === 3) {
            finalTextareaOutput += `${checkedBoxesList[0]}, ${checkedBoxesList[1]} and ${checkedBoxesList[2]}.`;
        } else if (checkedBoxesList.length === 4){
            finalTextareaOutput += `${checkedBoxesList[0]}, ${checkedBoxesList[1]}, ${checkedBoxesList[2]} and ${checkedBoxesList[3]}.`;
        }
        document.getElementById('textarea').value = finalTextareaOutput;
    }
}