var liste = document.getElementById('liste');

var table = document.getElementById('table');

var tNom = [];
var tPrenom = [];

// Utilisez forEach pour itérer sur les entrées de la map
adherents.forEach(function (value) {
    tNom.push(value.nom);
    tPrenom.push(value.prenom);
});

function ajouterAuTableau(donnees,nom, prenom) {

    donnees.forEach(function (element, i) {

        var row = liste.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);

        cell1.innerHTML = element.idPret;
        cell2.innerHTML = element.codeExp;
        cell3.innerHTML = element.numeroAdh;
        cell4.innerHTML = nom[i-1];
        cell5.innerHTML = prenom[i-1];
    });
}

// Ajouter les données des deux tableaux au tableau HTML
ajouterAuTableau(prets,tNom,tPrenom);
