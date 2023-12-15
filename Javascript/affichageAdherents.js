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
    let DixAdherents = adherentsArray.slice(indiceTableau, indiceTableau+10);
    for (let valeur of DixAdherents) {
        listeAdherents.innerHTML +='<tr>'+
                                        '<td>'+adherentsNumero(valeur)+'</td>'+
                                        '<td>'+adherentsNom(valeur)+'</td>'+
                                        '<td>'+adherentsPrenom(valeur)+'</td>'+
                                        '<td>'+adherentsCotisation(valeur)+'</td>'+
                                        '<td>'+adherentsPret(valeur)+'</td>'+
                                        '<td>'+adherentsAmende(valeur)+'</td>'+
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
        return "Cotise";
    } else {
        return "Ne cotise pas";
    }
}

function adherentsPret(i) {
    if (i.pret == null){
        return "Aucun Prêt";
    } else {
        return i.pret;
    }
}

function adherentsAmende(i) {
    if (i.amende == null){
        return "Aucune amende";
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