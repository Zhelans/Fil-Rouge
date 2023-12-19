var barreRechercheAdherent= document.getElementById("barreRechercheAdherent");


barreRechercheAdherent.oninput= rechercheAdherent;


function rechercheAdherent() {
    listeAdherents.innerHTML="";
    let saisieRecherche = this.value.toLowerCase();
    let resultatRecherche = [];
    adherents.forEach((value, key) => {
        if (value.nom.toLowerCase().includes(saisieRecherche) || value.numeroAdherent.includes(saisieRecherche)) {
            resultatRecherche.push(value);
        }
    });
    affichageResultatRecherche(resultatRecherche);

}

function affichageResultatRecherche(tableauRecherche) {

    let html = "";
    let dixResultats = tableauRecherche.slice(0, 10);
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