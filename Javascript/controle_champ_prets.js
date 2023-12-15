var adhReg = /^[0-9]{1,}$/

var codeExpReg = /^[0-9]{1,}$/

var numAdh = document.getElementById('idAdherent');

var codeExp = document.getElementById('idCodeExemplaire');

var submitBtn = document.getElementById('btnPret');

var amendeBtn = document.getElementById('btnAmende');

var form = document.getElementById('form');

var msgAdh = document.getElementById('msgNumAdh');

var msgExemplaire = document.getElementById('msgCodeExp');

submitBtn.style.display = 'none';
amendeBtn.style.display = 'none';

// Je peux me servir d'un set car ce sont des donnnées non ordonnées, il n'y a pas de clé valeur
var adhPretEnCours = new Set();

var avancer = document.getElementById('voirListe');

avancer.addEventListener('click', avancerPage);

numAdh.addEventListener('blur', controleNumAdh);

codeExp.addEventListener('blur', controleCodeExp);

submitBtn.addEventListener('click',subClique) 

// amendeBtn.addEventListener('click', allerPageAmende)

let pretsStored = localStorage.getItem('prets');
if (pretsStored) {
    prets = new Map(JSON.parse(pretsStored));
} else {
    prets = new Map();
}
let adhPretEnCoursStored = localStorage.getItem('adhPretEnCours');
if (adhPretEnCoursStored) {
    adhPretEnCours = new Set(JSON.parse(adhPretEnCoursStored));
}


function controleNumAdh(e) {
    let estValide = adhReg.test(numAdh.value);
    let adherent = adherents.get(numAdh.value);

    if (estValide && adherent) {
        if (adhPretEnCours.has(numAdh.value)) {
            numAdh.setAttribute('class', 'invalid');
            msgAdh.innerHTML = 'Cet adhérent a déjà un prêt en cours.';
            cacheValider();
            afficheAmende();
        } else if (adherent.amende !== null) {
            numAdh.setAttribute('class', 'invalid');
            msgAdh.innerHTML = 'Cet adhérent a une amende impayée.';
            cacheValider();
            afficheAmende();
        } else {
        numAdh.setAttribute('class', 'valid');
        msgAdh.innerHTML = 'Numéro d\'adhérent trouvé !';
        cacheValider();
        afficheAmende();
        return true; }
    } else {
        numAdh.setAttribute('class', 'invalid');
        msgAdh.innerHTML = 'Numéro d\'adhérent non valide. Veuillez vérifier le numéro et réessayer.';
        cacheValider();
        afficheAmende();
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
            cacheValider();
            return true;
        } else {
            codeExp.setAttribute('class', 'invalid');
            msgExemplaire.innerHTML = 'Numéro d\'exemplaire épuisé.';
            cacheValider();
            return false;
        }
    } else {
        codeExp.setAttribute('class', 'invalid');
        msgExemplaire.innerHTML = 'Numéro d\'exemplaire non trouvé. Veuillez vérifier le numéro et réessayer.';
        cacheValider();
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

        adhPretEnCours.add(numAdh.value);
        
        localStorage.setItem('prets', JSON.stringify([...prets]));
        localStorage.setItem('adhPretEnCours', JSON.stringify([...adhPretEnCours]));
        console.log(prets)
        console.log(adhPretEnCours)
    } else {
        // Empêchez l'envoi du formulaire si les validations échouent
        e.preventDefault();
    }
}  

function generateUniqueId() {
      return prets.size + 1;
}

function avancerPage() {
    window.location.href = 'liste_pret.html';
}

// function allerPageAmende() {
//     window.location.href = ''; // A remplir avec la PAGE AMENDE coté adhérent
// }

function cacheValider() {
    if (numAdh.classList.contains('valid') && codeExp.classList.contains('valid')) {
        submitBtn.style.display = 'flex';
    } else {
        submitBtn.style.display = 'none';
    }
}

function afficheAmende() {

    let adherent = adherents.get(numAdh.value);

    if (adherent && adherent.amende !== null) {
        amendeBtn.style.display = 'flex'
    } else {
        amendeBtn.style.display = 'none'
    }
}