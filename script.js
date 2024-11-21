document.addEventListener("DOMContentLoaded", () => {
    const loginSection = document.getElementById("login-section");
    const mainSection = document.getElementById("main-section");
    const loginForm = document.getElementById("loginForm");
    const addItemBtn = document.getElementById("addItemBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const modal = document.getElementById("modal");
    const closeModal = document.querySelector(".close");
    const itemForm = document.getElementById("itemForm");
    const itemsList = document.getElementById("items-list");
    const itemName = document.getElementById("itemName");
    const itemDesc = document.getElementById("itemDesc");
    const itemImage = document.getElementById("itemImage");
    const imagePreview = document.getElementById("imagePreview");

    let userRole = null; // Peran pengguna (admin/buyer)

    // Login form submission
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Login sederhana (hardcoded)
        if (username === "admin" && password === "admin123") {
            userRole = "admin";
            alert("Login sebagai Admin berhasil!");
        } else if (username === "buyer" && password === "buyer123") {
            userRole = "buyer";
            alert("Login sebagai Buyer berhasil!");
        } else {
            alert("Username atau Password salah!");
            return;
        }

        // Sembunyikan login section, tampilkan main section dan tombol logout
        loginSection.style.display = "none"; // Sembunyikan login form
        mainSection.classList.remove("hidden");
        logoutBtn.classList.remove("hidden"); // Tampilkan tombol logout

        if (userRole === "admin") {
            addItemBtn.classList.remove("hidden");
        }
    });

    // Logout
    logoutBtn.addEventListener("click", () => {
        userRole = null;
        loginSection.style.display = "flex"; // Tampilkan login form kembali
        mainSection.classList.add("hidden");
        logoutBtn.classList.add("hidden"); // Sembunyikan tombol logout
        addItemBtn.classList.add("hidden"); // Sembunyikan tombol tambah barang
    });

    // Open modal
    addItemBtn.addEventListener("click", () => {
        modal.classList.remove("hidden");
        itemForm.reset();
        imagePreview.innerHTML = "Tidak ada gambar.";
    });

    // Close modal
    closeModal.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    // Preview image
    itemImage.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                imagePreview.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
            };
            reader.readAsDataURL(file);
        } else {
            imagePreview.innerHTML = "Tidak ada gambar.";
        }
    });

    // Handle form submission
    itemForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = itemName.value;
        const desc = itemDesc.value;
        const imageSrc = imagePreview.querySelector("img")?.src || "";

        const item = document.createElement("div");
        item.classList.add("item");
        item.innerHTML = `
            <img class="item-image" src="${imageSrc}" alt="Barang">
            <div class="item-info">
                <h4 class="item-name">${name}</h4>
                <p class="item-desc">${desc}</p>
            </div>
            ${userRole === "admin" ? `<div class="item-actions"><button class="delete-btn">Hapus</button></div>` : ""}
        `;
        itemsList.appendChild(item);

        // Delete button functionality (admin only)
        if (userRole === "admin") {
            item.querySelector(".delete-btn").addEventListener("click", () => {
                itemsList.removeChild(item);
            });
        }

        modal.classList.add("hidden");
    });
});
