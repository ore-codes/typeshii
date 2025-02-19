export const containerVariants = {
  initial: { opacity: 0, scale: 0.8, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, scale: 0.8, y: 20, transition: { duration: 0.5 } },
};

export const hoverFocusAnimation = {
  scale: 1.5,
  transition: { duration: 0.3 },
};
