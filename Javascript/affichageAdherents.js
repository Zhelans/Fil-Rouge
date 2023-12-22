//Appel DOM
var listeAdherents = document.getElementById("liste");
var boutonPrecedent = document.getElementById("boutonPrecedent");
var boutonSuivant = document.getElementById("boutonSuivant");

//Variable dont la valeur est le point de départ de l'affichage du tableau.
var portionTableau = 0;
var adherentsArray = [];


if (!localStorage.getItem('adherents')) {
    var adherentsArray = Array.from(adherents.entries());
    var adherentsJSON = JSON.stringify(adherentsArray);
    localStorage.setItem('adherents', adherentsJSON);
}

//Initialisation de l'affichage
window.onload = function(){affichageListeAdherents(portionTableau); };

//Evénements
boutonPrecedent.onclick = dixPrecedents;
boutonSuivant.onclick = dixSuivant;




//--------------------------FONCTIONS----------------------------//

//---Fonctions des boutons précédents/suivants---//

/**
 * Affiche les 10 valeurs suivantes.
 */
function dixSuivant() {
    //On ajoute 10 mais on peut mettre n'importe quel nombre.
    portionTableau +=10;
    //Le max est la taille ou la longueur de ce qu'on veut naviguer.
    if (portionTableau > adherents.size){
        //Une fois au max, on enlève le nombre qu'on vient d'ajouter pour ne pas pouvoir avancer.
        portionTableau -= 10;
    }
    //réinitialise la liste et la rempli avec les nouvelles valeurs
    listeAdherents.innerHTML= "";
    affichageListeAdherents(portionTableau);
}

/**
 * Affiche les 10 valeurs précédentes. 
 */
function dixPrecedents() {
    //On enlève 10 mais on peut mettre n'importe quel nombre.
    portionTableau -=10;
    //Le minimum est toujours 0.
    if (portionTableau < 0){
        //On remet n'importe quel nombre négatif à zéro.
        portionTableau = 0;
    }
    //réinitialise la liste et la rempli avec les nouvelles valeurs
    listeAdherents.innerHTML= "";
    affichageListeAdherents(portionTableau);
}

//---Fonctions qui affichent les données---//

/**
 * Affiche le contenu d'un tableau en remplissant chaque étage avec du HTML
 * @param {number} indiceTableau Position dans un tableau 
 */
function affichageListeAdherents(indiceTableau) {
    //On copie des valeurs de "adherents.js" dans un tableau.
    if (localStorage.getItem('adherents')) {
        let localStorageArray = JSON.parse(localStorage.getItem('adherents'));
        adherentsArray = new Map(localStorageArray);

    } else {
        adherentsArray = adherents;

    }

    let valuesArray = Array.from(adherentsArray.values());

    //On ne prend que 10 valeurs à la fois
    let dixAdherents = valuesArray.slice(indiceTableau, indiceTableau+10)
    //boucle qui rempli la liste en concaténant chaque étage.
    for (let valeur of dixAdherents) {
        listeAdherents.innerHTML +='<tr id="'+adherentsNumero(valeur)+'" class="row-cols-auto" onclick="afficherDetailAdherent(adherentsArray.get(this.id))">'+
                                        '<td class="col-1">'+adherentsNumero(valeur)+'</td>'+
                                        '<td class="col">'+adherentsNom(valeur)+'</td>'+
                                        '<td class="col d-none d-sm-table-cell">'+adherentsPrenom(valeur)+'</td>'+
                                        '<td class="col-1">'+adherentsCotisation(valeur)+'</td>'+
                                        '<td class="col-1">'+adherentsPret(valeur)+'</td>'+
                                        '<td class="col-1">'+adherentsAmende(valeur)+'</td>'+
                                    '</tr>';
    }
}

/**
 * 
 * @param {number} valeur 
 * @returns retourne nom de l'adhérent de la clé valeur en paramètre
 */
function adherentsNom(i) {
    console.log(i.nom);
    console.log(i.prenom);
    console.log(i.amende);
    console.log(i.pret);

    return i.nom;
}

/**
 * 
 * @param {number} valeur 
 * @returns retourne prénom de l'adhérent de la clé valeur en paramètre
 */
function adherentsPrenom(i) {
    return i.prenom;
}

/**
 * 
 * @param {number} valeur 
 * @returns retourne numéro de l'adhérent de la clé valeur en paramètre
 */
function adherentsNumero(i) {
    return i.numeroAdherent;
}

/**
 * 
 * @param {number} valeur 
 * @returns retourne un O/X ou un icone.
 */
function adherentsCotisation(i) {
    let dateCotisation = new Date(i.dateCotisation);
    if (dateCotisation > dateAnDernier()) {
        return "O";
    } else {
        return "X";
    }
}

/**
 * 
 * @param {number} valeur 
 * @returns retourne un X ou une instance de prêt.
 */
function adherentsPret(i) {
    if (i.pret == null){
        return "X";
    } else {
        return i.pret;
    }
}

/**
 * 
 * @param {number} valeur 
 * @returns retourne un X ou un certains montant d'amende.
 */
function adherentsAmende(i) {
    if (i.amende == null){
        return "X";
    } else {
        return i.amende;
    }
}

/**
 *  
 * @returns la date exacte de l'an dernier
 */
function dateAnDernier() {
    //prend deux fois la même temps, enlève un an à la deuxième.
    let aujourdhui = new Date();
    let anDernier = new Date();
    anDernier.setFullYear(aujourdhui.getFullYear() - 1);

    return anDernier;
}