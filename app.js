const selections = {
  product: "Robotics / AI R&D Readiness Brief",
  price: "Scoped engagement",
  detail: "turn one robotics or AI R&D direction into a problem statement, system boundary, risk list, and next experiment",
  environment: "robotics, AI R&D, prototype, lab, workcell, or physical automation environment",
  proof: "technical feasibility, system boundary, risk, and next experiment",
  urgency: "this week",
};

const pilotText = document.getElementById("pilotText");
const pilotMail = document.getElementById("pilotMail");
const contactEmail = "schubertconsultingllc@ianschubert.com";

function buildPilotBrief() {
  if (!pilotText || !pilotMail) return;
  const text = `Engagement: ${selections.product}. Price anchor: ${selections.price}. Goal: ${selections.detail}. Environment: ${selections.environment}. First proof target: ${selections.proof}. Desired movement: ${selections.urgency}. Next step: confirm scope, available materials, technical constraints, and what evidence would make the next build worth funding.`;
  pilotText.textContent = text;
  pilotMail.href = `mailto:${contactEmail}?subject=${encodeURIComponent("Schubert Consulting brief: " + selections.product)}&body=${encodeURIComponent(text + "\n\nName:\nOrganization:\nPhone/email:\nLocation/site details:\nRobotics or AI R&D context:\nRelevant links/files/examples:\n")}`;
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
  if (group.dataset.choice === "product") {
    selections.price = button.dataset.price || selections.price;
    selections.detail = button.dataset.detail || selections.detail;
  }
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

const params = new URLSearchParams(window.location.search);
const requestedProduct = params.get("product");
if (requestedProduct) {
  const button = [...document.querySelectorAll('[data-choice="product"] button[data-value]')].find((candidate) => candidate.dataset.value.toLowerCase() === requestedProduct.toLowerCase());
  if (button) activateButton(button);
}

buildPilotBrief();
