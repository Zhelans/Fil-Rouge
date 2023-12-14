var adhReg = /^[0-9]{1,}$/

var codeExpReg = /^[0-9]{1,}$/

var numAdh = document.getElementById('idAdherent');

var codeExp = document.getElementById('idCodeExemplaire');

var submitBtn = document.getElementById('btnPret');

var form = document.getElementById('form');

var msgAdh = document.getElementById('msgNumAdh');

var msgExemplaire = document.getElementById('msgCodeExp');

numAdh.addEventListener('blur', controleNumAdh);

codeExp.addEventListener('blur', controleCodeExp);

submitBtn.addEventListener('click', subClique) 

    let pretsStored = localStorage.getItem('prets');
    if (pretsStored) {
        prets = new Map(JSON.parse(pretsStored));
    } else {
        prets = new Map();
    }



function controleNumAdh(e) {
    let estValide = adhReg.test(numAdh.value);
    if (estValide && adherents.has(numAdh.value)) {
        numAdh.setAttribute('class', 'valid');
        msgAdh.innerHTML = 'Numéro d\'adhérent trouvé !';
        return true;
    } else {
        numAdh.setAttribute('class', 'invalid');
        msgAdh.innerHTML = 'Numéro d\'adhérent non valide. Veuillez vérifier le numéro et réessayer.';
        return false;
        }
        
    }


function controleCodeExp(e) {

    let estValide = codeExpReg.test(codeExp.value);
    if (estValide && exemplaires.has(codeExp.value)) {
        let expInfo = exemplaires.get(codeExp.value);

        if (!expInfo.epuise) {
            codeExp.setAttribute('class', 'valid');
            msgExemplaire.innerHTML = 'Numéro d\'exemplaire trouvé ! Titre de l\'album: ' + expInfo.titre;
            return true;
        } else {
            codeExp.setAttribute('class', 'invalid');
            msgExemplaire.innerHTML = 'Numéro d\'exemplaire épuisé.';
            e.preventDefault();
            return false;
        }
    } else {
        codeExp.setAttribute('class', 'invalid');
        msgExemplaire.innerHTML = 'Numéro d\'exemplaire non trouvé. Veuillez vérifier le numéro et réessayer.';
        e.preventDefault();
        return false;
    }
}

function subClique(e) {

    var numAdhValide = controleNumAdh();
    var codeExpValide = controleCodeExp();

    if (numAdhValide && codeExpValide) {
        
        // Enregistrez le prêt dans la Map des prêts
        let pretId = generateUniqueId();
        prets.set(pretId, { numeroAdh: numAdh.value, codeExemplaire: codeExp.value });
        

        localStorage.setItem('prets', JSON.stringify([...prets]));
        console.log(prets)
    } else {
        // Empêchez l'envoi du formulaire si les validations échouent
        e.preventDefault();
    }
}  

function generateUniqueId() {
      return prets.size + 1;
}