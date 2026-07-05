# Conexia Skills

Use these compact project skills to reduce repeated context in future Conexia frontend MVP work.

## conexia-frontend-mvp
- Build frontend-only screens from Figma, PDFs, or user specs.
- Use static/mock data; no backend, API, database, auth, or real encryption.
- Prioritize visual completeness over production logic.
- Implement pages first, modal states second, routing third.
- Agreement creation must include a USJR department selector.

## conexia-role-flow
- Maintain all role workspaces: Department Staff, Department Admin, Department READS, IRO Admin, IRO Staff, IRO READS, Legal, President's Office, Super Admin.
- Keep role copy, pages, permissions, and dashboards consistent with user requirements.
- Department roles stay department-scoped; IRO Admin has operational document control.
- READS roles are read-only; Super Admin is governance-only without confidential document access by default.

## conexia-routing
- Use frontend-only navigation state or existing route helpers.
- Every visible sidebar/nav/action should lead to the intended static page or state.
- Do not introduce server routing or protected-route backend assumptions.
- Keep unknown routes simple and MVP-friendly.

## conexia-modal-states
- Create modals/dialogs required by Figma or user specs.
- Make modal triggers visible from the relevant page actions.
- Include close/cancel/confirm states where the design implies them.
- Keep modal data static unless existing local state is enough.
- Use the fixed USJR department list for agreement department selection.

## conexia-design-system
- Match the current green/gold institutional style in `src/styles.css`.
- Use lucide-react icons for actions, navigation, and status cues.
- Keep dashboards dense, scannable, and work-focused.
- Avoid decorative UI that does not support the workflow.

## react-best-practices
- Prefer config-driven rendering for repeated roles, pages, cards, and nav items.
- Extract components only when it reduces real duplication or improves readability.
- Keep state ownership clear and local to the smallest useful component.
- Avoid unnecessary `useEffect`; derive UI from state/config when possible.
- Use stable keys, semantic elements, accessible buttons, labels, and form controls.

## web-ui-ux-practices
- Ensure responsive layouts across mobile, tablet, and desktop.
- Use clear hierarchy, readable contrast, consistent spacing, and predictable actions.
- Prevent text overlap, clipped labels, and layout shifts.
- Keep dashboards optimized for scanning, comparison, and repeated work.
- Add useful empty, loading, error, or static placeholder states when needed for MVP review.
