const player = document.querySelector(".player");
const video = player.querySelector("video");
const title = player.querySelector("#video-title");
const errorMessage = player.querySelector(".video-error");
const directLink = errorMessage.querySelector("a");
const clips = Array.from(document.querySelectorAll(".video-link"));

function openClip(link) {
  title.textContent = link.dataset.title;
  directLink.href = link.href;
  errorMessage.hidden = true;
  video.poster = link.querySelector("img").src;
  video.src = link.href;
  player.showModal();
}

if (typeof player.showModal === "function") {
  for (const link of clips) {
    link.addEventListener("click", (event) => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;

      event.preventDefault();
      openClip(link);
      video.play().catch(() => {
        // Controls remain available if the browser blocks automatic playback.
      });
    });
  }

  video.addEventListener("error", () => {
    if (player.open) errorMessage.hidden = false;
  });

  player.addEventListener("close", () => {
    video.pause();
    video.removeAttribute("src");
    video.removeAttribute("poster");
    video.load();
  });

  const linkedClip = clips.find((link) => location.hash === "#" + link.id);
  if (linkedClip) openClip(linkedClip);
}
