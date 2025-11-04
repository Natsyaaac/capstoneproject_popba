function kirimSoal(event) {
    event.preventDefault();
    
    const textSoal = document.getElementById('textSoal').value.trim();
    
    if (!textSoal) {
        alert('Mohon isi soal terlebih dahulu!');
        return;
    }
    
    if (window.opener && !window.opener.closed) {
        window.opener.terimasoal(textSoal);
        window.close();
    } else {
        alert('Tidak dapat mengirim ke halaman utama. Pastikan halaman utama masih terbuka.');
    }
}
