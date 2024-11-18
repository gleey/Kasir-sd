  // Mengambil elemen HTML yang diperlukan
// Ambil elemen menggunakan class
const namaMakanan = document.querySelector('.namaMakanan');
const hargaMakanan = document.querySelector('.hargaMakanan');
const namaMinuman = document.querySelector('.namaMinuman');
const hargaMinuman = document.querySelector('.hargaMinuman');
const jumlahMakanan = document.getElementById('jumlahMakanan');
const jumlahMinuman = document.getElementById('jumlahMinuman');
const totalHarga = document.getElementById('totalHarga');
const bayar = document.getElementById('bayar');
const kembalian = document.getElementById('kembalian');

// Harga makanan dan minuman
const hargaMakananList = {
  'nascam': 15000,
  'Bakso': 15000,
  'Ayamlap': 17000,
  'Geprek': 17000,
  'nasGoreng': 20000,
  'Pisgor': 10000
};

const hargaMinumanList = {
  'tehManis': 5000,
  'Coffee': 8000,
  'milk': 5000,
  'cappucinoCoffee': 10000,
  'airMineral': 2000
};

// Event listener untuk perubahan jumlah makanan pada kolom pertama
document.querySelector('.jumlahMakanan').addEventListener('input', function () {
  hitungTotalHarga();
});

// Event listener untuk perubahan jumlah minuman pada kolom pertama
document.querySelector('.jumlahMinuman').addEventListener('input', function () {
  hitungTotalHarga();
});

function tambahMakanan() {
  const makananSection = document.getElementById('makananSection');
  const newMakananItem = document.createElement('div');
  newMakananItem.classList.add('row', 'makananItem');
  newMakananItem.innerHTML = `
    <label for="namaMakanan">Nama Makanan</label>
    <select class="namaMakanan">
        <option value=""> </option>
        <option value="nascam">Nasi Campur</option>
        <option value="Bakso">Bakso</option>
        <option value="Ayamlap">Ayam Lalapan</option>
        <option value="Geprek">Ayam Geprek</option>
        <option value="nasGoreng">Nasi Goreng</option>
        <option value="Pisgor">Pisang Goreng</option>
    </select>
    <span class="hargaMakanan harga">Rp. 0</span>
    <input type="number" class="jumlahMakanan" value="1" min="1">
  `;
  makananSection.appendChild(newMakananItem);

  // Tambahkan event listener ke elemen baru
  newMakananItem.querySelector('.namaMakanan').addEventListener('change', function () {
    const harga = hargaMakananList[this.value] || 0;
    this.parentNode.querySelector('.hargaMakanan').textContent = `Rp. ${harga}`;
    hitungTotalHarga();
  });

  newMakananItem.querySelector('.jumlahMakanan').addEventListener('input', function () {
    hitungTotalHarga();
  });
}

function tambahMinuman() {
  const minumanSection = document.getElementById('minumanSection');
  const newMinumanItem = document.createElement('div');
  newMinumanItem.classList.add('row', 'minumanItem');
  newMinumanItem.innerHTML = `
    <label for="namaMinuman">Nama Minuman</label>
    <select class="namaMinuman">
        <option value=""> </option>
        <option value="tehManis">Es Teh</option>
        <option value="Coffee">Kopi Itam</option>
        <option value="milk">Susu</option>
        <option value="cappucinoCoffee">Cappuccino</option>
        <option value="airMineral">Air Mineral</option>
    </select>
    <span class="hargaMinuman harga">Rp. 0</span>
    <input type="number" class="jumlahMinuman" value="1" min="1">
  `;
  minumanSection.appendChild(newMinumanItem);

  // Tambahkan event listener ke elemen baru
  newMinumanItem.querySelector('.namaMinuman').addEventListener('change', function () {
    const harga = hargaMinumanList[this.value] || 0;
    this.parentNode.querySelector('.hargaMinuman').textContent = `Rp. ${harga}`;
    hitungTotalHarga();
  });

  newMinumanItem.querySelector('.jumlahMinuman').addEventListener('input', function () {
    hitungTotalHarga();
  });
}

document.querySelectorAll('.namaMakanan').forEach(select => {
  select.addEventListener('change', function () {
    const harga = hargaMakananList[this.value] || 0;
    this.parentNode.querySelector('.hargaMakanan').textContent = `Rp. ${harga}`;
    hitungTotalHarga();
  });
});

document.querySelectorAll('.namaMinuman').forEach(select => {
  select.addEventListener('change', function () {
    const harga = hargaMinumanList[this.value] || 0;
    this.parentNode.querySelector('.hargaMinuman').textContent = `Rp. ${harga}`;
    hitungTotalHarga();
  });
});

