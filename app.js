const selections = {
  area: "robotics",
  help: "hardware",
  goal: "see if it's feasible",
  timeframe: "this week",
};

const pilotText = document.getElementById("pilotText");
const pilotMail = document.getElementById("pilotMail");
const contactEmail = "schubertconsultingllc@ianschubert.com";

function buildPilotBrief() {
  if (!pilotText || !pilotMail) return;
  const text = `Looking for help with ${selections.area} — primarily ${selections.help}. Main goal: ${selections.goal}. Timeframe: ${selections.timeframe}. Next step: a short consult to confirm scope and the best first step.`;
  pilotText.textContent = text;
  pilotMail.href = `mailto:${contactEmail}?subject=${encodeURIComponent("Schubert Consulting brief")}&body=${encodeURIComponent(text + "\n\nName:\nOrganization:\nPhone/email:\nProject context:\nRelevant links/files/examples:\n")}`;
}

function activateButton(button) {
  const group = button.closest("[data-choice]");
  if (!group) return;
  group.querySelectorAll("button[data-value]").forEach((candidate) => {
    const active = candidate === button;
    candidate.classList.toggle("is-active", active);
    candidate.setAttribute("aria-pressed", String(active));
  });
  selections[group.dataset.choice] = button.dataset.value;
  buildPilotBrief();
}

document.querySelectorAll("[data-choice]").forEach((group) => {
  group.querySelectorAll("button[data-value]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.classList.contains("is-active")));
  });
  group.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-value]");
    if (button) activateButton(button);
  });
});

buildPilotBrief();
