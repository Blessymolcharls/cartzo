/**
 * Triggers a "fly-to-cart" animation where the product image spawns at the cursor
 * and smoothly translates/scales toward the cart icon in the navbar.
 *
 * @param {Event} e - The click event from the "Add to Cart" button.
 * @param {string} imageSrc - The source URL of the product image.
 */
export const triggerFlyToCart = (e, imageSrc) => {
  // Try to find the target cart icon
  const cartIcon = document.getElementById('navbar-cart-icon');
  if (!cartIcon) return; // Silent fallback if cart icon is missing

  // Use the click coordinates as the start position
  const startX = e.clientX;
  const startY = e.clientY;

  // Get cart icon coordinates for the end position
  const cartRect = cartIcon.getBoundingClientRect();
  const endX = cartRect.left + cartRect.width / 2;
  const endY = cartRect.top + cartRect.height / 2;

  // Create the floating image element
  const floatingImg = document.createElement('img');
  floatingImg.src = imageSrc || '/logo192.png';
  
  // Style the floating image
  Object.assign(floatingImg.style, {
    position: 'fixed',
    left: `${startX}px`,
    top: `${startY}px`,
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
    zIndex: '99999',
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%) scale(1)', // Center it on the cursor
    transition: 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)' // Smooth Amazon-style easing
  });

  document.body.appendChild(floatingImg);

  // Trigger the reflow so the transition will work
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      // Move and scale down to the cart icon
      floatingImg.style.left = `${endX}px`;
      floatingImg.style.top = `${endY}px`;
      floatingImg.style.transform = 'translate(-50%, -50%) scale(0.1)';
      floatingImg.style.opacity = '0.5';
    });
  });

  // Clean up the element after the transition duration (800ms)
  setTimeout(() => {
    floatingImg.remove();
    // Add a quick pulse animation to the cart icon when it "lands"
    cartIcon.classList.add('scale-125', 'text-[var(--primary)]');
    setTimeout(() => {
      cartIcon.classList.remove('scale-125', 'text-[var(--primary)]');
    }, 200);
  }, 800);
};
