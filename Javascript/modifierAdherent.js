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
        // Si l'utilisateur confirme, définir dateCotisation à la date d'aujourd'hui formatée en ISO
        let dateAujourdhui = new Date();
        adherent.dateCotisation = dateAujourdhui.toISOString().slice(0, 10);
        // Mettre à jour l'adhérent dans la map
        adherents.set(numeroAdherent.value, adherent);
        // Mettre à jour le localStorage
        localStorage.setItem('adherents', JSON.stringify(Array.from(adherents.entries())));
   }else{
     alert("vous venez d'annuler la cotisation");
   }
   location.reload();
}



function reglerAmende() {
    // Empêcher le rechargement de la page

    if (localStorage.getItem('adherents')) {
        let adherentsArray = JSON.parse(localStorage.getItem('adherents'));
        var adherents = new Map(adherentsArray);
    }

    let adherent = adherents.get(numeroAdherent.value);
    // Ouvrir la fenêtre de confirmation
    if (confirm("voulez-vous vraiment encaisser l'amende ?")) {
        // Si l'utilisateur confirme, définir amende à null
        adherent.amende = null;
        // Mettre à jour l'adhérent dans la map
        adherents.set(numeroAdherent.value, adherent);
        // Mettre à jour le localStorage
        localStorage.setItem('adherents', JSON.stringify(Array.from(adherents.entries())));
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

    let adherent = adherents.get(numeroAdherent.value);
    adherent.nom = nom.value;
    adherent.prenom = prenom.value;
    adherent.adresse = adresse.value;
    adherent.telephone = telephone.value;
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