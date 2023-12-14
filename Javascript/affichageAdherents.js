var listeAdherents = document.getElementById("liste");


window.onload = affichageListeAdherents;

function affichageListeAdherents() {
    for (let valeur of adherents.values()) {
        listeAdherents.innerHTML +='<tr>'+
                                        '<td>'+adherentsNumero(valeur)+'</td>'+
                                        '<td>'+adherentsNom(valeur)+'</td>'+
                                        '<td>'+adherentsPrenom(valeur)+'</td>'+
                                        '<td>'+adherentsCotisation(valeur)+'</td>'+
                                        '<td>'+adherentsPret(valeur)+'</td>'+
                                        '<td>'+adherentsAmende(valeur)+'</td>'+
                                    '</tr>' ;
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
    return i.dateCotisation;
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