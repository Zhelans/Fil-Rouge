// Mes 2 regex pour les 2 champs
var adhReg = /^[0-9]{1,}$/

var codeExpReg = /^[0-9]{1,}$/

// Je récupère tous mes id
var numAdh = document.getElementById('idAdherent');

var codeExp = document.getElementById('idCodeExemplaire');

var submitBtn = document.getElementById('btnPret');

var amendeBtn = document.getElementById('btnAmende');

var cotisationBtn = document.getElementById('btnCotisation');

var inscriptionBtn = document.getElementById('btnInscrire');

var resetBtn = document.getElementById('btnPretReset');

var form = document.getElementById('form');

var msgAdh = document.getElementById('msgNumAdh');

var msgExemplaire = document.getElementById('msgCodeExp');

// Je cache les boutons des le début pour les afficher plus tard
submitBtn.style.display = 'none';
amendeBtn.style.display = 'none';
cotisationBtn.style.display = 'none';

// Je crée une map pret en cours 
var adhPretEnCours = new Map();

// Je récupère le bouton pour aller voir la liste
var avancer = document.getElementById('voirListe');

//Je lui attribue un évènement
avancer.addEventListener('click', avancerPage);

// J'attibue un évènement a mes 2 input en cliquant ailleurs sur la page 
numAdh.addEventListener('blur', controleNumAdh);

codeExp.addEventListener('blur', controleCodeExp);

submitBtn.addEventListener('click',submitClique);  // Une vérification au clique de mon bouton

resetBtn.addEventListener('click', function() { // J'attribue des évènements a mon bouton reset 
    msgAdh.innerHTML = '';
    msgExemplaire.innerHTML = '';
    numAdh.setAttribute('class','');
    codeExp.setAttribute('class','');
    inscriptionBtn.style.display = 'flex';
})

amendeBtn.addEventListener('click', allerPageAmende);

cotisationBtn.addEventListener('click', allerPageCotisation);

inscriptionBtn.addEventListener('click', allerPageInscription);

// Je stocke la clé prets du localStorage dans une variable
let pretsStored = localStorage.getItem('prets');
//Si la clé existe je la transforme en map et l'affecte a la map prets
if (pretsStored) {
    prets = new Map(JSON.parse(pretsStored));
}

// Pareil avec les prets en cours
let adhPretEnCoursStored = localStorage.getItem('adhPretEnCours');
if (adhPretEnCoursStored) {
    adhPretEnCours = new Map(JSON.parse(adhPretEnCoursStored));
}

