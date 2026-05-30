<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <address class="site-footer__contact">
        <p class="site-footer__name">Luxury Beauty Salón de Belleza</p>
        <ul class="site-footer__list">
          <li>
            <a href="mailto:contacto@luxurybeauty.mx" class="site-footer__link">
              contacto@luxurybeauty.mx
            </a>
          </li>
          <li>
            <a href="tel:+524431234567" class="site-footer__link">
              (443) 123-4567
            </a>
          </li>
          <li>
            Calle Madero 248, Col. Centro Histórico,<br />
            Morelia, Michoacán, C.P. 58000
          </li>
        </ul>
      </address>

      <p class="site-footer__copy">
        &copy; {{ year }} Luxury Beauty. Todos los derechos reservados.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<style scoped>
.site-footer {
  background-color: var(--color-ink);
  color: var(--color-on-dark);
  padding: var(--space-lg) var(--space-md);
}

.site-footer__inner {
  max-width: 64rem;
  margin-inline: auto;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  align-items: flex-start;
  justify-content: space-between;
}

.site-footer__name {
  font-family: var(--font-heading);
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  color: var(--color-accent);
  margin: 0 0 0.5rem;
}

.site-footer__list {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: clamp(0.85rem, 1.5vw, 1rem);
  line-height: 1.8;
}

.site-footer__link {
  color: var(--color-on-dark);
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.2s ease;
}

.site-footer__link:hover,
.site-footer__link:focus-visible {
  color: var(--color-accent);
  outline: none;
}

.site-footer__link:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
  border-radius: 2px;
}

.site-footer__copy {
  font-size: clamp(0.75rem, 1.2vw, 0.875rem);
  color: var(--color-surface-muted);
  margin: 0;
  align-self: flex-end;
}

address {
  font-style: normal;
}
</style>
