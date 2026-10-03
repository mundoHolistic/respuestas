/* =====================================================
   CONFIGURACIÓN
   ===================================================== */


/*
  Pegá acá tus enlaces reales cuando los tengas.
*/

const LINKS = {

  mercadoPago:
    "https://link.mercadopago.com.ar/mundoholistic",

  paypal:
    "https://www.paypal.com/ncp/payment/B5WX9UBQ3LCU2",

  oracleForm:
    "https://forms.gle/zdeVcv9zH2whxfDN8"

};


/*
  Respuestas posibles.
*/

const RESULTS = [
  "SÍ",
  "NO",
  "TODAVÍA NO"
];


/* =====================================================
   ELEMENTOS
   ===================================================== */

const home =
  document.getElementById("home");

const answer =
  document.getElementById("answer");

const oracle =
  document.getElementById("oracle");


const revealButton =
  document.getElementById("revealButton");

const topReset =
  document.getElementById("topReset");

const brandButton =
  document.getElementById("brandButton");


const thinking =
  document.getElementById("thinking");

const thinkingText =
  document.getElementById("thinkingText");

const dots =
  document.getElementById("dots");


const answerResult =
  document.getElementById("answerResult");

const answerText =
  document.getElementById("answerText");


const oracleInvitation =
  document.getElementById(
    "oracleInvitation"
  );


const answerAgain =
  document.getElementById(
    "answerAgain"
  );


const oracleAgain =
  document.getElementById(
    "oracleAgain"
  );


const backToAnswer =
  document.getElementById(
    "backToAnswer"
  );


const mercadoPagoLink =
  document.getElementById(
    "mercadoPagoLink"
  );


const paypalLink =
  document.getElementById(
    "paypalLink"
  );


const oracleFormLink =
  document.getElementById(
    "oracleFormLink"
  );


const year =
  document.getElementById(
    "year"
  );


/* =====================================================
   LINKS
   ===================================================== */

function setLinks() {

  mercadoPagoLink.href =
    LINKS.mercadoPago;

  paypalLink.href =
    LINKS.paypal;

  oracleFormLink.href =
    LINKS.oracleForm;

}


/* =====================================================
   CAMBIAR DE PANTALLA
   ===================================================== */

function showScreen(screen) {

  document
    .querySelectorAll(".screen")
    .forEach(
      (item) => {
        item.classList.remove(
          "is-active"
        );
      }
    );

  screen.classList.add(
    "is-active"
  );

}


/* =====================================================
   RESULTADO ALEATORIO
   ===================================================== */

function getRandomResult() {

  const index =
    Math.floor(
      Math.random() *
      RESULTS.length
    );

  return RESULTS[index];

}


/* =====================================================
   SONIDO
   ===================================================== */

let audioContext = null;


function getAudioContext() {

  if (!audioContext) {

    audioContext =
      new (
        window.AudioContext ||
        window.webkitAudioContext
      )();

  }


  if (
    audioContext.state ===
    "suspended"
  ) {

    audioContext.resume();

  }


  return audioContext;

}


function playTone(
  frequency,
  duration,
  type = "sine",
  volume = 0.035
) {

  try {

    const ctx =
      getAudioContext();


    const oscillator =
      ctx.createOscillator();


    const gain =
      ctx.createGain();


    oscillator.type =
      type;


    oscillator.frequency.setValueAtTime(
      frequency,
      ctx.currentTime
    );


    gain.gain.setValueAtTime(
      0.0001,
      ctx.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
      volume,
      ctx.currentTime + 0.02
    );


    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      ctx.currentTime + duration
    );


    oscillator.connect(gain);

    gain.connect(
      ctx.destination
    );


    oscillator.start();


    oscillator.stop(
      ctx.currentTime +
      duration
    );


  } catch (error) {

    console.log(
      "Audio no disponible."
    );

  }

}


function playRevealStartSound() {

  playTone(
    520,
    0.08
  );


  setTimeout(
    () => {

      playTone(
        660,
        0.12
      );

    },
    70
  );

}


function playRevealResultSound() {

  playTone(
    660,
    0.10
  );


  setTimeout(
    () => {

      playTone(
        880,
        0.18,
        "sine",
        0.04
      );

    },
    90
  );

}


/* =====================================================
   REINICIAR
   ===================================================== */

function resetExperience() {

  answerResult.hidden =
    true;


  thinking.hidden =
    false;


  thinkingText.textContent =
    "Buscando una respuesta";


  thinkingText.classList.remove(
    "thinking-animation"
  );


  answerText.classList.remove(
    "answer-pop"
  );


  showScreen(home);

}


/* =====================================================
   REVELAR RESPUESTA
   ===================================================== */

function revealResult() {

  revealButton.disabled =
    true;


  playRevealStartSound();


  answerResult.hidden =
    true;


  thinking.hidden =
    false;


  thinkingText.textContent =
    "Buscando una respuesta";


  thinkingText.classList.remove(
    "thinking-animation"
  );


  showScreen(answer);


  void thinkingText.offsetWidth;


  thinkingText.classList.add(
    "thinking-animation"
  );


  window.setTimeout(
    () => {

      const result =
        getRandomResult();


      answerText.textContent =
        result;


      thinking.hidden =
        true;


      answerResult.hidden =
        false;


      void answerText.offsetWidth;


      answerText.classList.add(
        "answer-pop"
      );


      playRevealResultSound();


      revealButton.disabled =
        false;

    },
    1600
  );

}


/* =====================================================
   ABRIR ORÁCULO
   ===================================================== */

function openOracle() {

  showScreen(oracle);

}


/* =====================================================
   VOLVER A LA RESPUESTA
   ===================================================== */

function backToResult() {

  showScreen(answer);

}


/* =====================================================
   EVENTOS
   ===================================================== */

revealButton.addEventListener(
  "click",
  revealResult
);


oracleInvitation.addEventListener(
  "click",
  openOracle
);


backToAnswer.addEventListener(
  "click",
  backToResult
);


answerAgain.addEventListener(
  "click",
  resetExperience
);


oracleAgain.addEventListener(
  "click",
  resetExperience
);


topReset.addEventListener(
  "click",
  resetExperience
);


brandButton.addEventListener(
  "click",
  resetExperience
);


/* =====================================================
   AÑO
   ===================================================== */

year.textContent =
  new Date().getFullYear();


/* =====================================================
   INICIO
   ===================================================== */

setLinks();