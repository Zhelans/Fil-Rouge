var adhReg = /^[0-9]{1,}$/

var codeExpReg = /^[C][0-9]{1,}$/

var numAdh = document.getElementById('idAdherent');

var codeExp = document.getElementById('idCodeExemplaire');

var submitBtn = document.getElementById('btnPret');

var form = document.getElementById('form');

var msgAdh = document.getElementById('msgNumAdh');

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

form.addEventListener('submit', function(event) {
    event.preventDefault();

    let numeroAdh = document.getElementById('idAdherent').value;
    let codeExemplaire = document.getElementById('idCodeExemplaire').value;

      // Vérifiez si le numéro d'adhérent existe dans la Map des adhérents
      if (adherents.has(numeroAdh)) {
        // Enregistrez le prêt dans la Map des prêts
        let pretId = generateUniqueId(); // Fonction  pour générer une clé ID
        prets.set(pretId, { numeroAdh, codeExemplaire});

        // Réinitialisez le formulaire
        numAdh.value = '';
        codeExp.value = '';

        alert('Prêt enregistré avec succès! ID du prêt : ' + pretId);
      } else {
        alert('Numéro d\'adhérent non trouvé. Veuillez vérifier le numéro et réessayer.');
      }
    });
    

    function generateUniqueId() {
      let id = 1;

      while (prets.has(id)) {
        id++
      }
      return id;
    }