//Appel DOM
var numeroAdherent = document.getElementById("numeroAdherent");
var nom = document.getElementById("nom");
var prenom = document.getElementById("prenom");
var adresse = document.getElementById("adresse");
var telephone = document.getElementById("telephone");
var dateCotisation = document.getElementById("dateCotisation");
var cotisation = document.getElementById("cotisation");
var pret = document.getElementById("pret");
var amende = document.getElementById("amende");
var boutonModifier = document.getElementById("boutonModifier");
var boutonConfirmer = document.getElementById("boutonConfirmer");
var boutonRetour = document.getElementById("boutonRetour");
var boutonCotiser = document.getElementById("boutonCotiser");
var boutonReglementAmende = document.getElementById("boutonReglementAmende");
var boutonGererPret = document.getElementById("boutonGererPret");
var table = document.getElementById("table");


//Evénements des boutons.
boutonModifier.onclick = enableModif;
boutonRetour.onclick = function(){location.reload()};
boutonCotiser.onclick = cotiser;
boutonReglementAmende.onclick = reglerAmende;
boutonGererPret.onclick =function(){window.location.href ="liste_pret.html";};





//--------------------------FONCTIONS----------------------------//


//-----------Fonctions des boutons-----------//

/**
 * Permet la réactivation de la cotisation.
 */
function cotiser() {
    //Prend le local storage
    if (localStorage.getItem('adherents')) {
        let adherentsArray = JSON.parse(localStorage.getItem('adherents'));
        var adherents = new Map(adherentsArray);
    }
    let adherent = adherents.get(numeroAdherent.value);
    // Ouvrir la fenêtre de confirmation
    if (confirm("voulez-vous vraiment cotiser?")) {
        alert("Encaissez la cotisation");
        // Si l'utilisateur confirme, définir dateCotisation à la date d'aujourd'hui formatée en ISO
        let dateAujourdhui = new Date();
        adherent.dateCotisation = dateAujourdhui.toISOString().slice(0, 10);
        // Mettre à jour l'adhérent dans la map
        adherents.set(numeroAdherent.value, adherent);
        // Mettre à jour le localStorage
        localStorage.setItem('adherents', JSON.stringify(Array.from(adherents.entries())));
        alert("Votre cotisation vient d'être renouvelé.");
   }else{
     alert("vous venez d'annuler la cotisation");
   }
   location.reload();
}

/**
 * Permet le réglement des amendes.
 */
function reglerAmende() {
    //Prend le local storage
    if (localStorage.getItem('adherents')) {
        let adherentsArray = JSON.parse(localStorage.getItem('adherents'));
        var adherents = new Map(adherentsArray);
    }
    let adherent = adherents.get(numeroAdherent.value);
    // Ouvre la fenêtre de confirmation
    if (confirm("voulez-vous vraiment encaisser l'amende ?")) {
        alert("Encaissez l'amende");
        // Si l'utilisateur confirme, définir amende à null
        adherent.amende = null;
        // Mettre à jour l'adhérent dans la map
        adherents.set(numeroAdherent.value, adherent);
        // Mettre à jour le localStorage
        localStorage.setItem('adherents', JSON.stringify(Array.from(adherents.entries())));
        alert("Vous venez de régler l'amende");
   }else{
        alert("vous venez d'annuler l'encaissement");
   }
   location.reload();
}

/**
 * Conditionne les apparitions des boutons dans le détails en fonctions des états.
 */
function conditionApparitionBoutonsCRG() {
    //Condition du bouton cotisation
    if (cotisation.innerText == "O") {
        boutonCotiser.classList.add("d-none");
    } else {
        boutonCotiser.classList.remove("d-none");
    }
    //Condition du bouton prets
    if (pret.innerText == "X") {
        boutonGererPret.classList.add("d-none");
    } else {
        boutonGererPret.classList.remove("d-none");
    }
    //Condition du bouton réglement amende
    if (amende.innerText == "X") {
        boutonReglementAmende.classList.add("d-none");
    } else {
        boutonReglementAmende.classList.remove("d-none");
    }
}

//-----------Fonctions de la modification-----------//

/**
 * Rempli le formulaire du détail de l'adherent.
 * @param {*} adherent 
 */
