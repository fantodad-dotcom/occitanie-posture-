# Product

## Register

product

## Users

Damien Duplan, Responsable Secteur Médical (RSM) Novo Nordisk, région Occitanie. Il utilise l'outil seul, en déplacement ou au bureau, principalement sur iPhone entre deux rendez-vous ou après une visite terrain. Il gère 11 délégués médicaux dont il doit évaluer et faire progresser la posture commerciale selon la méthode E&C.

## Product Purpose

Dashboard de suivi de la transformation de posture commerciale des délégués médicaux. Permet de saisir les cotations après chaque DUO (visite accompagnée), visualiser la progression par axe (Interpeller / Débattre / Engager) et par niveau (En cours / Acquis / Expert), préparer les séances de coaching individualisées, et avoir une vue d'ensemble de l'équipe en temps réel. Le succès = Damien peut coacher chaque délégué avec des questions précises et un suivi factuel, sans paperasse.

## Brand Personality

Précis, factuel, sobre. L'outil doit inspirer confiance à un cadre médical senior : aucune fantaisie, aucun excès, des données lisibles immédiatement. Pense "cockpit" plutôt que "app grand public".

## Anti-references

- Dashboards colorés et ludiques type Duolingo, Notion, ou Linear — trop grand public
- Palette claire / blanche type SaaS B2C — pas le bon registre pour un outil terrain médical
- Effets glassmorphism, dégradés de texte, cards sur-arrondies — décoratif sans valeur
- Emojis comme éléments d'interface

## Design Principles

1. **Données avant tout** — chaque pixel doit servir une donnée ou une action. Rien de décoratif.
2. **Mobile-first terrain** — l'outil est utilisé sur iPhone entre deux rendez-vous. Lisibilité et touch targets primordiaux.
3. **Terminologie stable** — DUO, E&C, Interpeller/Débattre/Engager sont des termes métier figés. L'interface les reflète sans les réinterprèter.
4. **Hiérarchie visible** — ce qui est urgent (niveau 1) doit sauter aux yeux sans survol.
5. **Confiance immédiate** — un RSM doit pouvoir montrer l'outil à sa direction sans honte. Finition professionnelle, pas de prototype.

## Accessibility & Inclusion

- WCAG AA minimum (contraste ≥ 4.5:1 sur texte normal)
- `prefers-reduced-motion` respecté (déjà implémenté)
- Touch targets ≥ 44px sur mobile (déjà implémenté)
- Pas de dépendance à la couleur seule pour transmettre l'information (les niveaux ont aussi un label texte)
