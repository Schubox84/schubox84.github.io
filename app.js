const selections = {
  pressure: "too many emails and scattered intake",
  tools: "email, spreadsheets, and documents",
  review: "draft-and-review work",
};

const pilotText = document.getElementById("pilotText");
const pilotMail = document.getElementById("pilotMail");

function buildPilotBrief() {
  const text = `Schubert Consulting should map ${selections.pressure} across ${selections.tools}, then build a private AI pilot for ${selections.review}. The first pass should identify what AI prepares, what a person approves, what evidence is kept, and what materials are safe to bring without production access.`;
  pilotText.textContent = text;

  const subject = encodeURIComponent("Schubert Consulting AI pilot");
  const body = encodeURIComponent(`${text}\n\nCompany:\n\nWorkflow to inspect:\n\nCurrent tools:\n\nBest next step:\n`);
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
  advancedScene.integrity = "sha384-tGBwvfacnz1Og0a9p+FXXhjsMNO424emidzEmHRBzCGn5bn51hBbl8i9uTa5osbm";
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
