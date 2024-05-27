// Fungsi ini akan dieksekusi saat halaman dimuat
window.onload = function() {
    // Mendapatkan elemen-elemen yang dapat diedit
    const judulJurnal = document.getElementById('judulJurnal');
    const namaPenulis = document.getElementById('namaPenulis');
    const abstrakContent = document.getElementById('abstrakContent');
    const pendahuluanContent = document.getElementById('pendahuluanContent');
    const metodeContent = document.getElementById('metodeContent');
    const hasilContent = document.getElementById('hasilContent');
    const kesimpulanContent = document.getElementById('kesimpulanContent');
    const daftarpustakaContent = document.getElementById('daftarpustakaContent');

    // Memuat konten yang tersimpan saat halaman dimuat kembali
    judulJurnal.innerText = localStorage.getItem('judulJurnal') || 'Judul Jurnal';
    namaPenulis.innerText = localStorage.getItem('namaPenulis') || 'Nama Penulis';
    abstrakContent.innerHTML = localStorage.getItem('abstrakContent') || '';
    pendahuluanContent.innerHTML = localStorage.getItem('pendahuluanContent') || '';
    metodeContent.innerHTML = localStorage.getItem('metodeContent') || '';
    hasilContent.innerHTML = localStorage.getItem('hasilContent') || '';
    kesimpulanContent.innerHTML = localStorage.getItem('kesimpulanContent') || '';
    daftarpustakaContent.innerHTML = localStorage.getItem('daftarpustakaContent') || '';

    // Menyimpan konten saat konten diubah
    const saveContent = function() {
        localStorage.setItem('judulJurnal', judulJurnal.innerText);
        localStorage.setItem('namaPenulis', namaPenulis.innerText);
        localStorage.setItem('abstrakContent', abstrakContent.innerHTML);
        localStorage.setItem('pendahuluanContent', pendahuluanContent.innerHTML);
        localStorage.setItem('metodeContent', metodeContent.innerHTML);
        localStorage.setItem('hasilContent', hasilContent.innerHTML);
        localStorage.setItem('kesimpulanContent', kesimpulanContent.innerHTML);
        localStorage.setItem('daftarpustakaContent', daftarpustakaContent.innerHTML);
    };

    judulJurnal.addEventListener('input', saveContent);
    namaPenulis.addEventListener('input', saveContent);
    abstrakContent.addEventListener('input', saveContent);
    pendahuluanContent.addEventListener('input', saveContent);
    metodeContent.addEventListener('input', saveContent);
    hasilContent.addEventListener('input', saveContent);
    kesimpulanContent.addEventListener('input', saveContent);
    daftarpustakaContent.addEventListener('input', saveContent);

    // Menangani input teks yang ditempelkan atau diinput
    const handlePasteInput = function(event) {
        const clipboardData = event.clipboardData || window.clipboardData;
        const pastedData = clipboardData.getData('text/plain');
        const selection = window.getSelection();
        if (selection) {
            event.preventDefault();
            const newText = document.createTextNode(pastedData);
            const div = document.createElement('div');
            div.appendChild(newText);
            div.style.textAlign = 'justify'; // Menentukan rata teks
            selection.getRangeAt(0).deleteContents();
            selection.getRangeAt(0).insertNode(div);
        }
    };

    // Menambahkan event listener untuk menangani input teks yang ditempelkan
    abstrakContent.addEventListener('paste', handlePasteInput);
    pendahuluanContent.addEventListener('paste', handlePasteInput);
    metodeContent.addEventListener('paste', handlePasteInput);
    hasilContent.addEventListener('paste', handlePasteInput);
    kesimpulanContent.addEventListener('paste', handlePasteInput);
    daftarpustakaContent.addEventListener('paste', handlePasteInput);

    // Menampilkan gambar setelah diunggah
    const imageInput = document.getElementById('imageUpload');
    const imagePreview = document.getElementById('imagePreview');

    // Menambahkan gaya CSS untuk teks di bawah gambar saat membuat jurnal
    imageCaption.style.textAlign = 'justify';
    additionalContent.style.textAlign = 'justify';

    imageInput.addEventListener('change', function() {
        const file = this.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            const img = new Image();
            img.src = event.target.result;
            img.onload = function() {
                imagePreview.innerHTML = '';
                imagePreview.appendChild(img);
            };
        };

        reader.readAsDataURL(file);
    });

    // Menambahkan event listener untuk tombol urutkan
    const sortButton = document.createElement('button');
    sortButton.textContent = 'Urutkan Daftar Pustaka';
    sortButton.addEventListener('click', sortDaftarPustaka);
    document.body.insertBefore(sortButton, document.getElementById('daftar-pustaka'));
};

