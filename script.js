// Arabaları ve diğer DOM öğelerini seçme
const maviAraba = document.getElementById('mavi-araba');
const pembeAraba = document.getElementById('pembe-araba');
const winnerDisplay = document.getElementById('winner');
const restartButton = document.getElementById('restart-button');
const restartContainer = document.getElementById('restart-container');

// Arabaların başlangıç pozisyonları
let maviArabaX = 40, maviArabaY = 10;
let pembeArabaX = 40, pembeArabaY = 10;

// Klavye olaylarını dinleme
document.addEventListener('keydown', handleKeyPress);

// Yeniden başlatma düğmesini dinleme
restartButton.addEventListener('click', resetGame);

// Kazananı kontrol etme fonksiyonu
function checkWinner() {
    // Bitiş çizgisinin yüksekliği
    const finishLine = document.querySelector('.finish-cizgisi').getBoundingClientRect().top;
    // Araba dikdörtgenlerinin bilgileri
    const maviArabaRect = maviAraba.getBoundingClientRect();
    const pembeArabaRect = pembeAraba.getBoundingClientRect();

    // Mavi arabayı kontrol etme
    if (maviArabaRect.top <= finishLine) {
        displayWinner("Mavi Araba");
    } 
    // Pembe arabayı kontrol etme
    else if (pembeArabaRect.top <= finishLine) {
        displayWinner("Pembe Araba");
    }
}

// Kazananı ekrana gösterme fonksiyonu
function displayWinner(winner) {
    winnerDisplay.innerText = "Kazanan: " + winner + "!";
    winnerDisplay.style.display = 'block';
    restartButton.style.display = 'block';
    restartContainer.style.display = 'block';
    document.removeEventListener('keydown', handleKeyPress);
}

// Klavye olaylarını işleme fonksiyonu
function handleKeyPress(event) {
    if (!gamePaused) { // Oyun duraklatılmışsa klavye olaylarını işleme
        switch (event.key) {
            // Mavi araba kontrolleri
            case 's':
                maviArabaY -= 5;
                maviAraba.style.bottom = maviArabaY + '%';
                break;
            case 'w':
                maviArabaY += 5;
                maviAraba.style.bottom = maviArabaY + '%';
                break;
            case 'a':
                maviArabaX -= 5;
                maviAraba.style.left = maviArabaX + '%';
                break;
            case 'd':
                maviArabaX += 5;
                maviAraba.style.left = maviArabaX + '%';
                break;
            // Pembe araba kontrolleri
            case 'ArrowDown':
                pembeArabaY -= 5;
                pembeAraba.style.bottom = pembeArabaY + '%';
                break;
            case 'ArrowUp':
                pembeArabaY += 5;
                pembeAraba.style.bottom = pembeArabaY + '%';
                break;
            case 'ArrowLeft':
                pembeArabaX -= 5;
                pembeAraba.style.left = pembeArabaX + '%';
                break;
            case 'ArrowRight':
                pembeArabaX += 5;
                pembeAraba.style.left = pembeArabaX + '%';
                break;
        }
        // Kazananı kontrol etme
        checkWinner();
    }
}

// Oyunu yeniden başlatma fonksiyonu
function resetGame() {
    // Araba pozisyonlarını sıfırlama
    maviArabaX = 40;
    maviArabaY = 10;
    pembeArabaX = 52;
    pembeArabaY = 10;
    // Araba pozisyonlarını güncelleme
    maviAraba.style.left = maviArabaX + '%';
    maviAraba.style.bottom = maviArabaY + '%';
    pembeAraba.style.left = pembeArabaX + '%';
    pembeAraba.style.bottom = pembeArabaY + '%';
    // Kazananı ve yeniden başlatma düğmesini gizleme
    winnerDisplay.innerText = '';
    winnerDisplay.style.display = 'none';
    restartButton.style.display = 'none';
    restartContainer.style.display = 'none'; 
    // Klavye olaylarını yeniden ekleme
    document.addEventListener('keydown', handleKeyPress);
}

// Oyun durdurma işlevi
let gamePaused = false; // Oyunun durumu
function togglePause() {
    gamePaused = !gamePaused; // Durumu tersine çevirme
    if (gamePaused) {
        // Oyun durduğunda klavye olaylarını kaldırma
        document.removeEventListener('keydown', handleKeyPress);
    } else {
        // Oyun devam ederken klavye olaylarını yeniden ekleme
        document.addEventListener('keydown', handleKeyPress);
    }
}

// Space tuşuna basıldığında oyunu duraklatma veya devam ettirme
document.addEventListener('keydown', function(event) {
    if (event.key === ' ') { // Space tuşuna basıldığında
        togglePause(); // Oyunu duraklatma veya devam ettirme işlevini çağırma
    }
});
