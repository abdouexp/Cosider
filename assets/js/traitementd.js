
/*const vardemande= document.getElementById('vardemande')
vardemande.addEventListener("submit",(e)=> {
e.preventDefault();*/
//cascading menu

var subjectObject = {
    "Fourniture": {
      "Chaise": [],
      "Bureau": [],
      "Tableau":[],
       "bureau": [],
       "écran":[],
       "ordinateur":[],
       "armoire":[],
       "cafetière":[],
       "clavier":[],
       "souris":[],
       "porte" :[],
       "manteaux":[],
    },
    "Materiel": {
      "Gomme": [],
      "Crayon": [],
      "Papier": [],
      "Ancre": [],
      "Regle": []
      
    }
  };
  window.onload = function() {
    var subjectSel = document.getElementById("type");
    var topicSel = document.getElementById("choice0");
    var topicSel1 = document.getElementById("choice1");
    var topicSel2 = document.getElementById("choice2");
    var topicSel3 = document.getElementById("choice3");
    var topicSel4 = document.getElementById("choice4");

    for (var x in subjectObject) {
      subjectSel.options[subjectSel.options.length] = new Option(x, x);
    }
    subjectSel.onchange = function() {
      //empty Chapters- and Topics- dropdowns
      topicSel.length = 1;
      topicSel1.length= 1;
      topicSel2.length= 1;
      topicSel3.length= 1;
      topicSel4.length= 1;
      //display correct values
      for (var y in subjectObject[this.value]) {
      topicSel.options[topicSel.options.length] = new Option(y, y);
      }
       for (var y in subjectObject[this.value]) {
      topicSel1.options[topicSel1.options.length] = new Option(y, y);
      }
       for (var y in subjectObject[this.value]) {
      topicSel2.options[topicSel2.options.length] = new Option(y, y);
      }
       for (var y in subjectObject[this.value]) {
      topicSel3.options[topicSel3.options.length] = new Option(y, y);
      }
       for (var y in subjectObject[this.value]) {
      topicSel4.options[topicSel4.options.length] = new Option(y, y);
      }
    }

  }
  // event listener

  vardemande.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const location = window.location.hostname;
    const settings = {
      method: 'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
  
    const data = {};
    for (let i = 1; i <= 5; i++) {
      data[`num${i}`] = i;
      data[`désignation${i}`] = document.getElementById(`choice${i - 1}`).value;
      data[`unitémesure${i}`] = document.getElementById(`ut${i - 1}`).value;
      data[`quantitédem${i}`] = document.getElementById(`qts${i - 1}`).value;
      data[`quantitéliv${i}`] = data[`quantitédem${i}`];
      data[`observation${i}`] = document.getElementById(`obs${i - 1}`).value;
    }
  
    settings.body = JSON.stringify({
      date: document.getElementById("date").value,
      service: document.getElementById("service").value,
      type: document.getElementById("type").value,
      ...data
    });
  
    try {
      const fetchResponse = await fetch(`http://${location}:5000/demande`, settings);
      const responseData = await fetchResponse.json();
  
      console.log(responseData);
    } catch (e) {
      console.log(e);
    }
  });