// Fungsi untuk mengurutkan daftar pustaka berdasarkan huruf A-Z
function sortDaftarPustaka() {
    const daftarPustakaContent = document.getElementById('daftarpustakaContent');
    const items = daftarPustakaContent.children;

    // Menyiapkan array untuk menyimpan teks daftar pustaka
    let itemsArray = [];

    // Memasukkan teks dari elemen daftar pustaka ke dalam array
    for (let i = 0; i < items.length; i++) {
        if (items[i].nodeName === 'DIV') { // Pastikan hanya elemen div yang dimasukkan
            itemsArray.push(items[i].textContent.trim());
        }
    }

    // Mengurutkan array berdasarkan teks pada elemen
    itemsArray.sort(function(a, b) {
        const textA = a.toUpperCase();
        const textB = b.toUpperCase();
        if (textA < textB) return -1;
        if (textA > textB) return 1;
        return 0;
    });

    // Menghapus semua elemen dari daftar pustaka
    while (daftarPustakaContent.firstChild) {
        daftarPustakaContent.removeChild(daftarPustakaContent.firstChild);
    }

    // Menambahkan kembali elemen-elemen yang telah diurutkan
    itemsArray.forEach(function(itemText) {
        const div = document.createElement('div');
        div.textContent = itemText;
        daftarPustakaContent.appendChild(div);
    });
}

// Fungsi untuk menampilkan hasil jurnal
function submitJournal() {
    // Mengambil konten dari setiap bagian jurnal
    const judulJurnal = document.getElementById('judulJurnal').innerText.trim();
    const namaPenulis = document.getElementById('namaPenulis').innerText.trim();
    const abstrak = document.getElementById('abstrakContent').innerHTML.trim();
    const pendahuluan = document.getElementById('pendahuluanContent').innerHTML.trim();
    const metode = document.getElementById('metodeContent').innerHTML.trim();
    const hasil = document.getElementById('hasilContent').innerHTML.trim();
    const kesimpulan = document.getElementById('kesimpulanContent').innerHTML.trim();
    const daftarpustaka = document.getElementById('daftarpustakaContent').innerHTML.trim();
   
    // Mengambil konten dari elemen tambahan
    const imageCaption = document.getElementById('imageCaption').innerText.trim();
    const additionalContent = document.getElementById('additionalContent').innerText.trim();
    const imagePreview = document.getElementById('imagePreview').innerHTML.trim();

    // Membuat teks HTML yang berisi hasil jurnal dengan gambar dan teks yang rata kanan-kiri
    const hasilJurnal = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${judulJurnal}</title>
        <link rel="stylesheet" href="jurnal.css">
        <style>
            .text-justify {
                text-align: justify;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <header>
                <h1>${judulJurnal}</h1>
                <div>${namaPenulis}</div>
            </header>
            <section id="abstrak">
                <h2>Abstrak</h2>
                <div>${abstrak}</div>
            </section>
            <section id="pendahuluan">
                <h2>Pendahuluan</h2>
                <div>${pendahuluan}</div>
            </section>
            <section id="metode">
                <h2>Metode</h2>
                <div>${metode}</div>
            </section>
            <section id="hasil">
                <h2>Hasil dan Pembahasan</h2>
                <div>${hasil}</div>
                <div class="media">
                    <h3>Gambar</h3>
                    ${imagePreview}
                    <div class="text-justify">${imageCaption}</div>
                    <div class="text-justify">${additionalContent}</div>
                </div>
            </section>
            <section id="kesimpulan">
                <h2>Kesimpulan</h2>
                <div>${kesimpulan}</div>
            </section>
            <section id="daftar-pustaka">
                <h2>Daftar Pustaka</h2>
                <div>${daftarpustaka}</div>
            </section>
        </div>
    </body>
    </html>
    `;
    
    // Membuka halaman baru dengan hasil jurnal
    const popup = window.open();
    popup.document.write(hasilJurnal);
}
