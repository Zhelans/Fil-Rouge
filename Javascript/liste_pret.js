var liste = document.getElementById('liste');

var retour = document.getElementById('retourArriere')

retour.addEventListener('click', retourPage)


let pretsStored = localStorage.getItem('prets');
if (pretsStored) {
    prets = new Map(JSON.parse(pretsStored));
} else {
    prets = new Map();
}

let adhPretEnCoursStored = localStorage.getItem('adhPretEnCours');
if (adhPretEnCoursStored) {
    adhPretEnCours = new Set(JSON.parse(adhPretEnCoursStored));
}


function afficherListePrets() {
    
    // Parcourt la Map des prêts
    prets.forEach(function (pret, pretId) {
      let row = liste.insertRow();
      let cellId = row.insertCell(0);
      let cellCodeExemplaire = row.insertCell(1);
      let cellNumeroAdherent = row.insertCell(2);
      let cellNom = row.insertCell(3);
      let cellPrenom = row.insertCell(4);

      cellId.innerHTML = pretId;
      cellCodeExemplaire.innerHTML = pret.codeExemplaire;
      cellNumeroAdherent.innerHTML = pret.numeroAdh;

      // Ajoutez le nom et le prénom de l'adhérent si disponible
      if (adherents.has(pret.numeroAdh)) {
        let adherent = adherents.get(pret.numeroAdh);
        cellNom.innerHTML = adherent.nom;
        cellPrenom.innerHTML = adherent.prenom;
      } else {
        cellNom.innerHTML = 'N/A';
        cellPrenom.innerHTML = 'N/A';
      }
    });
  }

  // Appel de la fonction pour afficher la liste des prêts au chargement de la page
  afficherListePrets();

  function retourPage() {
    window.location.href = 'enregistrement_pret.html';
}
