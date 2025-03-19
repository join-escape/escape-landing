document.addEventListener('DOMContentLoaded', function() {
  // Initialize background effect
  initBackgroundEffect();
  
  // Initialize escape key interaction
  initEscapeKey();
});

function initBackgroundEffect() {
  const backgroundEffect = document.getElementById('background-effect');
  const dotsCount = 40;
  
  // Create subtle floating dots
  for (let i = 0; i < dotsCount; i++) {
    const dot = document.createElement('div');
    dot.classList.add('floating-dots');
    
    // Randomize dot properties
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = Math.random() * 2 + 1;
    const opacity = Math.random() * 0.3 + 0.1;
    const duration = Math.random() * 50 + 30;
    const delay = Math.random() * 10;
    
    dot.style.left = `${x}%`;
    dot.style.top = `${y}%`;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.opacity = opacity;
    
    // Create animation for the dot
    dot.style.animation = `float ${duration}s infinite ease-in-out ${delay}s`;
    
    backgroundEffect.appendChild(dot);
  }
  
  // Keyframe animation for floating effect
  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(`
    @keyframes float {
      0%, 100% { transform: translate(0, 0); }
      25% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px); }
      50% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px); }
      75% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px); }
    }
  `, styleSheet.cssRules.length);
}

function initEscapeKey() {
  const escapeKey = document.getElementById('escape-key');
  const escapeModal = document.getElementById('escape-modal');
  let clickCount = 0;
  
  // Add keyboard accessibility
  escapeKey.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      handleEscapeKeyPress();
      e.preventDefault();
    }
  });
  
  // Add click interaction
  escapeKey.addEventListener('click', handleEscapeKeyPress);
  
  // Handle the actual Escape key on keyboard as well
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (document.body.classList.contains('escape-mode')) {
        exitEscapeMode();
      } else {
        handleEscapeKeyPress();
      }
    }
  });
  
  // Handle click outside the modal to exit
  escapeModal.addEventListener('click', function(e) {
    if (e.target === escapeModal) {
      exitEscapeMode();
    }
  });
  
  function handleEscapeKeyPress() {
    clickCount++;
    
    // Visual feedback for pressing the key
    escapeKey.classList.add('pressed');
    
    // Add vibration animation
    escapeKey.animate([
      { transform: 'translate(0, 0)' },
      { transform: 'translate(-2px, -2px)' },
      { transform: 'translate(2px, 2px)' },
      { transform: 'translate(-1px, 1px)' },
      { transform: 'translate(1px, -1px)' },
      { transform: 'translate(0, 0)' }
    ], {
      duration: 300,
      easing: 'cubic-bezier(0.36, 0.07, 0.19, 0.97)'
    });
    
    // Remove pressed state after animation
    setTimeout(() => {
      escapeKey.classList.remove('pressed');
    }, 300);
    
    // If clickCount is odd, activate escape mode
    if (clickCount % 2 === 1) {
      activateEscapeMode();
    } else {
      exitEscapeMode();
    }
  }
  
  function activateEscapeMode() {
    // Activate dark mode with chromatic effect
    document.body.classList.add('escape-mode');
    
    // Add animation to the modal appearance
    escapeModal.classList.add('active');
    
    // Add a rainbow border to the join escape link
    const escapeLink = document.querySelector('.escape-link');
    
    // Create a pulsing animation for the link
    escapeLink.animate([
      { transform: 'scale(0.95)', boxShadow: '0 0 30px rgba(255, 201, 142, 0.2)' },
      { transform: 'scale(1.02)', boxShadow: '0 0 40px rgba(255, 201, 142, 0.3)' },
      { transform: 'scale(0.98)', boxShadow: '0 0 35px rgba(255, 201, 142, 0.25)' },
      { transform: 'scale(1)', boxShadow: '0 0 30px rgba(255, 201, 142, 0.2)' }
    ], {
      duration: 2000,
      iterations: Infinity,
      easing: 'ease-in-out'
    });
    
    // Create chromatic aberration effect on the text
    const chromaticText = document.querySelector('.chromatic-text');
    chromaticText.animate([
      { textShadow: '2px 2px 0 #ff3366, -2px -2px 0 #00ddff, 2px -2px 0 #99ff33, -2px 2px 0 #ffaa00' },
      { textShadow: '3px 3px 0 #ff00ff, -3px -3px 0 #00ffcc, 3px -3px 0 #ffcc00, -3px 3px 0 #33ccff' },
      { textShadow: '2px 2px 0 #ff3366, -2px -2px 0 #00ddff, 2px -2px 0 #99ff33, -2px 2px 0 #ffaa00' }
    ], {
      duration: 3000,
      iterations: Infinity,
      easing: 'ease-in-out'
    });
  }
  
  function exitEscapeMode() {
    // Exit escape mode
    document.body.classList.remove('escape-mode');
    escapeModal.classList.remove('active');
    
    // Make sure clickCount stays in sync
    if (clickCount % 2 === 1) {
      clickCount++;
    }
  }
}

// Add Rainbow Effect to SVG on hover
function createRainbowEffect() {
  const escapeKey = document.getElementById('escape-key');
  const svgElements = escapeKey.querySelectorAll('svg rect, svg line, svg path');
  
  escapeKey.addEventListener('mouseenter', () => {
    svgElements.forEach(el => {
      el.style.animation = 'rainbow-stroke 3s linear infinite';
    });
  });
  
  escapeKey.addEventListener('mouseleave', () => {
    svgElements.forEach(el => {
      el.style.animation = 'none';
      // Reset to original color
      setTimeout(() => {
        el.style.stroke = '#FFC98E';
      }, 50);
    });
  });
}

// Create fun interactive particle explosion effect when clicking the escape key
function createParticleExplosion() {
  const escapeKey = document.getElementById('escape-key');
  
  escapeKey.addEventListener('click', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    // Create explosion effect
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'fixed';
      particle.style.width = '4px';
      particle.style.height = '4px';
      particle.style.backgroundColor = getRandomColor();
      particle.style.borderRadius = '50%';
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '1000';
      
      document.body.appendChild(particle);
      
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 100 + 50;
      const startTime = Date.now();
      const duration = Math.random() * 1000 + 500;
      
      function updateParticle() {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;
        
        if (progress >= 1) {
          particle.remove();
          return;
        }
        
        const easing = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
        const distance = speed * easing;
        
        particle.style.left = `${x + Math.cos(angle) * distance}px`;
        particle.style.top = `${y + Math.sin(angle) * distance}px`;
        particle.style.opacity = 1 - easing;
        
        requestAnimationFrame(updateParticle);
      }
      
      requestAnimationFrame(updateParticle);
    }
  });
}

function getRandomColor() {
  const colors = ['#ff3366', '#ff9933', '#99ff33', '#33ccff', '#cc66ff', '#ff00ff'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Initialize the additional effects
document.addEventListener('DOMContentLoaded', function() {
  createRainbowEffect();
  createParticleExplosion();
});
