var adhReg = /^[0-9]{1,}$/

var codeExpReg = /^[A-Z][0-9]{1,}$/

var numAdh = document.getElementById('idAdherent');

var codeExp = document.getElementById('idCodeExemplaire');

var submitBtn = document.getElementById('btnPret');

numAdh.addEventListener('keyup', controleNumAdh);

codeExp.addEventListener('keyup', controleCodeExp);

submitBtn.addEventListener('click',function(e) {controleNumAdh(e, numAdh.value)}, false )

submitBtn.addEventListener('click',function(e) {controleCodeExp(e, codeExp.value)}, false )

function controleNumAdh(e) {
    if (adhReg.test(numAdh.value)) numAdh.setAttribute('class','valid');
    else {
        numAdh.setAttribute('class','invalid')
        e.preventDefault();
    }
}

function controleCodeExp(e) {
    if (codeExpReg.test(codeExp.value)) codeExp.setAttribute('class','valid');
    else {
        codeExp.setAttribute('class','invalid')
        e.preventDefault();
    }
}