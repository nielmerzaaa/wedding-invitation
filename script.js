

const weddingDate = new Date(2026, 11, 18, 0, 0, 0);

function updateCountdown() {
    const diff = Math.max(0, weddingDate.getTime() - Date.now());

    document.getElementById('days').textContent =
        String(Math.floor(diff / 86400000)).padStart(3, '0');

    document.getElementById('hours').textContent =
        String(Math.floor(diff % 86400000 / 3600000)).padStart(2, '0');

    document.getElementById('minutes').textContent =
        String(Math.floor(diff % 3600000 / 60000)).padStart(2, '0');

    document.getElementById('seconds').textContent =
        String(Math.floor(diff % 60000 / 1000)).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);




const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});




const menu = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

if (menu && nav) {
    menu.addEventListener('click', () => {
        nav.classList.toggle('open');
    });

    nav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            nav.classList.remove('open');
        });
    });
}




const music = document.getElementById('music');
const sound = document.getElementById('sound');

// Update music button
function updateSoundButton() {
    if (!music || !sound) return;

    sound.innerHTML = music.paused
        ? '♫ <span>SOUND OFF</span>'
        : '♫ <span>SOUND ON</span>';
}

// Start music
async function startWeddingMusic() {
    if (!music || !sound) return;

    try {
        await music.play();
        updateSoundButton();
    } catch (error) {
        sound.innerHTML = '♫ <span>ENABLE SOUND</span>';
    }
}

// Sound ON / OFF button
if (music && sound) {

    sound.addEventListener('click', async (event) => {
        event.stopPropagation();

        if (music.paused) {
            await startWeddingMusic();
        } else {
            music.pause();
            updateSoundButton();
        }
    });


    startWeddingMusic();


    document.addEventListener('click', () => {
        if (music.paused) {
            startWeddingMusic();
        }
    }, { once: true });


    music.addEventListener('play', updateSoundButton);
    music.addEventListener('pause', updateSoundButton);
}




const rsvpForm = document.getElementById('rsvpForm');

if (rsvpForm) {
    rsvpForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitButton = rsvpForm.querySelector('[type="submit"]');

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';
        }

        const formData = new FormData(rsvpForm);

        const data = new URLSearchParams();

        data.append('name', formData.get('name') || '');
        data.append('attendance', formData.get('attendance') || '');
        data.append('guests', formData.get('guests') || '');
        data.append('message', formData.get('message') || '');

        try {
            await fetch('https://script.google.com/macros/s/AKfycbz9GNAY5TcwpXPsAS_Yti4l66fixKt4sEQ8T0t0Yim9igocCPE0YUGLL4LnIlJVzeMwqA/exec', {
                method: 'POST',
                mode: 'no-cors',
                body: data
            });

            alert('Thank you! Your RSVP has been submitted.');

            rsvpForm.reset();

        } catch (error) {
            alert('Unable to submit your RSVP. Please try again.');
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'SUBMIT RSVP';
            }
        }
    });
}



window.addEventListener('load', () => {
    const loader = document.getElementById('loader');

    if (loader) {
        loader.classList.add('done');
    }
});
