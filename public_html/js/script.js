const urlGoogleSheetDatas = "https://script.google.com/macros/s/AKfycbwci223-ImWEK3y_xrb_O2Q-Es20qBQXbT1B2fxSxT5ZhwXi3eqm0e-Br-nv0CA_ouw5Q/exec";
const urlGoogleSheetDragon = "https://script.google.com/macros/s/AKfycbyyCNLoBeePOQdIQGfD6Juju1ytGR7K7aMH_tZvYMrD0h_pQB2FbfT1344Nxvp3KDWe3A/exec";
// création d'une instance de la class Navigo
const router = new Navigo("/");

// définition des routes
router.on({
    '/': function () {
        includePage('home', function () {
        });
    },
    '/dragons': function () {
        includePage('Page_Dragons', () => {
            document.getElementById("defaultOpen").click();

            // création d'une requête ajax
            xhttp = new XMLHttpRequest();
            // définition de la fonction de callback
            xhttp.onreadystatechange = function () {
                // si la requête est terminée
                if (this.readyState === 4) {
                    // si la requête est un succès
                    if (this.status === 200) {
                        console.log(JSON.parse(this.responseText));
                        //récupération du template
                        let template = document.getElementById("templateDragons");
                        //récupération de la zone d'affichage des données
                        let listDatas = document.getElementById("listDatas");
                        //récupération des données
                        let reponse = JSON.parse(this.responseText);

                        //pour chaque ligne de données
                        for (let data of reponse.datas) {
                            //création d'une copie du template
                            let node = template.content.cloneNode(true);
                            //affectation des données dans la copie du template
                            node.querySelector('.dragon').innerHTML = data.dragon;
                            node.querySelector(".image_dragon").setAttribute("src", data.image);
                            let btnmodal = node.querySelector('.dragon_click');
                          
                            //affectation des données dans le modal
                            btnmodal.addEventListener('click', function () {
                                
                                myModal.show();
                                document.querySelector(".modal-title").innerHTML = data.dragon;
                                document.querySelector(".dragon_description").innerHTML = data.texte;
                                document.querySelector(".image_dragon_modal").setAttribute("src", data.image);
                            });
                            
                            // ajout de la copie du template dans la zone d'affichage des données
                            listDatas.appendChild(node);
                        }
                    } else {
                        console.error(this.status, this.responseText);
                    }
                }
            };
            xhttp.open("GET", urlGoogleSheetDragon, true);
            xhttp.send();

            let myModal = new bootstrap.Modal(document.getElementById('myModal'), {
                keyboard: false
            });

//            document.getElementById('btnmodal').addEventListener('click', function () {
//                myModal.show();
//            }, false);
//            
//            document.getElementById('btnmodalClose').addEventListener('click', function () {
//                myModal.hide();
//            }, false);
//            
        });
    },
    '/cinematographie': function () {
        includePage('Page_Cinematographie');
    },
    '/personnages': function () {
        includePage('Page_Personnages');
    },
    '/studio': function () {
        includePage('Page_Studio', () => {
            let myModal = new bootstrap.Modal(document.getElementById('myModal'), {
                keyboard: false
            });

            document.getElementById('btnmodal').addEventListener('click', function () {
                myModal.show();
            }, false);
        });
    },
    '/contact': function () {
        includePage('Page_Contact', function () {
            // ajout d'un écouteur d'événement sur le formulaire lors du submit
            document.getElementById('contactForm').addEventListener('submit', function (e) {
                // empêche le formulaire de reactualiser la page
                e.preventDefault();
                // envoyer le formulaire
                validateFormOnSubmit(this);
            });
        });
    },
    '/Page_Dragon_Caracteristiques': function () {
        includePage('Page_Dragon_Caracteristiques', function () {
            // création d'une requête ajax
            xhttp = new XMLHttpRequest();
            // définition de la fonction de callback
            xhttp.onreadystatechange = function () {
                // si la requête est terminée
                if (this.readyState === 4) {
                    // si la requête est un succès
                    if (this.status === 200) {
                        console.log(JSON.parse(this.responseText));
                        //récupération du template
                        let template = document.getElementById("templateDragons");
                        //récupération de la zone d'affichage des données
                        let listDatas = document.getElementById("listDatas");
                        //récupération des données
                        let reponse = JSON.parse(this.responseText);

                        //pour chaque ligne de données
                        for (let data of reponse.datas) {
                            //création d'une copie du template
                            let node = template.content.cloneNode(true);
                            //affectation des données dans la copie du template
                            node.querySelector('h2').innerHTML = data.dragon;
                            node.querySelector(".image_dragon").setAttribute("src", data.image);
                            node.querySelector('.colonne3').innerHTML = data.texte;
                            // ajout de la copie du template dans la zone d'affichage des données
                            listDatas.appendChild(node);
                        }
                    } else {
                        console.error(this.status, this.responseText);
                    }
                }
            };
            xhttp.open("GET", urlGoogleSheetDragon, true);
            xhttp.send();
        });
    }
});