function afficherDetailAdherent(adherent) {
    //Enlève le tableau adhérent et montre le détail.
    detailAdherent.classList.remove("d-none");
    table.classList.add("d-none");
    //Change le H1 avec le numéro d'adhérent actuel.
    modifH1(adherent.numeroAdherent);
    //charge les valeurs dans le formulaire détail.
    numeroAdherent.value = adherent.numeroAdherent;
    nom.value = adherent.nom;
    prenom.value = adherent.prenom;
    adresse.value = adherent.adresse;
    telephone.value = adherent.telephone;
    dateCotisation.value = adherent.dateCotisation;
    cotisation.innerText = adherentsCotisation(adherent);
    pret.innerText = adherentsPret(adherent);
    amende.innerText = adherentsAmende(adherent);
    //Fait apparaitre les boutons.
    conditionApparitionBoutonsCRG();
}

/**
 * Modifie le h1 et met le numéro adhérents.
 * @param {number} adherent 
 */
function modifH1(adherent) {
    let h1 = document.getElementById("titre");
    h1.innerText = "détail adhérent n°"+adherent;
}

/**
 * Active la modification du formulaire. 
 */
function enableModif() {
    let inputs = document.querySelectorAll('#adherentForm input');
    //change le bouton modifier en confirmer.
    boutonModifier.classList.add("d-none");
    boutonConfirmer.classList.remove("d-none");
    //abonne le bouton confirmer.
    boutonConfirmer.onclick = confirmer;
    //permet la modification de tous les champs.
    for (let input of inputs) {
        input.disabled = false;
    }
    //désactive la modification du numéro adhérent et de la date cotisation.
    numeroAdherent.disabled = true;
    dateCotisation.disabled = true;
}

/**
 *  Confirme les modifications faites dans le formulaire. 
 */
function confirmer(){
    // Récupérer les données les plus récentes du localStorage
    if (localStorage.getItem('adherents')) {
        let adherentsArray = JSON.parse(localStorage.getItem('adherents'));
        var adherents = new Map(adherentsArray);
    }
    //controles
    let nomValide = valideEtFormateNomPrenom(nom.value);
    let prenomValide = valideEtFormateNomPrenom(prenom.value);
    let telephoneValide = validateEtFormateTelephone(telephone.value);
    //Si controle valide, on met à jour le local storage avec les valeurs saisies.
    let adherent = adherents.get(numeroAdherent.value);
    if (nomValide && prenomValide && telephoneValide) {
        
        adherent.nom = nomValide;
        adherent.prenom = prenomValide;
        adherent.adresse = adresse.value;
        adherent.telephone = telephoneValide;
        adherent.dateCotisation = dateCotisation.value;

        adherents.set(numeroAdherent.value, adherent);
        localStorage.setItem('adherents', JSON.stringify(Array.from(adherents.entries())));
        let inputs = document.querySelectorAll('#adherentForm input');
        boutonConfirmer.classList.add("d-none");
        detailAdherent.classList.add("d-none");
        table.classList.remove("d-none");
        for (let input of inputs) {
            input.disabled = true;
        }
            location.reload();
    }
}

/**
 * Controle le nom et le prénom.
 * @param {*} input 
 * @returns false ou une chaine de caractères
 */
function valideEtFormateNomPrenom(input) {
    // Vérifie si l'entrée est valide (lettres, espaces et tirets uniquement)
    if (!/^[a-zA-Z- ]*$/.test(input)) {
        alert("Entrée invalide. Seules les lettres, les espaces et les tirets sont autorisés pour le nom et prénom");
        return false;
    }
    //Minimum 3 lettres de long.
    if (input.length < 3){
        alert("Entrée invalide. Votre saisie doit faire au moins 3 lettres");
        return false;
    }
    // Met la première lettre en majuscule et le reste en minuscule
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}

/**
 * Valide le numéro de téléphone
 * @param {*} input 
 * @returns false ou chaine de caractère
 */
function validateEtFormateTelephone(input) {
    //Supprime tous les caractères non numériques
    let nombreSeulement = input.replace(/[^\d]/g, "");
    //Vérifie si le numéro contient exactement 10 chiffres
    if (nombreSeulement.length !== 10) {
        alert("Le numéro de téléphone doit contenir exactement 10 chiffres.");
        return false;
    }
    //Formate le numéro en paires de chiffres séparées par des points
    let formattedNumber = "";
    for (let i = 0; i < nombreSeulement.length; i += 2) {
            formattedNumber += nombreSeulement.slice(i, i + 2) + ".";
    }
    //Supprime le dernier point et retourne le numéro formaté
    return formattedNumber.slice(0, -1);
}

