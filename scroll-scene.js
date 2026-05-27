const scene = document.querySelector("[data-scroll-scene]");
const label = document.querySelector("[data-scene-label]");
const meter = document.querySelector("[data-scene-meter]");
const panels = [...document.querySelectorAll("[data-stage]")];

const stages = panels.map((panel) => panel.dataset.stage);

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function updateScene() {
  if (!scene) return;

  const rect = scene.getBoundingClientRect();
  const maxTravel = Math.max(1, rect.height - window.innerHeight);
  const progress = clamp(-rect.top / maxTravel, 0, 1);
  const sceneX = progress * 100;
  const sceneY = 4 + progress * 86;
  const stageIndex = clamp(Math.round(progress * (stages.length - 1)), 0, stages.length - 1);

  scene.style.setProperty("--scene-progress", progress.toFixed(3));
  scene.style.setProperty("--scene-x", `${sceneX.toFixed(2)}%`);
  scene.style.setProperty("--scene-y", `${sceneY.toFixed(2)}%`);

  if (label) label.textContent = stages[stageIndex] || "Transformation";
  if (meter) meter.value = Math.round(progress * 100);
}

let ticking = false;

function requestUpdate() {
  if (ticking) return;
  ticking = true;
  window.requestAnimationFrame(() => {
    updateScene();
    ticking = false;
  });
}

window.addEventListener("scroll", requestUpdate, { passive: true });
window.addEventListener("resize", requestUpdate);
updateScene();
