# Instrucciones Generales para Oito Landing Page

## Branding (Regla General)
- La palabra **"oito"** siempre debe estar estilizada en color **verde menta** (`#09BC8A` o su variable CSS `--color-accent`) y utilizar la fuente **Varela Round** (`var(--font-varela-round)`).
- Esto debe mantenerse consistente en toda la página y en futuros componentes o secciones que se agreguen. Se puede aprovechar la clase CSS `.brandHighlight` (o variantes similares) siempre que sea posible.

## Estructura de Textos
- Al agregar o modificar contenido, sigue estrictamente la estructura de textos, tono y estilo actuales de la página. Mantén la coherencia visual y comunicativa en todas las secciones.

## Tamaños de Texto (Tipografía)
Los tamaños de texto de la página están estandarizados mediante variables CSS definidas en `src/app/globals.css`. Utiliza estas variables para mantener la consistencia:

- **H1 (`var(--text-h1)`):** `4rem` en Desktop / `2.5rem` en Mobile.
  - **Uso:** Título principal de la página (ej. Hero).
- **H2 (`var(--text-h2)`):** `2.5rem` en Desktop / `2rem` en Mobile.
  - **Uso:** Títulos de las distintas secciones (Portfolio, HowWeWork, About, Contact, etc).
- **Subtitle (`var(--text-subtitle)`):** `1.5rem` en Desktop / `1.25rem` en Mobile.
  - **Uso:** Subtítulos descriptivos que acompañan a los títulos H1/H2, o frases destacadas importantes.
- **Body (`var(--text-body)`):** `1.125rem` en Desktop / `1rem` en Mobile.
  - **Uso:** Texto de los párrafos regulares, descripciones dentro de tarjetas y contenido general.
