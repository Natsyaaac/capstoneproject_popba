function bukaWindowInput() {
    const popupWindow = window.open(
        "popup.html",
        "InputSoal",
        "width=600,height=400,scrollbars=yes,resizable=yes"
    );
    
    if (!popupWindow) {
        alert('Popup diblokir oleh browser. Mohon izinkan popup untuk website ini.');
    }
}

function terimasoal(soal) {
    const hasilDiv = document.getElementById('hasil');
    
    const emptyState = hasilDiv.querySelector('.empty-state');
    if (emptyState) {
        hasilDiv.innerHTML = '';
        hasilDiv.classList.add('has-content');
    }
    
    const jumlahSoal = hasilDiv.querySelectorAll('.soal-item').length + 1;
    const soalItem = document.createElement('div');
    soalItem.className = 'soal-item';
    soalItem.innerHTML = `
        <div class="soal-label">Soal #${jumlahSoal}</div>
        <div class="soal-text">${escapeHtml(soal)}</div>
    `;
    
    hasilDiv.appendChild(soalItem);
    soalItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
