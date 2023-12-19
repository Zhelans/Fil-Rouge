var listeAdherents = document.getElementById("liste");
var boutonPrecedent = document.getElementById("boutonPrecedent");
var boutonSuivant = document.getElementById("boutonSuivant");


var portionTableau = 0;


window.onload = function(){affichageListeAdherents(portionTableau)};


boutonPrecedent.onclick = dixPrecedents;
boutonSuivant.onclick = dixSuivant;

function dixSuivant() {
    portionTableau +=10;
    if (portionTableau > adherents.size){
        portionTableau -= 10;
    }
    console.log(portionTableau);
    listeAdherents.innerHTML= "";
    affichageListeAdherents(portionTableau);
}
function dixPrecedents() {
    portionTableau -=10;
        if (portionTableau < 0){
            portionTableau = 0;
        }
    console.log(portionTableau);
    listeAdherents.innerHTML= "";
    affichageListeAdherents(portionTableau);
}

function affichageListeAdherents(indiceTableau) {
    let adherentsArray = Array.from(adherents.values());
    let dixAdherents = adherentsArray.slice(indiceTableau, indiceTableau+10);
    for (let valeur of dixAdherents) {
        listeAdherents.innerHTML +='<tr class="row-cols-auto">'+
                                        '<td class="col-1">'+adherentsNumero(valeur)+'</td>'+
                                        '<td class="col">'+adherentsNom(valeur)+'</td>'+
                                        '<td class="col d-none d-sm-table-cell">'+adherentsPrenom(valeur)+'</td>'+
                                        '<td class="col-1">'+adherentsCotisation(valeur)+'</td>'+
                                        '<td class="col-1">'+adherentsPret(valeur)+'</td>'+
                                        '<td class="col-1">'+adherentsAmende(valeur)+'</td>'+
                                    '</tr>';
    }
}

function adherentsNom(i) {
    return i.nom;
}

function adherentsPrenom(i) {
    return i.prenom;
}

function adherentsNumero(i) {
    return i.numeroAdherent;

}

function adherentsCotisation(i) {
    let dateCotisation = new Date(i.dateCotisation);
    if (dateCotisation > dateAnDernier()) {
        return "O";
    } else {
        return "X";
    }
}

function adherentsPret(i) {
    if (i.pret == null){
        return "X";
    } else {
        return i.pret;
    }
}

function adherentsAmende(i) {
    if (i.amende == null){
        return "X";
    } else {
        return i.amende;
    }
}

function dateAnDernier() {
    let aujourdhui = new Date();
    let anDernier = new Date();
    anDernier.setFullYear(aujourdhui.getFullYear() - 1);

    return anDernier;
}