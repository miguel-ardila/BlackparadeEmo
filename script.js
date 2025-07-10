// Efectos nostálgicos y interactividad para la página EMO

document.addEventListener('DOMContentLoaded', function() {
    
    // Efecto de parpadeo aleatorio en elementos
    function addRandomBlink() {
        const elements = document.querySelectorAll('h3, .item, .action-btn');
        setInterval(() => {
            const randomElement = elements[Math.floor(Math.random() * elements.length)];
            randomElement.classList.add('blink');
            setTimeout(() => {
                randomElement.classList.remove('blink');
            }, 1000);
        }, 3000);
    }

    // Efecto de mouse trail con corazones y estrellas
    function createMouseTrail() {
        let mouseTrail = [];
        const symbols = ['💖', '⭐', '🖤', '💀'];
        
        document.addEventListener('mousemove', function(e) {
            const symbol = document.createElement('div');
            symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            symbol.style.position = 'fixed';
            symbol.style.left = e.clientX + 'px';
            symbol.style.top = e.clientY + 'px';
            symbol.style.pointerEvents = 'none';
            symbol.style.fontSize = '16px';
            symbol.style.zIndex = '9999';
            symbol.style.animation = 'fadeOut 2s ease-out forwards';
            
            document.body.appendChild(symbol);
            
            setTimeout(() => {
                if (symbol.parentNode) {
                    symbol.parentNode.removeChild(symbol);
                }
            }, 2000);
        });
    }

    // Agregar CSS para la animación de fadeOut
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            0% { opacity: 1; transform: scale(1) rotate(0deg); }
            100% { opacity: 0; transform: scale(0.5) rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Sonidos de clicks (simulados con Web Audio API)
    function createClickSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        function playClickSound() {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        }
        
        // Agregar sonido a botones
        document.querySelectorAll('button, .nav-btn, .action-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                try {
                    playClickSound();
                } catch (error) {
                    // Silenciar errores de audio
                }
            });
        });
    }

    // Efecto de texto typewriter en el título
    function typewriterEffect() {
        const title = document.querySelector('.emo-title');
        const originalText = title.textContent;
        title.textContent = '';
        
        let i = 0;
        const timer = setInterval(() => {
            title.textContent += originalText[i];
            i++;
            if (i >= originalText.length) {
                clearInterval(timer);
            }
        }, 150);
    }

    // Sistema de mensajes popup estilo Windows 98
    function createPopupMessage(message, type = 'info') {
        const popup = document.createElement('div');
        popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #c0c0c0;
            border: 2px outset #c0c0c0;
            padding: 20px;
            font-family: 'MS Sans Serif', sans-serif;
            font-size: 12px;
            color: #000;
            z-index: 10000;
            box-shadow: 4px 4px 8px rgba(0,0,0,0.5);
            min-width: 300px;
        `;
        
        popup.innerHTML = `
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
                <span style="font-size: 16px; margin-right: 10px;">${type === 'error' ? '⚠️' : 'ℹ️'}</span>
                <strong>Sistema EMO</strong>
            </div>
            <p style="margin-bottom: 15px;">${message}</p>
            <div style="text-align: right;">
                <button onclick="this.parentNode.parentNode.remove()" 
                        style="padding: 4px 12px; border: 1px outset #c0c0c0; background: #c0c0c0; cursor: pointer;">
                    OK
                </button>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        // Auto-remover después de 5 segundos
        setTimeout(() => {
            if (popup.parentNode) {
                popup.remove();
            }
        }, 5000);
    }

    // Event listeners para botones
    document.querySelector('.ok-btn')?.addEventListener('click', function() {
        createPopupMessage('¡Te has registrado para el encuentro EMO! 🖤', 'info');
    });

    document.querySelector('.cancel-btn')?.addEventListener('click', function() {
        createPopupMessage('Registro cancelado. ¿Seguro que no quieres venir? 😢', 'error');
    });

    // Event listeners para botones de acción
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent.trim();
            if (action.includes('Send message')) {
                createPopupMessage('¡Mensaje enviado! Espera la respuesta en tu BlackBerry 📱', 'info');
            } else if (action.includes('Add friends')) {
                createPopupMessage('¡Solicitud de amistad enviada! Ahora sois EMO friends 4ever 🖤', 'info');
            } else if (action.includes('Block user')) {
                createPopupMessage('Usuario bloqueado. No more drama! 🚫', 'error');
            }
        });
    });



    // Efecto de nieve de corazones
    function createHeartSnow() {
        setInterval(() => {
            const heart = document.createElement('div');
            heart.textContent = Math.random() > 0.5 ? '🖤' : '💜';
            heart.style.cssText = `
                position: fixed;
                top: -20px;
                left: ${Math.random() * 100}vw;
                font-size: ${Math.random() * 20 + 10}px;
                pointer-events: none;
                z-index: 1;
                animation: fall ${Math.random() * 3 + 2}s linear forwards;
            `;
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.remove();
                }
            }, 5000);
        }, 2000);
    }

    // Agregar CSS para la animación de caída
    const fallStyle = document.createElement('style');
    fallStyle.textContent = `
        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(fallStyle);



    // Inicializar todos los efectos
    addRandomBlink();
    createMouseTrail();
    createClickSound();
    createHeartSnow();
    
    // Mensaje de bienvenida
    setTimeout(() => {
        createPopupMessage('¡Bienvenidx al BLACK PARADE EMO! Prepárate para la mejor experiencia nostálgica 🖤💜', 'info');
    }, 2000);

    // Konami code para efectos especiales
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
            document.body.style.animation = 'rainbow 2s infinite';
            createPopupMessage('¡CÓDIGO SECRETO ACTIVADO! 🌈 ¡Eres un verdadero EMO hacker! 💀', 'info');
            
            const rainbowStyle = document.createElement('style');
            rainbowStyle.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(rainbowStyle);
        }
    });
}); 