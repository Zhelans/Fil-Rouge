var boutonCreationUtilisateur = document.getElementById("boutonCreationUtilisateur");

boutonCreationUtilisateur.onclick = afficherFormulaireCreation;

function afficherFormulaireCreation() {
    let boutonConfirmer = document.getElementById("boutonConfirmer");
    let prochainNombreAdherent = nouveauNombreAdherent();
    detailAdherent.classList.remove("d-none");
    table.classList.add("d-none");
    creationH1(prochainNombreAdherent);
    boutonConfirmer.onclick= confirmCreation;
}

function creationH1(adherent) {
    let h1 = document.getElementById("titre");
    h1.innerText = "création adhérent n°"+adherent;
    numeroAdherent.value = adherent;
    cotisation.innerText = "X";
    pret.innerText = "X";
    amende.innerText = "X";
    enableModif()
}

function confirmCreation(){
    let adherent = {
        nom: nom.value,
        prenom: prenom.value,
        adresse: adresse.value,
        telephone: telephone.value,
        dateCotisation: dateCotisation.value,
        numeroAdherent: numeroAdherent.value,
        pret: null,
        amende: null
    };

    adherents.set(numeroAdherent, adherent);
    localStorage.setItem('adherents', JSON.stringify(Array.from(adherents.entries())));

    if (localStorage.getItem('adherents')) {
        let adherentsArray = JSON.parse(localStorage.getItem('adherents'));
        adherents = new Map(adherentsArray);
    }
    let inputs = document.querySelectorAll('#adherentForm input');
    boutonConfirmer.classList.add("d-none");
    detailAdherent.classList.add("d-none");
    table.classList.remove("d-none");
    for (let input of inputs) {
        input.disabled = true;
    }
    console.log(adherents);
}

function nouveauNombreAdherent() {
    
    let cle = 1;

    if (adherents.has(cle)){
        cle++;
    } else {
        return cle;
    }
    // let cle = 1;
    // while (cle <= adherents.size) {
    //     if (adherents.numeroAdherent == cle) {
    //         cle++;
    //     } else {
    //         console.log(cle);
    //     }
    // }

    // return cle;
}