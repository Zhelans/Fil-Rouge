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

boutonModifier.onclick = enableModif;
boutonRetour.onclick = function(){location.reload()};
boutonCotiser.onclick = cotiser;
boutonReglementAmende.onclick = reglerAmende;
boutonGererPret.onclick =function(){window.location.href ="liste_pret.html";};

function cotiser() {
    // Empêcher le rechargement de la page

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

function reglerAmende() {
    if (localStorage.getItem('adherents')) {
        let adherentsArray = JSON.parse(localStorage.getItem('adherents'));
        var adherents = new Map(adherentsArray);
    }

    let adherent = adherents.get(numeroAdherent.value);
    // Ouvrir la fenêtre de confirmation
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

function conditionApparitionBoutonsCRG() {
    if (cotisation.innerText == "O") {
        boutonCotiser.classList.add("d-none");
    } else {
        boutonCotiser.classList.remove("d-none");
    }

    if (pret.innerText == "X") {
        boutonGererPret.classList.add("d-none");
    } else {
        boutonGererPret.classList.remove("d-none");
    }

    if (amende.innerText == "X") {
        boutonReglementAmende.classList.add("d-none");
    } else {
        boutonReglementAmende.classList.remove("d-none");
    }
}

function afficherDetailAdherent(adherent) {
    
    detailAdherent.classList.remove("d-none");
    table.classList.add("d-none");
    modifH1(adherent.numeroAdherent);
    numeroAdherent.value = adherent.numeroAdherent;
    nom.value = adherent.nom;
    prenom.value = adherent.prenom;
    adresse.value = adherent.adresse;
    telephone.value = adherent.telephone;
    dateCotisation.value = adherent.dateCotisation;
    cotisation.innerText = adherentsCotisation(adherent);
    pret.innerText = adherentsPret(adherent);
    amende.innerText = adherentsAmende(adherent);
    conditionApparitionBoutonsCRG()
}

function modifH1(adherent) {
    let h1 = document.getElementById("titre");
    h1.innerText = "détail adhérent n°"+adherent;
}

function enableModif() {
    
    let inputs = document.querySelectorAll('#adherentForm input');
    boutonModifier.classList.add("d-none");
    boutonConfirmer.classList.remove("d-none");
    boutonConfirmer.onclick = confirmer;
    for (let input of inputs) {
        input.disabled = false;
    }
    numeroAdherent.disabled = true;
    dateCotisation.disabled = true;
}

function confirmer(){
    // Récupérer les données les plus récentes du localStorage
    if (localStorage.getItem('adherents')) {
        let adherentsArray = JSON.parse(localStorage.getItem('adherents'));
        var adherents = new Map(adherentsArray);
    }
    let nomValide = valideEtFormateNomPrenom(nom.value);
    let prenomValide = valideEtFormateNomPrenom(prenom.value);
    let telephoneValide = validateEtFormateTelephone(telephone.value);


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


function valideEtFormateNomPrenom(input) {
    // Vérifie si l'entrée est valide (lettres, espaces et tirets uniquement)
    if (!/^[a-zA-Z- ]*$/.test(input)) {
        alert("Entrée invalide. Seules les lettres, les espaces et les tirets sont autorisés pour le nom et prénom");
        return false;
    }

    if (input.length < 3){
        alert("Entrée invalide. Votre saisie doit faire au moins 3 lettres");
        return false;
    }

    // Met la première lettre en majuscule et le reste en minuscule
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}

function validateEtFormateTelephone(input) {
    // Supprime tous les caractères non numériques
    let nombreSeulement = input.replace(/[^\d]/g, "");

    // Vérifie si le numéro contient exactement 10 chiffres
    if (nombreSeulement.length !== 10) {
        alert("Le numéro de téléphone doit contenir exactement 10 chiffres.");
        return false;
    }
    
    // Formate le numéro en paires de chiffres séparées par des points
    let formattedNumber = "";
    for (let i = 0; i < nombreSeulement.length; i += 2) {
            formattedNumber += nombreSeulement.slice(i, i + 2) + ".";
    }

    // Supprime le dernier point et retourne le numéro formaté
    return formattedNumber.slice(0, -1);
}

