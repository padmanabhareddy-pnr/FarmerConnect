
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("cropSearch");
    const categoryFilter = document.getElementById("categoryFilter");
    const productCards = Array.from(
        document.querySelectorAll(".product-card")
    );
    const emptyState = document.getElementById("emptyState");

    function filterProducts() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const selectedCategory = categoryFilter.value;
        let visibleCount = 0;

        productCards.forEach((card) => {
            const searchableText = card.dataset.name || "";
            const category = card.dataset.category || "";

            const matchesSearch = searchableText.includes(searchTerm);
            const matchesCategory =
                selectedCategory === "all" ||
                category === selectedCategory;

            const isVisible = matchesSearch && matchesCategory;

            card.hidden = !isVisible;

            if (isVisible) {
                visibleCount++;
            }
        });

        emptyState.hidden = visibleCount !== 0;
    }

    searchInput.addEventListener("input", filterProducts);
    categoryFilter.addEventListener("change", filterProducts);

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        });
    });

    filterProducts();
});
