const nav = document.querySelector(".site-nav");
const toggle = document.querySelector(".nav-toggle");

if (nav && toggle) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

const copyButton = document.querySelector(".copy-email");
const copyStatus = document.querySelector("#copy-email-status");

if (copyButton) {
  copyButton.addEventListener("click", async () => {
    const email = copyButton.dataset.email || "";
    try {
      await navigator.clipboard.writeText(email);
    } catch (error) {
      const fallback = document.createElement("textarea");
      fallback.value = email;
      fallback.setAttribute("readonly", "");
      fallback.style.position = "fixed";
      fallback.style.left = "-9999px";
      document.body.appendChild(fallback);
      fallback.select();
      document.execCommand("copy");
      fallback.remove();
    }
    copyButton.classList.add("is-copied");
    if (copyStatus) copyStatus.textContent = "Email copied";
    window.setTimeout(() => {
      copyButton.classList.remove("is-copied");
      if (copyStatus) copyStatus.textContent = "";
    }, 2000);
  });
}