// Fonction pour controler le champ numéro adhérent
function controleNumAdh(e) {
    let estValide = adhReg.test(numAdh.value);  // Je stocke dans la variable et vérifie si la valeur de numAdh correspond au regex
    let adherent = adherents.get(numAdh.value); // Je récupère les numéro et les stocke dans la variable adherent

    if (estValide && adherent) { // Si les deux variables sont rencontrées
        if (adhPretEnCours.has(numAdh.value) && adhPretEnCours.get(numAdh.value).length >= 3) { // Je vérifie en premier les prets en cours et si un adhérent n'a pas déja 3 prets en cours 
            numAdh.setAttribute('class', 'invalid'); // J'attribue une class invalid qui donne une class CSS a mon input
            msgAdh.innerHTML = 'Cet adhérent a atteint le nombre maximum de prêts en cours (3).'; // J'écris dans une span un message
            cacheValider();
            afficheAmende();
            afficheCotisation();
            afficheInscription();
        } else if (adherent.amende !== null) { // Sinon si l'amende est différent de null dans la map adhérents on bloque aussi cela veut dire qu'il a une amende
            numAdh.setAttribute('class', 'invalid'); 
            let dateCotisationAdherent = new Date(adherent.dateCotisation); // Je récupère la date de cotisation dans la map adhérent pour l'adhérent sélectionné
            let dateCotisationExpiree = new Date(dateCotisationAdherent.getFullYear() + 1, dateCotisationAdherent.getMonth(), dateCotisationAdherent.getDate()); // Je rajoute un an a la date que j'ai récupéré avant en gardant getMonth et getDate pour bien compter les mois et les jours sinon passer de 2022 a 2023 comptera toujours une erreur
            let dateActuelle = new Date(); // Je prend la date d'aujourd'hui
            let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }; // Je formate l'écriture de la date
            let dateCotisationExpireeModifier = new Intl.DateTimeFormat('fr-FR', options).format(dateCotisationExpiree); // Variable pour écrire la date formaté

            // On compare la date actuelle et la date de cotisation + 1 an
            if (dateActuelle > dateCotisationExpiree) { // Si la date actuelle est plus récente que l'expiration , l'adhérent ne cotise plus ET a une amende 
                msgAdh.innerHTML = 'La cotisation de cet adhérent a expiré depuis le : ' + dateCotisationExpireeModifier + ' et cet adhérent a une amende impayée.';
                afficheAmende();
                afficheCotisation();
                afficheInscription();
                cacheValider();
            } else { // Sinon la date est encore à jour mais il a juste une amende
                msgAdh.innerHTML = 'Cet adhérent a une amende impayée.';
                afficheAmende();
                afficheCotisation();
                afficheInscription();
                cacheValider();
            }
        } else {
            let dateCotisationAdherent = new Date(adherent.dateCotisation); // Ici on vérifie juste la cotisation sans les amendes , Voir plus haut 
            let dateCotisationExpiree = new Date(dateCotisationAdherent.getFullYear() + 1, dateCotisationAdherent.getMonth(), dateCotisationAdherent.getDate());
            let dateActuelle = new Date();

            // Formatter la date pour changer son écriture
            let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            let dateCotisationExpireeModifier = new Intl.DateTimeFormat('fr-FR', options).format(dateCotisationExpiree);

            // On compare la date actuelle et la date de cotisation + 1 an
            if (dateActuelle > dateCotisationExpiree) {
                numAdh.setAttribute('class', 'invalid');
                msgAdh.innerHTML = 'La cotisation de cet adhérent a expiré depuis le : ' + dateCotisationExpireeModifier ;
                afficheAmende();
                afficheCotisation();
                afficheInscription();
                cacheValider();
            } else { // Sinon l'adhérent remplit tous les bons facteurs et on le retrouve dans la map adhérent
                numAdh.setAttribute('class', 'valid');
                msgAdh.innerHTML = 'Numéro d\'adhérent trouvé : ' + adherent.nom + ' ' +adherent.prenom;
                cacheValider();
                afficheAmende();
                afficheCotisation();
                afficheInscription();
                return true; } // On renvoit true si on atteint cet étape 
    }} else {  // Sinon on sort du else if et les variables estValide et adherent ne sont pas trouvé ou correct et l'adhérents n'est pas trouvé ( le numéro est invalide )
        numAdh.setAttribute('class', 'invalid');
        msgAdh.innerHTML = 'Numéro d\'adhérent non valide. Veuillez vérifier le numéro ou inscrire l\'adhérent.';
        cacheValider();
        afficheAmende();
        afficheCotisation();
        afficheInscription();
        return false; // On retourne false
    }
}

// Fonction pour controler le champ code exemplaire
function controleCodeExp(e) {

    let estValide = codeExpReg.test(codeExp.value); // Je stocke dans la variable et vérifie si la valeur de codeExp correspond au regex
    
    if (estValide && exemplaires.has(codeExp.value)) { // Je vérifie dans la map exemplaires si le numéro correspondant existe
        let expInfo = exemplaires.get(codeExp.value); // Je le récupère et le stocke dans ExpInfo

        if (!expInfo.epuise) { // Si l'exemplaire n'est pas épuisé , je l'affiche avec son titre
            codeExp.setAttribute('class', 'valid');
            msgExemplaire.innerHTML = 'Numéro d\'exemplaire trouvé ! Titre de l\'album: ' + expInfo.titre;
            cacheValider();
            return true;
        } else {
            codeExp.setAttribute('class', 'invalid');
            msgExemplaire.innerHTML = 'Numéro d\'exemplaire épuisé.'; // Sinon il est épuisé
            cacheValider();
            return false;
        }
    } else { // Si je ne valide pas le 1er if je sors et l'exemplaire n'existe pas du tout
        codeExp.setAttribute('class', 'invalid');
        msgExemplaire.innerHTML = 'Numéro d\'exemplaire non trouvé. Veuillez vérifier le numéro et réessayer.';
        cacheValider();
        return false;
    }
}


