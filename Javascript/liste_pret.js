var liste = document.getElementById('liste');


    let pretsStored = localStorage.getItem('prets');
    if (pretsStored) {
        prets = new Map(JSON.parse(pretsStored));
    } else {
        prets = new Map();
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
      let adherentTrouve = null;

      for (let adherent of adherents.values()) {
          if (adherent.numeroAdherent === pret.numeroAdh) {
              adherentTrouve = adherent;
              break;
          }
      }
      
      if (adherentTrouve) {
          cellNom.innerHTML = adherentTrouve.nom;
          cellPrenom.innerHTML = adherentTrouve.prenom;
      } else {
          cellNom.innerHTML = 'N/A';
          cellPrenom.innerHTML = 'N/A';
      }
    });
  }

  // Appel de la fonction pour afficher la liste des prêts au chargement de la page
  afficherListePrets();
