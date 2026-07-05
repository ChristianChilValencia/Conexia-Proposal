# Conexia Agent Guide

Conexia is a React 19 + Vite frontend MVP for an institutional agreement workflow system. Keep work strictly frontend unless the user explicitly changes scope.

## Non-Negotiables
- Do not add backend services, databases, auth servers, real encryption, real APIs, or persistence.
- Use static/mock data for MVP screens and flows.
- Treat Figma, PDFs, and user-provided role requirements as source of truth.
- Preserve the current config-driven role/page structure in `src/main.jsx`.
- Keep styling aligned with `src/styles.css` and the institutional green/gold visual language.

## Main Work Order
1. Create visually complete pages.
2. Add modal/dialog states.
3. Wire frontend-only routing/navigation.
4. Verify responsive layout and UI polish.

## Current Primary Files
- `src/main.jsx`: role configs, page configs, app state, route rendering, static UI.
- `src/styles.css`: global design system and responsive layout.
- `src/assets/`: local visual assets.

## Roles To Preserve
- Department Staff
- Department Admin
- Department READS
- IRO Staff
- IRO READS
- IRO Admin
- Legal
- President's Office
- Super Admin

## Frontend Rules
- Use lucide-react icons already available in the project.
- Prefer reusable components only when they reduce duplication or clarify structure.
- Keep actions, permissions, dashboards, and workflow labels role-accurate.
- Make READS roles read-only: no create, upload, edit, approve, reject, or delete UI.
- Make Super Admin governance-only: no confidential document access or workflow action unless explicitly authorized by IRO Admin.
- Roles that create agreements must choose the USJR organizing/partner department.
- Avoid broad refactors while building MVP screens.

## USJR Department Options
- SCS - School of Computer Studies
- SAS - School of Arts and Sciences
- SBM - School of Business and Management
- SEA - School of Engineering and Architecture
- SAMS - School of Allied and Medical Sciences
- SED - School of Education
- SOL - School of Law
- ETEEAP - Expanded Tertiary Education Equivalency and Accreditation Program

## Verification
- Run `npm run build` after implementation changes.
- For docs-only changes, no build is required.
