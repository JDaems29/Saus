"use strict";
getSauzen();
async function getSauzen() {
  //binnenhalen sauzen.json en een random saus selecteren
  const response = await fetch("sauzen.json");
  if (response.ok) {
    const sauzen = await response.json();
    const randomSaus = sauzen[Math.floor(Math.random() * sauzen.length)];

    //Startpuntjes maken
    let puntjes = ".".repeat(randomSaus.length);
    document.getElementById("letters").innerText = puntjes;
    let foutTeller = 0;
    const geradenLetters = [];

    //onclick functie
    document.getElementById("raden").onclick = function () {
      const letter = document.getElementById("input").value;
      document.getElementById("fout").hidden = true;
      if (letter !== "" && !geradenLetters.includes(letter)) {
        geradenLetters.push(letter);
        const nieuwePuntjes = updatePuntjes(puntjes, letter, randomSaus);

        //check als gebruiker gewonnen heeft
        if (nieuwePuntjes === randomSaus) {
          document.getElementById("letters").innerText = nieuwePuntjes;
          document.getElementById(
            "winTekst"
          ).innerText = `Je hebt gewonnen! De saus was inderdaad ${randomSaus}.`;
          disableButton();
        } else {
          //check als de gebruiker een juiste of foute letter heeft ingevoerd
          if (nieuwePuntjes !== puntjes) {
            document.getElementById("letters").innerText = nieuwePuntjes;
          } else {
            foutTeller++;
            document.getElementById("galgje").src = `img/${foutTeller}.png`;
            if (foutTeller >= 10) {
              document.getElementById(
                "winTekst"
              ).innerText = `Je hebt verloren. De saus was ${randomSaus}.`;
              disableButton();
            }
          }
          puntjes = nieuwePuntjes;
        }
      } else {
        document.getElementById("fout").hidden = false;
      }
      document.getElementById("input").value = "";
    };
  }
}

//kijkt als de gekozen letter in de saus zit en update de puntjes
function updatePuntjes(puntjes, letter, saus) {
  const splitPuntjes = puntjes.split("");
  for (let index = 0; index < puntjes.length; index++) {
    if (saus[index] === letter) {
      splitPuntjes[index] = letter;
    }
  }
  const nieuwePuntjes = splitPuntjes.join("");
  return nieuwePuntjes;
}

//functie om de raden knop uit te zetten
function disableButton() {
  document.getElementById("raden").disabled = true;
}
