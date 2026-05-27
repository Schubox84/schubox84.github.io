const selections = {
  pressure: "customer messages, forms, job requests, and office tasks pile up before anyone can sort them",
  tools: "your inbox, folders, spreadsheets, and documents",
  help: "sorts the work, spots what matters, and makes the next step clear",
};

const pilotText = document.getElementById("pilotText");
const pilotMail = document.getElementById("pilotMail");

function buildPilotBrief() {
  const text = `A good first project is to watch how ${selections.pressure} in ${selections.tools}. Schubert Consulting would map the real steps, then build a small private AI helper that ${selections.help}. Your team would know what the helper handles, what a person still approves, and how to change or shut it off.`;
  pilotText.textContent = text;

  const subject = encodeURIComponent("Schubert Consulting stuck task map");
  const body = encodeURIComponent(`${text}\n\nBusiness:\n\nTask that gets stuck:\n\nWhere it happens today:\n\nBest next step:\n`);
  pilotMail.href = `mailto:ianschubert@gmail.com?subject=${subject}&body=${body}`;
}

document.querySelectorAll("[data-choice]").forEach((group) => {
  group.querySelectorAll("button[data-value]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.classList.contains("is-active")));
  });

  group.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-value]");
    if (!button) return;

    group.querySelectorAll("button[data-value]").forEach((candidate) => {
      const isActive = candidate === button;
      candidate.classList.toggle("is-active", isActive);
      candidate.setAttribute("aria-pressed", String(isActive));
    });

    selections[group.dataset.choice] = button.dataset.value;
    buildPilotBrief();
  });
});

buildPilotBrief();

const sceneHost = document.querySelector("[data-scroll-scene]");

if (sceneHost && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const advancedScene = document.createElement("script");
  advancedScene.type = "module";
  advancedScene.src = "scroll-scene.js";
  advancedScene.integrity = "sha384-XtVNQecc41Mdds/23ob8PkS6FDtByt+sdCOPCVVwbEMci7ZtCjpOG8fu3guaggTW";
  advancedScene.crossOrigin = "anonymous";

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      document.head.append(advancedScene);
      observer.disconnect();
    },
    { rootMargin: "300px 0px" },
  );

  observer.observe(sceneHost);
}
