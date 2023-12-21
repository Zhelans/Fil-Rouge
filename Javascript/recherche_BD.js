    // Recuperation du HTML
    var triAut = getElementById ('triAuteur');
    var triSer = getElementById ('triSerie');
    var barreRecherche = getElementById ('rechercheBarre');
    var carte = document.querySelectorAll('.card');
    const tabCartes = [];


    // Ajouter chaque carte au tableau
    carte.forEach(card => {
        tabCartes.push(card);
    });


    // Tri par auteur(s)
    if (triAut === checked) {
    
        // Trier les cartes en fonction du titre
        tabCartes.sort((a, b) => {
            const auteur1 = a.getElementById('idAuteur').textContent.toUpperCase();
            const auteur2 = b.getElementById('idAuteur').textContent.toUpperCase();
            if (auteur1 < auteur2) {
            return -1;
            } else if (auteur1 > auteur2) {
            return 1;
            } else {
            return 0;
            }
        });

        // Ajouter les cartes triées à la page HTML
        const cardContainer = document.querySelector('.card-container');
        tabCartes.forEach(card => {
        cardContainer.appendChild(card);
        });
    }


    // Tri par série(s)


    // Recherche
