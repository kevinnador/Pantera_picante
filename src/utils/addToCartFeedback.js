export const addToCartFeedback = (setAgregado, extra = () => {}) => {

  // Feedback visual
  setAgregado(true);
  setTimeout(() => setAgregado(false), 1600);

  // Vibración (mobile)
  if (navigator.vibrate) {
    navigator.vibrate(70);
  }

  // Scroll to top
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  // Extra action opcional
  extra();
};
