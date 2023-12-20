var barreRechercheAdherent = document.getElementById("barreRechercheAdherent");
var boutonPrecedentRecherche = document.getElementById("boutonPrecedentRecherche");
var boutonSuivantRecherche = document.getElementById("boutonSuivantRecherche");
var messageErreurRecherche = document.getElementById("messageErreurRecherche");
var resultatRecherche = [];

var regex = /[!@#$%^&*()[\]=,.;?":{}|<>]/g

barreRechercheAdherent.oninput= function (){
    regex.lastIndex = 0;
    if  (regex.test(barreRechercheAdherent.value)==false){
        toggleBoutons()
        messageErreurRecherche.className = "d-none";
        rechercheAdherent();
    } else {
        messageErreurRecherche.className = "text-danger";
    }
}


boutonPrecedentRecherche.onclick = dixPrecedentsRecherche;
boutonSuivantRecherche.onclick = dixSuivantsRecherche;

function dixSuivantsRecherche() {
    portionTableau +=10;
    if (portionTableau > resultatRecherche.length){
        portionTableau -= 10;
    }
    console.log(resultatRecherche);
    listeAdherents.innerHTML= "";
    affichageResultatRecherche(resultatRecherche);
}
function dixPrecedentsRecherche() {
    portionTableau -=10;
        if (portionTableau < 0){
            portionTableau = 0;
        }
    console.log(resultatRecherche);
    listeAdherents.innerHTML= "";
    affichageResultatRecherche(resultatRecherche);
}

function rechercheAdherent() {
    portionTableau = 0;
    listeAdherents.innerHTML="";
    let saisieRecherche = barreRechercheAdherent.value.toLowerCase();
    resultatRecherche = [];
    adherents.forEach((value, key) => {
        if (value.nom.toLowerCase().includes(saisieRecherche) || value.numeroAdherent.includes(saisieRecherche)) {
            resultatRecherche.push(value);
        }
    });
    affichageResultatRecherche(resultatRecherche);
}

function affichageResultatRecherche(tableauRecherche) {

    let html = "";
    let dixResultats = tableauRecherche.slice(portionTableau, portionTableau+10);
    for (let valeur of dixResultats) {
        html += '<tr class="row-cols-auto">'+
                    '<td class="col-1">'+adherentsNumero(valeur)+'</td>'+
                    '<td class="col">'+adherentsNom(valeur)+'</td>'+
                    '<td class="col d-none d-sm-table-cell">'+adherentsPrenom(valeur)+'</td>'+
                    '<td class="col-1">'+adherentsCotisation(valeur)+'</td>'+
                    '<td class="col-1">'+adherentsPret(valeur)+'</td>'+
                    '<td class="col-1">'+adherentsAmende(valeur)+'</td>'+
                '</tr>';
    }
    listeAdherents.innerHTML = html;
}

function toggleBoutons() {

    if (barreRechercheAdherent.value != "" && boutonsRecherche.classList.contains("d-none")){
        boutonsListe.classList.toggle("d-none");
        boutonsRecherche.classList.toggle("d-none");
    } else if (barreRechercheAdherent.value == "") {
        boutonsListe.classList.toggle("d-none");
        boutonsRecherche.classList.toggle("d-none");
    }

}