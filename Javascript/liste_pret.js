var liste = document.getElementById('liste');

function afficherListePrets() {
    
    liste.innerHTML = ''; // Efface le contenu actuel de la table

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
      cellNumeroAdherent.innerHTML = pret.numeroAdherent;

      // Ajoutez le nom et le prénom de l'adhérent si disponible
      if (adherents.has(pret.numeroAdherent)) {
        let adherent = adherents.get(pret.numeroAdherent);
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
