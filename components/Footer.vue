<template>
  <footer class="footer bg-dark w-100">
    <div class="footer-container">
      <div class="footer-item">
        <ul class="footer-list">
          <li class="footer-item">
            <a href="#" class="footer-link text-secondary">About us</a>
          </li>
          <li class="footer-item">
            <a href="#" class="footer-link text-secondary"
              >Política de privacidad</a
            >
          </li>
          <li class="footer-item">
            <a href="#" class="footer-link text-secondary">Ayuda</a>
          </li>
        </ul>
      </div>
      <div class="footer-item">
        <p class="footer-copy text-secondary">&copy; 2021 coffe.gg</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {}
</script>

<style scoped>
.footer {
  justify-self: flex-end;
  align-self: flex-end;
}

.footer-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 1em;
}

.footer-item {
  padding: 0.3em;
  display: flex;
  justify-content: center;
}

.footer-link {
  color: white;
}

.footer-copy {
  color: white;
}
</style>
