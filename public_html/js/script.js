// création d'une instance de la class Navigo
const router = new Navigo("/");

// définition des routes
router.on({
    '/' : function() {
       includePage('home', function(){
       });
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
   ,
   '/contact' : function() {
       includePage('Page_Contact');
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

//barre de scroll
window.onload = () => {
    window.addEventListener("scroll", () => {
       let hauteur = document.documentElement.scrollHeight - window.innerHeight;
       let position = window.scrollY;
       let largeur = document.documentElement.clientWidth;
       
       let barre = (position / hauteur) * largeur;
       
       document.getElementById("barre").style.widht = barre + "px";
    });
};

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
  // Declare all variables
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

document.getElementById("defaultOpen").click();
