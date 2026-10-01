# Cláudia Marinho — Portfolio

Portfolio migrated to React, TypeScript, and Vite while preserving the content, styling, and functionality of the original website.

## Development

Requires Node.js 20.19+ and npm.

```sh
npm install
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

Deploy the contents of **dist/** to a static hosting service. The project uses relative paths so it can also be deployed under a subdirectory.

### Automatic GitHub Pages deployment

The repository's `.github/workflows/deploy.yml` builds **app/dist/** and publishes
it directly to GitHub Pages whenever you push to **master**. It installs locked
dependencies, checks lint and formatting, and runs the type-checked production
build before publishing. You can also run it manually from the Actions tab.

One-time setup: in the repository's **Settings → Pages → Build and deployment**,
set **Source** to **GitHub Actions**. Commit and push the workflow to activate it.

After setup, edit and commit the source under **app/** as usual. You no longer need
to copy the build to the repository root or commit generated assets. The existing
root build is retained for the transition; after the first successful Actions
deployment, those generated root files can be removed.

## Project Structure

- **src/components/**: one folder per component, with its TSX and CSS together. Each component imports its own stylesheet.
- **src/components/Projects/**: the Projects section, ProjectCard component, and `projects.data.ts` content.
- **src/components/Build/**: the Build section and `build.data.ts` capability copy, icon colours, and SVG geometry.
- **src/components/Experience/**: the timeline layout and `experience.data.ts` companies, logos, dates, and role descriptions.
- **src/components/About/**: the About section and its layout styles.
- **src/components/Postcards/**: postcard triggers and modal, their colocated styles, and `postcards.data.ts` captions and locations. The native dialog supports Escape, backdrop dismissal, focus restoration, scroll locking, and reduced motion.
- **src/components/Header/navigation.ts**: navigation links, shared with the section navigation hook.
- **src/hooks/**: active navigation, header height, and entrance animations, including proper cleanup of listeners and observers.
- **src/styles/**: shared colour tokens (`tokens.css`), resets and typography (`global.css`), section layout utilities (`layout.css`), and reveal animations (`motion.css`). These load before component styles in `main.tsx`.
- **public/assets/**: images and the CV PDF used in the deployed website.

Contact links, CV download, metadata, fonts, lazy-loaded images, anchor navigation, and reduced-motion preferences have been preserved.

Use **npm run format** to format the code and **npm run format:check** to verify formatting.

The app's **.prettierrc.json** defines the shared formatting rules.
Its **.prettierignore** excludes generated output and public assets.

For format on save in VS Code, open the **app/** folder and install the recommended
**Prettier - Code formatter** extension (`esbenp.prettier-vscode`). The checked-in
**.vscode/settings.json** selects Prettier and enables formatting on save. The
extension uses the same configuration as the command-line scripts.

## Testing

`npm test` runs browser tests for desktop and mobile using Microsoft Edge. To use a different browser, update the `channel` setting in `playwright.config.ts`.

Tests build the app and serve **dist/**, exercising the production output rather
than the development server. Coverage is grouped by purpose:

- **portfolio.spec.ts**: section content, career history, responsive overflow,
  contact links, the CV download, and loaded images with alternative text.
- **navigation.spec.ts**: section alignment, active links, returning to the top,
  direct fragment URLs, browser history, and keyboard activation.
- **postcards.spec.ts**: each photo's accessible caption, touch and keyboard
  opening, all dismissal methods, scroll and focus restoration, focus trapping,
  reopening, and motion preferences.
- **hooks.spec.ts**: layout changes, reduced motion, and observer fallbacks.
- **helpers.ts**: shared assertions for section alignment and viewport bounds.

Failed tests retain screenshots and Playwright traces under **test-results/**.
To run a focused group, use `npm test -- tests/navigation.spec.ts`.

## TypeScript and Code Quality

TypeScript runs in strict mode and validates the application, tests, and build configuration.

Application imports use the `@/` alias, which points to `src/` in both Vite and TypeScript.

Example:

```ts
import Header from "@/components/Header/Header";
```

Public asset URLs remain relative to support deployments under subdirectories.

- `npm run typecheck`: validates TypeScript types without emitting files.
- `npm run lint`: runs ESLint with TypeScript, React Hooks, and absolute-import rules.
- `npm run lint:fix`: automatically applies supported lint fixes.
- `npm run check`: runs type checking, linting, formatting checks, browser tests, and the production build.

## Styling conventions

- Keep a component's layout, typography, decorations, and interactions in its own CSS file. Use component-specific class names to avoid collisions.
- Put base rules first, followed by elements, variants, and interaction states. Keep all media queries at the end: desktop-first width queries from largest to smallest, then interaction/motion queries, and print rules last.
- Keep only shared rules in `src/styles/`. `Rays.css` owns the shared decoration appearance; the component using a decoration owns its placement.
- Consolidate existing rules when changing a design instead of appending override layers. Remove selectors only after checking JSX, data-driven classes, hooks, pseudo-elements, and interaction states.
- Keep component-specific data beside its component. Use descriptive data filenames such as `projects.data.ts` to avoid case-insensitive resolution collisions with `Projects.tsx` on Windows.
- Preserve the `@/` source alias for both component and CSS imports. Avoid barrel files for these small component folders.
