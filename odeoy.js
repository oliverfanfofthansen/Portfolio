document.addEventListener("DOMContentLoaded", () => {
  const out    = document.getElementById("game-output");
  const inp    = document.getElementById("game-input");
  const btnRst = document.getElementById("game-restart");

  if (!out || !inp || !btnRst) return;

  let state = null;
  let valid = [];
  let ended = false;

  function line(text, cls = "line-story") {
    const d = document.createElement("div");
    d.className = cls;
    d.textContent = text;
    out.appendChild(d);
    out.scrollTop = out.scrollHeight;
  }
  
  function blank() { 
    line(""); 
  }

  function showNode(id) {
    state = id;
    ended = false;
    valid = ["1", "2"];

    const nodes = {
      start: () => {
        blank();
        line("Du våkner på en strandet øy, solen skinner", "line-story");
        blank();
        line("Hva gjør du først?", "line-story");
        line("  1. Utforsk", "line-choice");
        line("  2. Bygg en gapahuk", "line-choice");
        inp.placeholder = "Skriv 1 eller 2...";
        inp.disabled = false;
      },
      a_utforsk: () => {
        blank();
        line("Du utforsker øyen.", "line-story");
        line("Du finner mat, men det begynner å bli mørkt.", "line-story");
        blank();
        line("Hva gjør du?", "line-story");
        line("  1. Bygg gapahuk", "line-choice");
        line("  2. Fortsett å utforsk", "line-choice");
        inp.placeholder = "Skriv 1 eller 2...";
      },
      a_gapahuk: () => {
        blank();
        line("Du bygger en gapahuk akkurat i tide, du overlevde natten.", "line-story");
        blank();
        line("Det er neste dag, kva gjer du?", "line-story");
        line("  1. Utforsk", "line-choice");
        line("  2. Bli heima", "line-choice");
        inp.placeholder = "Skriv 1 eller 2...";
      },
      a_fortsett_morke: () => {
        blank();
        line("Du fortsetter å utforske i mørket.", "line-story");
        line("Du blir angrepet av et dyr. Game over.", "line-death");
        gameOver();
      },
      b_gapahuk: () => {
        blank();
        line("Du bygger en gapahuk.", "line-story");
        line("Det begynner å bli mørkt.", "line-story");
        blank();
        line("Det er neste dag, kva gjer du?", "line-story");
        line("  1. Utforsk", "line-choice");
        line("  2. Bli heima", "line-choice");
        inp.placeholder = "Skriv 1 eller 2...";
      },
      dag2_utforsk: () => {
        blank();
        line("Du finn ein forlatt bygning.", "line-story");
        line("Det ligg tau i eit av roma, kva skal du lage?", "line-story");
        blank();
        line("  1. Spyd", "line-choice");
        line("  2. Reila", "line-choice");
        inp.placeholder = "Skriv 1 eller 2...";
      },
      tau_spyd: () => {
        blank();
        line("Du lagde eit spyd.", "line-story");
        showFiskEnding();
      },
      tau_reila: () => {
        blank();
        line("Feil. Du bestemte deg og lagde eit spyd.", "line-story");
        showFiskEnding();
      },
      dag2_heima: () => {
        blank();
        line("Du blei heima heile dagen og begynte å bli sulten.", "line-story");
        line("Du gjekk ut og møtte eit dyr. Game over. Du døde.", "line-death");
        gameOver();
      },
    };

    if (nodes[id]) {
      nodes[id]();
    }
  }

  function showFiskEnding() {
    blank();
    line("Du går ned til havet og fangar fisk.", "line-story");
    blank();
    line("Det blir mørkt, og du lager eit bål.", "line-story");
    line("Du høyrer eit horn og begynner å utforske kva det kan vere.", "line-story");
    line("Du ser ein båt ikkje langt vekke og begynner å rope.", "line-story");
    line("Båten ser deg og kjem nærmare...", "line-story");
    blank();
    line("Du blir med båten, og kjem deg heim.", "line-story");
    blank();
    line("★  Du lever lykkeleg resten av dine dagar. Gratulerer!  ★", "line-win");
    gameOver();
  }

  function gameOver() {
    ended = true;
    inp.disabled = true;
    inp.placeholder = "Spelet er ferdig";
    blank();
    line("─────────────────────────────────", "line-system");
    line("Skriv 'start' eller trykk ↺ for å prøve igjen.", "line-system");
    inp.disabled = false;
    valid = ["start"];
  }

  function handle(raw) {
    const v = raw.trim().toLowerCase();
    if (!v) return;

    line("> " + raw, "line-player");

    if (v === "start" || v === "restart") {
      init();
      return;
    }

    if (ended) {
      line("Trykk ↺ eller skriv 'start' for å spele igjen.", "line-error");
      return;
    }

    if (v !== "1" && v !== "2") {
      line("Feil valg, prøv på nytt. (skriv 1 eller 2)", "line-error");
      return;
    }

    const transitions = {
      start:          { "1": "a_utforsk",       "2": "b_gapahuk" },
      a_utforsk:      { "1": "a_gapahuk",       "2": "a_fortsett_morke" },
      a_gapahuk:      { "1": "dag2_utforsk",    "2": "dag2_heima" },
      b_gapahuk:      { "1": "dag2_utforsk",    "2": "dag2_heima" },
      dag2_utforsk:   { "1": "tau_spyd",        "2": "tau_reila" },
    };

    const next = transitions[state]?.[v];
    if (next) {
      showNode(next);
    } else {
      line("Feil valg, prøv på nytt.", "line-error");
    }
  }

  inp.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      const v = inp.value;
      inp.value = "";
      handle(v);
    }
  });

  btnRst.addEventListener("click", () => { 
    init(); 
  });

  function init() {
    out.innerHTML = "";
    ended = false;
    inp.disabled = false;
    line("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "line-system");
    line("            ØDEØY  –  av Oliver F.H.      ", "line-system");
    line("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "line-system");
    showNode("start");
  }

  init();
});