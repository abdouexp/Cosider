//get the total price 

function CalcCosts() {
    var phoneCost = parseInt(document.getElementById("prix").value);
    var quant = parseInt(document.getElementById("qts").value);
document.getElementById("prixtot").value = phoneCost * quant;
}
function CalcCosts1() {
    var phoneCost1 = parseInt(document.getElementById("prix1").value);
    var quant1 = parseInt(document.getElementById("qts1").value);
document.getElementById("prixtot1").value = phoneCost1 * quant1;             
}
function CalcCosts2() {
    var phoneCost2 = parseInt(document.getElementById("prix2").value);
    var quant2 = parseInt(document.getElementById("qts2").value);
document.getElementById("prixtot2").value = phoneCost2 * quant2;             
}
function CalcCosts3() {
    var phoneCost3 = parseInt(document.getElementById("prix3").value);
    var quant3 = parseInt(document.getElementById("qts3").value);
document.getElementById("prixtot3").value = phoneCost3 * quant3;             
}
function CalcCosts4() {
    var phoneCost4 = parseInt(document.getElementById("prix4").value);
    var quant4 = parseInt(document.getElementById("qts4").value);
document.getElementById("prixtot4").value = phoneCost4 * quant4;              
}











// here the script for bon de commande
varcommande.addEventListener("submit",(e)=> {
  e.preventDefault();
  getDevices2 = async () => {
  const location = window.location.hostname;
  const settings = {
  method: 'POST',
  headers:{
  Accept: 'application/json',
  'Content-Type': 'application/json',
  },
  body: JSON.stringify(data2)
  };
  try {
  const fetchResponse = await fetch(`http://${location}:5000/commande`, settings);
  const data = await fetchResponse.json();
  
  return data2;
  } 
  catch (e) {
  return e;
  }
  } 
  let date = document.getElementById("date").value;
  let dateliv = document.getElementById("dateliv").value;
  let fournisseur = document.getElementById("fournaisseur").value;
  let lieu=document.getElementById("lieu").value;
  let conditions=document.getElementById("condition").value;
  let description = document.getElementById("choice").value;
  let description1 = document.getElementById("choice1").value;
  let description2 = document.getElementById("choice2").value;
  let description3 = document.getElementById("choice3").value;
  let description4 = document.getElementById("choice4").value;
  let unitémesurec= document.getElementById("ut").value;
  let unitémesurec1=document.getElementById("ut1").value;
  let unitémesurec2=document.getElementById("ut2").value;
  let unitémesurec3=document.getElementById("ut3").value;
  let unitémesurec4=document.getElementById("ut4").value;
  let quantitédemc=document.getElementById("qts").value;
  let quantitédemc1=document.getElementById("qts1").value;
  let quantitédemc2=document.getElementById("qts2").value;
  let quantitédemc3=document.getElementById("qts3").value;
  let quantitédemc4=document.getElementById("qts4").value;
  let prix=document.getElementById("prix").value;
  let prix1=document.getElementById("prix1").value;
  let prix2=document.getElementById("prix2").value;
  let prix3=document.getElementById("prix3").value;
  let prix4=document.getElementById("prix4").value;
  let num = '1';
  let num1 = '2';
  let num2 = '3';
  let num3 = '4';
  let num4 = '5';
  let prixtot=document.getElementById("prixtot").value;
  let prixtot1=document.getElementById("prixtot1").value;
  let prixtot2=document.getElementById("prixtot2").value;
  let prixtot3=document.getElementById("prixtot3").value;
  let prixtot4=document.getElementById("prixtot4").value;

  let data2= {"date": date, "dateliv":  dateliv, "fournisseur":  fournisseur, "lieu": lieu,  "conditions": conditions, 'uuid':terma,
    "item": num, "description" : description, "unitémesure" : unitémesurec, "quantité" : quantitédemc, "prixunit" : prix, "prixtot" : prixtot,
    "item2": num1, "description2" : description1, "unitémesure2" : unitémesurec1, "quantité2" : quantitédemc1, "prixunit2" : prix1, "prixtot2" : prixtot1,
    "item3": num2, "description3" : description2, "unitémesure3" : unitémesurec2, "quantité3" : quantitédemc2, "prixunit3" : prix2, "prixtot3" : prixtot2,
    "item4": num3, "description4" : description3, "unitémesure4" : unitémesurec3, "quantité4" : quantitédemc3, "prixunit4" : prix3, "prixtot4" : prixtot3,
    "item5": num4, "description5" : description4, "unitémesure5" : unitémesurec4, "quantité5" : quantitédemc4, "prixunit5" : prix4, "prixtot5" : prixtot4,
      };
  console.log(data2);
  getDevices2(data2);
  
  
  
  
  })

  // here the script for the reception

varreception.addEventListener("submit",(e)=> {
  e.preventDefault();
  getDevices3 = async () => {
  const location = window.location.hostname;
  const settings = {
  method: 'POST',
  headers:{
  Accept: 'application/json',
  'Content-Type': 'application/json',
  },
  body: JSON.stringify(data)
  };
  try {
  const fetchResponse = await fetch(`http://${location}:5000/reception`, settings);
  const data3 = await fetchResponse.json();
  
  return data3;
  } 
  catch (e) {
  return e;
  }
  } 
  
  
  
  let dateliv = document.getElementById("dateR").value;
  let site = document.getElementById("site").value;
  let codea=document.getElementById("codeA").value;
  let numfac=document.getElementById("numfac").value;
  let observationr = document.getElementById("observationR").value;
  let designationr = document.getElementById("choice").value;
  let designationr1 = document.getElementById("choice1").value;
  let designationr2 = document.getElementById("choice2").value;
  let designationr3 = document.getElementById("choice3").value;
  let designationr4 = document.getElementById("choice4").value;
  let quantitér=document.getElementById("Qtsr").value;
  let quantitér1=document.getElementById("Qtsr1").value;
  let quantitér2=document.getElementById("Qtsr2").value;
  let quantitér3=document.getElementById("Qtsr3").value;
  let quantitér4=document.getElementById("Qtsr4").value;
  let num = '1';
  let num2 = '2';
  let num3 = '3';
  let num4 = '4';
  let num5 = '5';
  
  let data= {"site": site, "codearticle": codea, "numfacture": numfac, "date": dateliv, "observation": observationr, 'uuid':terma,
  "num": num, "designation": designationr, "quantité": quantitér,
  "num2": num2, "designation2": designationr1, "quantité2": quantitér1,
  "num3": num3, "designation3": designationr2, "quantité3": quantitér2,
  "num4": num4, "designation4": designationr3, "quantité4": quantitér3,
  "num5": num5, "designation5": designationr4, "quantité5": quantitér4,
};
  console.log(data);
  getDevices3(data);
  
  
  
  
  })

