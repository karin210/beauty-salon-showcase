<script setup lang="ts">
// Static showcase hero. Image lives in /public so it is served from the site root.
const backgroundImage = "/hair-wash-1.jpg";
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div
      class="hero__background"
      :style="{ backgroundImage: `url('${backgroundImage}')` }"
      role="img"
      aria-label="Lavado de cabello en el salón de belleza"
    ></div>
    <div class="hero__overlay"></div>

    <div class="hero__content">
      <p class="hero__eyebrow">Salón de belleza</p>
      <h1 id="hero-title" class="hero__title">
        Realza tu belleza natural
      </h1>
      <p class="hero__subtitle">
        Cuidado experto del cabello en un espacio pensado para consentirte.
      </p>
      <a class="hero__cta" href="#agendar">Agendar cita</a>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: clamp(28rem, 80vh, 48rem);
  padding: var(--space-lg) var(--space-md);
  overflow: hidden;
  text-align: center;
}

/* Wrapper carries the absolute positioning so siblings keep normal flow. */
.hero__background {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background-color: var(--color-overlay);
}

.hero__content {
  position: relative;
  max-width: 40rem;
  color: var(--color-on-dark);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
}

.hero__eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: clamp(0.75rem, 1.5vw, 0.95rem);
}

.hero__title {
  margin: 0;
  font-size: clamp(2.25rem, 6vw, 4rem);
}

.hero__subtitle {
  margin: 0;
  font-size: clamp(1rem, 2.5vw, 1.35rem);
  max-width: 32rem;
}

.hero__cta {
  margin-top: var(--space-sm);
  display: inline-block;
  padding: clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2.5rem);
  background-color: var(--color-primary);
  color: var(--color-on-dark);
  font-size: clamp(1rem, 2vw, 1.15rem);
  font-weight: 600;
  text-decoration: none;
  border-radius: 999px;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.hero__cta:hover {
  background-color: var(--color-primary-dark);
  transform: translateY(-2px);
}

.hero__cta:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 3px;
}
</style>