// Fonction pour vérifier au clique et générer un pret avec un id automatique
function submitClique(e) {
    // Je stocke les 2 controles dans des variables
    var numAdhValide = controleNumAdh(); 
    var codeExpValide = controleCodeExp();

    if (numAdhValide && codeExpValide) { // SI les 2 controles sont effectués et passe
        
        // Ma variable pretId crée un id a chaque pret
        let pretId = genererUniqueId();

        if (!adhPretEnCours.has(numAdh.value)) {
            // Si l'adhérent n'est pas déjà dans la Map, je l'ajoute dedans avec son numéro d'adhérent et un deuxieme parametre qui est un tableau avec l'id de ses prets en cours
            adhPretEnCours.set(numAdh.value, [pretId]);
        } else {
            // Si l'adhérent est déjà dans la Map, je rajoute juste un id de pret dans le tableau
            adhPretEnCours.get(numAdh.value).push(pretId);
        }

        prets.set(pretId, { numeroAdh: numAdh.value, codeExemplaire: codeExp.value }); // Enregistrez le prêt dans la Map des prêts

        localStorage.setItem('prets', JSON.stringify([...prets]));  // J'enregistre la map prets dans le localStorage en la mettant en tableau et en les mettant en chaine de caractere JSON
        localStorage.setItem('adhPretEnCours', JSON.stringify([...adhPretEnCours]));// J'enregistre la map prets en cours dans le localStorage en la mettant en tableau et en les mettant en chaine de caractere JSON
        console.log(prets)
        console.log(adhPretEnCours)
    } else {
        // Si je ne valide pas les 2 controles au clique mon formulaire ne s'envoit pas
        e.preventDefault();
    }
}  

// Fonction pour générer un id unique , en prenant la taille de la map et en faisant +1 a chaque prets
function genererUniqueId() {
      return prets.size + 1;
}

// Fonction pour changer de page

function avancerPage() {
    window.location.href = 'liste_pret.html';
}

function allerPageAmende() {
    window.location.href = 'liste_adherents.html'; // Envoie vers la page adhérents
}

function allerPageCotisation() {
    window.location.href = 'liste_adherents.html'; 
}

function allerPageInscription() {
    window.location.href = 'liste_adherents.html'; 
}


// Fonction pour cacher le bouton Valider(submit) quand les 2 champs sont incorrect et l'afficher quand les 2 champs sont valides
function cacheValider() {
    if (numAdh.classList.contains('valid') && codeExp.classList.contains('valid')) {
        submitBtn.style.display = 'flex';
    } else {
        submitBtn.style.display = 'none';
    }
}
// Fonction pour afficher le bouton amende quand un adhérent a ses amendes différent de null
function afficheAmende() {

    let adherent = adherents.get(numAdh.value);

    if (adherent && adherent.amende !== null) {
        amendeBtn.style.display = 'flex'
    } else {
        amendeBtn.style.display = 'none'
    }
}

// Fonction pour afficher le bouton cotisation quand un adhérent a sa cotisation expirée 
function afficheCotisation() {

    let adherent = adherents.get(numAdh.value);
    

    if (adherent) {
        let dateCotisationAdherent = new Date(adherent.dateCotisation);
        let dateCotisationExpiree = new Date(dateCotisationAdherent.getFullYear() + 1, dateCotisationAdherent.getMonth(), dateCotisationAdherent.getDate());
        let dateActuelle = new Date();

        if (dateActuelle > dateCotisationExpiree) {
            cotisationBtn.style.display = 'flex';
        } else {
            cotisationBtn.style.display = 'none';
        }
    } else {
        cotisationBtn.style.display = 'none';
    }
}

// Fonction pour cacher le bouton inscription quand je trouve un adhérent déja inscris
function afficheInscription() {


    if (numAdh.classList.contains('valid')) { // J'utilise juste la class valid qui signifie que j'ai trouvé un adhérent capable de faire un pret
        inscriptionBtn.style.display = 'none';
    } else {
        inscriptionBtn.style.display ='flex';
    }
}