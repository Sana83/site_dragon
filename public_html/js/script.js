// création d'une instance de la class Navigo
const router = new Navigo("/");

// définition des routes
router.on({
    '/' : function() {
       includePage('home');
   },
   '/dragons' : function() {
       includePage('Page_Dragons');
   },
   '/cinematographie' : function() {
       includePage('Page_Cinematographie');
   },
   '/personnages' : function() {
       includePage('Page_Personnages');
   },
   '/studio' : function() {
       includePage('Page_Studio');
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

document.addEventListener('scroll',() => {
		let top  = document.documentElement.scrollTop;
    if(lastScrollValue < top) {
    	header.classList.add("hidden");
    } else {
    	header.classList.remove("hidden");
    }
    lastScrollValue = top;
});

