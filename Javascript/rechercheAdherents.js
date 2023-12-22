//Appel DOM
var barreRechercheAdherent = document.getElementById("barreRechercheAdherent");
var boutonPrecedentRecherche = document.getElementById("boutonPrecedentRecherche");
var boutonSuivantRecherche = document.getElementById("boutonSuivantRecherche");
var messageErreurRecherche = document.getElementById("messageErreurRecherche");

//Variable des résultats la recherche : un tableau vide.
var resultatRecherche = [];

//regex pour contrôler les caractères spéciaux.
var regex = /[!@#$%^&*()[\]=,.;?":{}|<>]/g


//Dès qu'on tape une chose dans la barre de recherche, ça déclenche une recherche.
barreRechercheAdherent.oninput= function (){
    console.log(resultatRecherche);
    //Pour être sûr que le regex teste bien à partir du premier terme de la chaine.
    regex.lastIndex = 0;
    //Si le test est faux, on cherche.
    if  (regex.test(barreRechercheAdherent.value)==false){
        toggleBoutons();
        messageErreurRecherche.className = "d-none";
        rechercheAdherent();
    //Si le test est vrai, on désactive la recherche.
    } else {
        disableBoutons();
        messageErreurRecherche.className = "text-danger";
    }
}

//Evénements des boutons.
boutonPrecedentRecherche.onclick = dixPrecedentsRecherche;
boutonSuivantRecherche.onclick = dixSuivantsRecherche;


//--------------------------FONCTIONS----------------------------//

//-----------Fonctions des boutons-----------//

/**
 * Affiche les 10 valeurs suivantes. Pour les résultats de la recherche.
 */
function dixSuivantsRecherche() {
    //On ajoute 10 mais on peut mettre n'importe quel nombre.
    portionTableau +=10;
     //Le max est la taille ou la longueur de ce qu'on veut naviguer.
    if (portionTableau > resultatRecherche.length){
        //Une fois au max, on enlève le nombre qu'on vient d'ajouter pour ne pas pouvoir avancer.
        portionTableau -= 10;
    }
    //réinitialise la liste et la rempli avec les nouvelles valeurs
    listeAdherents.innerHTML= "";
    affichageResultatRecherche(resultatRecherche);
}

/**
 * Affiche les 10 valeurs précédentes. Pour les résultats de la recherche.
 */
function dixPrecedentsRecherche() {
    //On enlève 10 mais on peut mettre n'importe quel nombre.
    portionTableau -=10;
        //Le minimum est toujours 0.
        if (portionTableau < 0){
        //On remet n'importe quel nombre négatif à zéro.
            portionTableau = 0;
        }
    //Réinitialise la liste et la rempli avec les nouvelles valeurs.
    listeAdherents.innerHTML= "";
    affichageResultatRecherche(resultatRecherche);
}

/**
 * Active et désactive les boutons recherche en fonction du test regex.
 */
function toggleBoutons() {
    if (barreRechercheAdherent.value != ""){
        boutonsListe.classList.add("d-none");
        boutonsRecherche.classList.remove("d-none");
    } else {
        boutonsListe.classList.remove("d-none");
        boutonsRecherche.classList.add("d-none");
    }
}

/**
 * Désactive les boutons recherche.
 */
function disableBoutons() {
    boutonsListe.classList.remove("d-none");
    boutonsRecherche.classList.add("d-none");
}

//-----------Fonctions de la recherche-----------//


function rechercheAdherent() {
    portionTableau = 0;
    listeAdherents.innerHTML="";
    let saisieRecherche = barreRechercheAdherent.value.toLowerCase();
    resultatRecherche = [];
    
    var sourceAdherents;
    if (localStorage.getItem('adherents')) {
        let adherentsArray = JSON.parse(localStorage.getItem('adherents'));
        sourceAdherents = new Map(adherentsArray);
    } else {
        sourceAdherents = adherents;
    }
    
    sourceAdherents.forEach((value, key) => {
        if (value.nom.toLowerCase().includes(saisieRecherche) || value.numeroAdherent.includes(saisieRecherche)) {
            resultatRecherche.push(value);
        }
    });
    
    affichageResultatRecherche(resultatRecherche);
}

/**
 * Affiche le contenu d'un tableau en remplissant chaque étage avec du HTML.
 * @param {Array.<object>} tableauRecherche Nouveau tableau contenant des valeurs.
 */
function affichageResultatRecherche(tableauRecherche) {
    let html = "";
    //On découpe de tableau des résultat
    let dixResultats = tableauRecherche.slice(portionTableau, portionTableau+10);
    //boucle qui rempli la liste en concaténant chaque étage.
    for (let valeur of dixResultats) {
        //Au lieu de concaténer chaque étage à chaque boucle, on le rajoute à la valeur de "html".
        html += '<tr id="'+adherentsNumero(valeur)+'" class="row-cols-auto" onclick="afficherDetailAdherent(adherents.get(this.id))">'+
                    '<td class="col-1">'+adherentsNumero(valeur)+'</td>'+
                    '<td class="col">'+adherentsNom(valeur)+'</td>'+
                    '<td class="col d-none d-sm-table-cell">'+adherentsPrenom(valeur)+'</td>'+
                    '<td class="col-1">'+adherentsCotisation(valeur)+'</td>'+
                    '<td class="col-1">'+adherentsPret(valeur)+'</td>'+
                    '<td class="col-1">'+adherentsAmende(valeur)+'</td>'+
                '</tr>';
    }
    //Pour afficher plus que le dernier résultat.
    listeAdherents.innerHTML = html;
}