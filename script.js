const priceInput = document.getElementById("price");
const saleDayCheckbox = document.getElementById("saleDay");
const calculateButton = document.getElementById("calculateButton");
const result = document.getElementById("result");
const app = document.getElementById("app");

calculateButton.addEventListener("click", calculateTax);

priceInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    calculateTax();
  }
});

function calculateTax() {
  const inputValue = priceInput.value;
  const price = Number(inputValue);
  const isSaleDay = saleDayCheckbox.checked;

  if (inputValue.trim() === "" || Number.isNaN(price) || price < 0) {
    result.innerHTML = "正しい金額を入力してください。";
    showResultAnimation();
    return;
  }

  let basePrice = price;

  if (isSaleDay) {
    basePrice = price * 0.95;
  }

  const tax8 = Math.floor(basePrice * 1.08);
  const tax10 = Math.floor(basePrice * 1.10);
  const discountPrice = Math.floor(basePrice);

  result.innerHTML = `
    <div class="result-title">計算結果</div>
    ${isSaleDay ? `<div class="sale-label">特売日 5%オフ適用中</div>` : ""}
    <div>入力した本体価格：<strong>${price.toLocaleString()}円</strong></div>
    ${isSaleDay ? `<div>特売日価格：<strong>${discountPrice.toLocaleString()}円</strong></div>` : ""}
    <div>8%税込：<strong>${tax8.toLocaleString()}円</strong></div>
    <div>10%税込：<strong>${tax10.toLocaleString()}円</strong></div>
  `;

  showResultAnimation();
  createParticles(isSaleDay);
}

function showResultAnimation() {
  result.classList.remove("show");

  setTimeout(function() {
    result.classList.add("show");
  }, 10);
}

function createParticles(isSaleDay) {
  const normalParticles = ["🪙", "💗", "✨", "8%", "10%"];
  const saleParticles = ["5%OFF", "🛒", "💗", "✨", "🪙"];

  const particles = isSaleDay ? saleParticles : normalParticles;

  for (let i = 0; i < 14; i++) {
    const particle = document.createElement("span");

    particle.className = "particle";
    particle.textContent = particles[Math.floor(Math.random() * particles.length)];

    const randomX = Math.floor(Math.random() * 240 - 120);
    const randomRotate = Math.floor(Math.random() * 120 - 60);

    particle.style.setProperty("--x", `${randomX}px`);
    particle.style.setProperty("--rotate", `${randomRotate}deg`);

    app.appendChild(particle);

    setTimeout(function() {
      particle.remove();
    }, 1200);
  }
}
