var liste = document.getElementById('liste');  // Je récupère le tbody de la table

var retour = document.getElementById('retourArriere'); // Je récupère le bouton retour

retour.addEventListener('click', retourPage); // Je lui assigne un évènement

// Je stocke la clé prets du localStorage dans une variable
let pretsStored = localStorage.getItem('prets');
//Si la clé existe je la transforme en map et l'affecte a la map prets
if (pretsStored) {
    prets = new Map(JSON.parse(pretsStored));
}

// Pareil mais avec les prets en cours
let adhPretEnCoursStored = localStorage.getItem('adhPretEnCours');

if (adhPretEnCoursStored) {
    adhPretEnCours = new Map(JSON.parse(adhPretEnCoursStored));
}

// Function pour afficher ma liste des prets dans le tableau
function afficherListePrets() {
    
    // Parcourt la Map des prêts avec en parametre la map pret et le numéro d'id du pret
    prets.forEach(function (pret, pretId) {
      let row = liste.insertRow(); // Je crée une ligne
      let cellId = row.insertCell(0); // Et j'insere le nombre de cellule nécéssaires
      let cellCodeExemplaire = row.insertCell(1);
      let cellNumeroAdherent = row.insertCell(2);
      let cellNom = row.insertCell(3);
      let cellPrenom = row.insertCell(4);

      cellId.innerHTML = pretId;  // J'écris dans les cellules le pretId qui s'incrémente
      cellCodeExemplaire.innerHTML = pret.codeExemplaire; // Idem avec le code exemplaire que je récupère dans la map pret qui est mis en localStorage et qui se remplit en remplissant les champs du formulaire
      cellNumeroAdherent.innerHTML = pret.numeroAdh;

      // Ajoutez le nom et le prénom de l'adhérent si disponible
      if (adherents.has(pret.numeroAdh)) { // Si la map adhérents à la valeur du numéro adhérent de la map pret on peut retrouver son nom et prénom
        let adherent = adherents.get(pret.numeroAdh); // Je récupère les numéro et les stocke
        cellNom.innerHTML = adherent.nom; // Je prend le nom de l'adhérent stocké
        cellPrenom.innerHTML = adherent.prenom;
      } else {
        cellNom.innerHTML = 'N/A'; // Sinon je ne peux pas écrire son nom 
        cellPrenom.innerHTML = 'N/A';
      }
    });
  }

  // Appel de ma fonction pour afficher la liste des prêts
  afficherListePrets();

  // Fonction pour retourner a la page d'enregistrement des prets
  function retourPage() {
    window.location.href = 'enregistrement_pret.html';
}
