// Data produk disimpan dalam bentuk array of objects
let products = [];

// Fungsi untuk menambahkan produk ke dalam array
function addProduct() {
  const productName = document.getElementById('productName').value;
  const productPrice = parseFloat(document.getElementById('productPrice').value);
  const productImageInput = document.getElementById('productImage');
  const productImageFile = productImageInput.files[0]; // Mendapatkan file gambar yang dipilih

  if (productName && !isNaN(productPrice) && productPrice > 0) {
    const product = {
      name: productName,
      price: productPrice,
      image: productImageFile ? URL.createObjectURL(productImageFile) : null // Menyimpan URL gambar sementara
    };

    products.push(product);
    updateTable();
    calculateTotalPrice();
    clearForm();
  } else {
    alert('Silakan isi Nama Produk dan Harga (per KG) dengan benar.');
  }
}

// Fungsi untuk mengupdate tampilan tabel produk
function updateTable() {
  const tableBody = document.querySelector('#productTable tbody');
  tableBody.innerHTML = '';

  products.forEach((product, index) => {
    const row = tableBody.insertRow();
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${product.image ? `<img src="${product.image}" alt="${product.name}" style="max-width: 100px; max-height: 100px;">` : ''}</td>
      <td>
        <button onclick="deleteProduct(${index})">Hapus</button>
      </td>
    `;
  });
}

// Fungsi untuk menghapus produk dari array
function deleteProduct(index) {
  products.splice(index, 1);
  updateTable();
  calculateTotalPrice();
}

// Fungsi untuk menghitung dan menampilkan total harga semua produk
function calculateTotalPrice() {
  const totalPriceElement = document.getElementById('totalPrice');
  const totalPrice = products.reduce((total, product) => total + product.price, 0);
  totalPriceElement.textContent = totalPrice;
}

// Fungsi untuk membersihkan formulir setelah menambahkan produk
function clearForm() {
  document.getElementById('productName').value = '';
  document.getElementById('productPrice').value = '';
  document.getElementById('productImage').value = ''; // Menghapus nilai input file
  document.getElementById('imagePreview').innerHTML = ''; // Menghapus preview gambar
}

// Menjalankan fungsi updateTable saat halaman dimuat
window.onload = updateTable;