// démarre le routeur
router.resolve();

// fonction permettant de charger un fichier html dans le #main-content
function includePage(file, fonc = false) {
    var elmnt, xhttp;

    // récupère l'élément #main-content
    elmnt = document.getElementById("main-content");
    // création d'une requête ajax
    xhttp = new XMLHttpRequest();
    // définition de la fonction de callback
    xhttp.onreadystatechange = function () {
        // si la requête est terminée
        if (this.readyState === 4) {
            // si la requête est un succès
            if (this.status === 200) {
                // affiche le contenu du fichier html dans #main-content
                elmnt.innerHTML = this.responseText;
                // si une fonction est passée en paramètre
                if (fonc) {
                    // exécute la fonction
                    fonc(this.responseText);
                }
            }
            // si la requête est un échec 404
            else if (this.status === 404) {
                elmnt.innerHTML = "Page not found.";
            }
            // tout autre code d'erreur
            else {
                elmnt.innerHTML = "Error: " + this.status;
            }
        }
    };
    // définition de l'adresse du fichier html à charger
    xhttp.open("GET", "/pages/" + file + ".html", true);
    // envoie la requête
    xhttp.send();
}

let header = document.querySelector("#header");
let lastScrollValue = 0;

document.addEventListener('scroll', () => {
    let top = document.documentElement.scrollTop;
    if (lastScrollValue < top) {
        header.classList.add("hidden");
    } else {
        header.classList.remove("hidden");
    }
    lastScrollValue = top;
});


window.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll('[role="tab"]');
    const tabList = document.querySelector('[role="tablist"]');

    // Add a click event handler to each tab
    tabs.forEach((tab) => {
        tab.addEventListener("click", changeTabs);
    });

    // Enable arrow navigation between tabs in the tab list
    let tabFocus = 0;

    tabList.addEventListener("keydown", (e) => {
        // Move right
        if (e.keyCode === 39 || e.keyCode === 37) {
            tabs[tabFocus].setAttribute("tabindex", -1);
            if (e.keyCode === 39) {
                tabFocus++;
                // If we're at the end, go to the start
                if (tabFocus >= tabs.length) {
                    tabFocus = 0;
                }
                // Move left
            } else if (e.keyCode === 37) {
                tabFocus--;
                // If we're at the start, move to the end
                if (tabFocus < 0) {
                    tabFocus = tabs.length - 1;
                }
            }

            tabs[tabFocus].setAttribute("tabindex", 0);
            tabs[tabFocus].focus();
        }
    });
});


function changeTabs(e) {
    const target = e.target;
    const parent = target.parentNode;
    const grandparent = parent.parentNode;

    // Remove all current selected tabs
    parent
            .querySelectorAll('[aria-selected="true"]')
            .forEach((t) => t.setAttribute("aria-selected", false));

    // Set this tab as selected
    target.setAttribute("aria-selected", true);

    // Hide all tab panels
    grandparent
            .querySelectorAll('[role="tabpanel"]')
            .forEach((p) => p.setAttribute("hidden", true));

    // Show the selected panel
    grandparent.parentNode
            .querySelector(`#${target.getAttribute("aria-controls")}`)
            .removeAttribute("hidden");
}

function openCity(evt, cityName) {
    // déclaration des variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}




function validateFormOnSubmit(form) {

    console.log(form.nom.value);

    // désactive le bouton submit
    form.submitBtn.disabled = true;

    // récupération de la zone de message de feedback
    let alert = document.getElementById('alertRepForm');

    // création d'une requête ajax
    xhttp = new XMLHttpRequest();
    // définition de la fonction de callback
    xhttp.onreadystatechange = function () {
        // si la requête est terminée
        if (this.readyState === 4) {
            // désactive le bouton submit
            form.submitBtn.disabled = false;
            // si la requête est un succès
            if (this.status === 200) {
                // affiche le contenu du fichier html dans #main-content
                alert.innerHTML = JSON.parse(this.responseText).result;
                // réinitialiser le formulaire
                form.reset();
            }
            // si la requête est un échec
            else {
                alert.innerHTML = "Error: " + this.status;
            }
        }
    };
    // definition de l'adresse du fichier html à charger
    xhttp.open("POST", urlGoogleSheetDatas, true);
    // envoie la requête
    xhttp.send(new FormData(form));
}

//function modal page dragons
function myModal(modal) {
    modal.style.display = "flex";
}