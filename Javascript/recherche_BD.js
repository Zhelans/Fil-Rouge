    // Recuperation du HTML
    var triAut = document.getElementById ('triAuteur');
    var triSer = document.getElementById ('triSerie');
    var barreRecherche = document.getElementById ('rechercheBarre');
    var carte = document.querySelectorAll('.card');
    const tabCartes = [];


    // Ajouter chaque carte au tableau
    carte.forEach(card => {
        tabCartes.push(card);
console.log(tabCartes)
    });

    // Extraire le texte de l'auteur de chaque carte
    let auteurs = tabCartes.map(card => {
        return card.querySelector('#idAuteur').textContent;
    });

    // Trier le tableau d'auteurs
    auteurs.sort((a, b) => {
        if (a < b) {
            return 1;
        } else if (a > b) {
            return -1;
        } else {
            return 0;
        }
    });

    // Trier le tableau tabCartes en fonction des auteurs
    tabCartes.sort((a, b) => {
        let auteurA = a.querySelector('#idAuteur').textContent;
        let auteurB = b.querySelector('#idAuteur').textContent;

        if (auteurA < auteurB) {
            return -1;
        } else if (auteurA > auteurB) {
            return 1;
        } else {
            return 0;
        }
    });

    // Obtenir l'élément parent des cartes
    let parent = document.querySelector('card-container');

    // Ajouter chaque carte du tableau trié à l'élément parent
    tabCartes.forEach(card => {
        parent.appendChild(card);
    });

    // // Tri par auteur(s)
    // if (triAut.checked) {
    
    //     // Trier les cartes en fonction du titre
    //     tabCartes.sort((a, b) => {
    //         let auteur1 = a.getElementById('idAuteur').textContent.toUpperCase();
    //         let auteur2 = b.getElementById('idAuteur').textContent.toUpperCase();
    //         if (auteur1 < auteur2) {
    //         return -1;
    //         } else if (auteur1 > auteur2) {
    //         return 1;
    //         } else {
    //         return 0;
    //         }
    //     });

        // // Ajouter les cartes triées à la page HTML
        // const cardContainer = document.querySelector('.card-container');
        // tabCartes.forEach(card => {
        // cardContainer.appendChild(card);
        // });
    // }


    // Tri par série(s)


    // Recherche
