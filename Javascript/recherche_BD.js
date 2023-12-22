    // Tri par auteur(s)
    document.getElementById('triAuteur').addEventListener('change', function() {
        if (this.checked) {
            var container = document.querySelector('.card-container');
            var cards = Array.from(container.getElementsByClassName('card'));
            cards.sort(function(a, b) {
                var auteurA = a.querySelector('#idAuteur').textContent.toUpperCase();
                var auteurB = b.querySelector('#idAuteur').textContent.toUpperCase();
                if (auteurA < auteurB) {
                    return -1;
                }
                if (auteurA > auteurB) {
                    return 1;
                }
                return 0;
            });
            var row;
            cards.forEach(function(card, index) {
                if (index % 3 === 0) {
                    row = document.createElement('div');
                    row.className = 'row row-cols-1 row-cols-md-3 g-4';
                    container.appendChild(row);
                }
                row.appendChild(card);
            });
        }
    });

    // Tri par série(s)
    document.getElementById('triSerie').addEventListener('change', function() {
        if (this.checked) {
            var container = document.querySelector('.card-container');
            var cards = Array.from(container.getElementsByClassName('card'));
            cards.sort(function(a, b) {
                var serieA = a.querySelector('#idSerie').textContent.toUpperCase();
                var serieB = b.querySelector('#idSerie').textContent.toUpperCase();
                if (serieA < serieB) {
                    return -1;
                }
                if (serieA > serieB) {
                    return 1;
                }
                return 0;
            });
            var row;
            cards.forEach(function(card, index) {
                if (index % 3 === 0) {
                    row = document.createElement('div');
                    row.className = 'row row-cols-1 row-cols-md-3 g-4';
                    container.appendChild(row);
                }
                row.appendChild(card);
            });
        }
        window.location.reload();
    });