function hitungTotalHarga() {
  let total = 0;

  // Hitung total harga makanan
  document.querySelectorAll('.makananItem').forEach(item => {
    const select = item.querySelector('.namaMakanan');
    const harga = hargaMakananList[select.value] || 0;
    const jumlah = parseInt(item.querySelector('.jumlahMakanan').value) || 0;
    total += harga * jumlah;
  });

  // Hitung total harga minuman
  document.querySelectorAll('.minumanItem').forEach(item => {
    const select = item.querySelector('.namaMinuman');
    const harga = hargaMinumanList[select.value] || 0;
    const jumlah = parseInt(item.querySelector('.jumlahMinuman').value) || 0;
    total += harga * jumlah;
  });

  // Perbarui total harga
  totalHarga.textContent = `Rp. ${total}`;

  // Perbarui kembalian jika ada pembayaran
  if (bayar.value) {
    hitungKembalian(total);
  }
}

// Menghitung kembalian
function hitungKembalian(total) {
  const bayarValue = parseInt(bayar.value) || 0;
  const kembalianValue = bayarValue - total;
  kembalian.textContent = `Rp. ${kembalianValue >= 0 ? kembalianValue : 0}`;
}

// Ketika tombol submit ditekan
document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();
  hitungTotalHarga();
});

function prosesPesanan() {
  let totalHargaValue = 0;
  let bayarValue = parseInt(bayar.value) || 0;
  let strukMakanan = '';
  let strukMinuman = '';

  // Ambil data makanan
  document.querySelectorAll('.makananItem').forEach(item => {
    const namaMakanan = item.querySelector('.namaMakanan');
    const jumlahMakanan = parseInt(item.querySelector('.jumlahMakanan').value) || 0;
    const hargaMakananValue = hargaMakananList[namaMakanan.value] || 0;
    const subtotal = hargaMakananValue * jumlahMakanan;

    if (namaMakanan.value) {
      strukMakanan += `
        <tr>
          <td>${namaMakanan.options[namaMakanan.selectedIndex].text}</td>
          <td>${jumlahMakanan}</td>
          <td>Rp. ${hargaMakananValue}</td>
          <td>Rp. ${subtotal}</td>
        </tr>`;
      totalHargaValue += subtotal;
    }
  });

  // Ambil data minuman
  document.querySelectorAll('.minumanItem').forEach(item => {
    const namaMinuman = item.querySelector('.namaMinuman');
    const jumlahMinuman = parseInt(item.querySelector('.jumlahMinuman').value) || 0;
    const hargaMinumanValue = hargaMinumanList[namaMinuman.value] || 0;
    const subtotal = hargaMinumanValue * jumlahMinuman;

    if (namaMinuman.value) {
      strukMinuman += `
        <tr>
          <td>${namaMinuman.options[namaMinuman.selectedIndex].text}</td>
          <td>${jumlahMinuman}</td>
          <td>Rp. ${hargaMinumanValue}</td>
          <td>Rp. ${subtotal}</td>
        </tr>`;
      totalHargaValue += subtotal;
    }
  });

  // Hitung kembalian
  const kembalianValue = bayarValue - totalHargaValue;

  // Buat konten struk
  const cetakStruk = `
      <html>
      <head>
          <title>Struk Pembayaran</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 50px;
                  text-align: center;
              }
              .struk {
                  width: 400px;
                  margin: 0 auto;
                  text-align: left;
                  border: 1px solid #000;
                  padding: 10px; 
              }
              .struk table {
                  width: 105%;
                  border-collapse: collapse;
              }
              .struk th, .struk td {
                  padding: 5px;
                  text-align: left;
              }
              .struk h3 {
                  text-align: center;
              }
              .footer {
                  text-align: center;
                  margin-top: 20px;
              }
          </style>
      </head>
      <body>
          <div class="struk">
              <h3>Rampah-Rampah Caffe & Catering</h3>
              <table>
                  <thead>
                      <tr>
                          <th>Barang</th>
                          <th>Jumlah</th>
                          <th>Harga</th>
                          <th>Subtotal</th>
                      </tr>
                  </thead>
                  <tbody>
                      ${strukMakanan}
                      ${strukMinuman}
                  </tbody>
                  <tfoot>
                      <tr>
                          <td colspan="3"><strong>Total</strong></td>
                          <td><strong>Rp. ${totalHargaValue}</strong></td>
                      </tr>
                      <tr>
                          <td colspan="3">Bayar</td>
                          <td>Rp. ${bayarValue}</td>
                      </tr>
                      <tr>
                          <td colspan="3">Kembalian</td>
                          <td>Rp. ${kembalianValue >= 0 ? kembalianValue : 0}</td>
                      </tr>
                  </tfoot>
              </table>
              <div class="footer">
                  <p>Terima kasih atas kunjungan Anda!</p>
              </div>
          </div>
      </body>
      </html>
  `;

  // Membuka jendela baru untuk mencetak
  const printWindow = window.open('', '', 'width=800,height=600');
  printWindow.document.open();
  printWindow.document.write(cetakStruk);
  printWindow.document.close();
  printWindow.print();
}