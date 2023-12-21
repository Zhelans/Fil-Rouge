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
var table = document.getElementById("table");

if (localStorage.getItem('adherents')) {
    let adherentsArray = JSON.parse(localStorage.getItem('adherents'));
    adherents = new Map(adherentsArray);
}

boutonModifier.onclick = enableModif;

boutonRetour.onclick = function(){location.reload()};

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
}

function modifH1(adherent) {
    let h1 = document.getElementById("titre");
    h1.innerText = "détail adhérent n°"+adherent;
}

function enableModif() {
    
    let inputs = document.querySelectorAll('#adherentForm input');
    boutonModifier.classList.add("d-none");
    boutonConfirmer.classList.remove("d-none");
    boutonConfirmer.onclick = confirm;
    for (let input of inputs) {
        input.disabled = false;
    }
    numeroAdherent.disabled = true;
    dateCotisation.disabled = true;
}

function confirm(){
    let adherent = adherents.get(numeroAdherent.value);
    adherent.nom = nom.value;
    adherent.prenom = prenom.value;
    adherent.adresse = adresse.value;
    adherent.telephone = telephone.value;
    adherent.dateCotisation = dateCotisation.value;
    localStorage.setItem('adherents', JSON.stringify(Array.from(adherents.entries())));

    if (localStorage.getItem('adherents')) {
        let adherentsArray = JSON.parse(localStorage.getItem('adherents'));
        adherents = new Map(adherentsArray);
    }

    let inputs = document.querySelectorAll('#adherentForm input');
    boutonConfirmer.classList.add("d-none");
    detailAdherent.classList.add("d-none");
    table.classList.remove("d-none");
    for (let input of inputs) {
        input.disabled = true;
    }
    location.reload();
}