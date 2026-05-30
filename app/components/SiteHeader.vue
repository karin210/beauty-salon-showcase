<template>
  <header class="site-header">
    <div class="site-header__inner">
      <a href="/" class="site-header__logo" aria-label="Luxury Beauty — página de inicio">
        <span class="site-header__logo-word site-header__logo-word--light">Luxury</span>
        <span class="site-header__logo-word site-header__logo-word--bold">Beauty</span>
      </a>

      <button class="site-header__profile" type="button" aria-label="Perfil de usuario">
        <svg
          class="site-header__profile-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      </button>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-surface-muted);
  box-shadow: 0 1px 8px rgba(43, 32, 36, 0.08);
}

.site-header__inner {
  max-width: 64rem;
  margin-inline: auto;
  padding: 0 var(--space-md);
  height: clamp(3.5rem, 8vw, 5rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.site-header__logo {
  display: flex;
  align-items: baseline;
  gap: 0.35em;
  text-decoration: none;
  font-family: var(--font-heading);
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  line-height: 1;
  color: var(--color-ink);
}

.site-header__logo:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 4px;
  border-radius: 2px;
}

.site-header__logo-word--light {
  font-weight: 400;
  color: var(--color-primary);
}

.site-header__logo-word--bold {
  font-weight: 700;
  color: var(--color-ink);
}

.site-header__profile {
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(2.25rem, 5vw, 2.75rem);
  height: clamp(2.25rem, 5vw, 2.75rem);
  border: none;
  border-radius: 50%;
  background-color: var(--color-surface-muted);
  color: var(--color-ink);
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.site-header__profile:hover {
  background-color: var(--color-primary);
  color: var(--color-on-dark);
}

.site-header__profile:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 3px;
}

.site-header__profile-icon {
  width: clamp(1.1rem, 2.5vw, 1.4rem);
  height: clamp(1.1rem, 2.5vw, 1.4rem);
}
</style>
