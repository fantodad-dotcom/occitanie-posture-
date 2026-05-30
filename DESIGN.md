---
name: Occitanie Posture
description: Tableau de bord de coaching E&C pour délégués médicaux terrain
colors:
  bg: "#141414"
  surface: "#1C1C1C"
  surface-raised: "#242424"
  surface-overlay: "#2A2A2A"
  text: "#ECECEC"
  text-muted: "#888888"
  accent: "#6366F1"
  accent-ink: "#818CF8"
  axis-interpeller: "#38BDF8"
  axis-debattre: "#4ADE80"
  axis-engager: "#FB923C"
  level-en-cours: "#f85149"
  level-acquis: "#f0883e"
  level-expert: "#3fb950"
typography:
  heading:
    fontFamily: "Fira Sans, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Fira Sans, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Fira Sans, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.06em"
  data:
    fontFamily: "Fira Sans, system-ui, sans-serif"
    fontSize: "28px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "normal"
rounded:
  input: "8px"
  card: "10px"
  card-lg: "12px"
  pill: "20px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  2xl: "24px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    rounded: "{rounded.card}"
    padding: "14px 16px"
  button-primary-disabled:
    backgroundColor: "rgba(99,102,241,0.25)"
    textColor: "rgba(255,255,255,0.3)"
    rounded: "{rounded.card}"
    padding: "14px 16px"
  button-ghost:
    backgroundColor: "rgba(99,102,241,0.2)"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.card}"
    padding: "10px 20px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.card}"
    padding: "16px"
  input:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text}"
    rounded: "{rounded.input}"
    padding: "8px 10px"
  nav-item-active:
    backgroundColor: "rgba(99,102,241,0.15)"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.input}"
    padding: "8px 12px"
---

# Design System: Occitanie Posture

## 1. Overview

**Creative North Star: "La Salle de Contrôle"**

Un RSM qui ouvre l'app entre deux rendez-vous n'a pas le temps de chercher. Il a besoin d'une vue instantanée : qui progresse, qui est en difficulté, quelle action prendre. Ce design system traduit cette exigence en une interface qui s'efface devant les données. La Salle de Contrôle ne décore pas, elle opère. Chaque couleur est un signal, chaque espace est de l'air pour lire, chaque interaction confirme sans ambiguïté.

Le fond anthracite profond (#141414) est un choix délibéré pour un usage terrain. Damien consulte l'app dans des couloirs d'hôpital, en voiture, parfois dans des salles sombres entre deux visites. Le fond sombre réduit la fatigue visuelle et donne aux couleurs fonctionnelles (rouge urgence, vert expert) leur pouvoir de signal. Ce n'est pas du dark mode pour l'esthétique : c'est du dark mode parce que la scène physique l'exige.

Ce système refuse explicitement : les dashboards colorés et ludiques (Duolingo, Linear), les palettes blanches SaaS B2C, les effets glassmorphism, les dégradés de texte, et tout ce qui transforme un outil de terrain en app grand public. La confiance d'un cadre médical senior se gagne par la sobriété, pas par l'animation.

**Key Characteristics:**
- Fond anthracite OLED, trois niveaux de surface (#141414 / #1C1C1C / #242424)
- Accent indigo unique (#6366F1), utilisé sparingly pour les actions et l'état actif
- Trois couleurs E&C fonctionnelles (bleu/vert/orange) pour les axes métier
- Trois couleurs de niveau (rouge/orange/vert) pour la progression
- Fira Sans en poids unique par rôle : 700 pour les titres, 600 pour les labels, 400 pour le corps
- Inline styles partout : Tailwind v4 opacity modifiers instables dans ce projet

## 2. Colors: La Palette Anthracite

Palette restrained : fond neutre profond, un seul accent indigo, couleurs fonctionnelles E&C réservées aux données métier.

### Primary
- **Indigo Cockpit** (#6366F1): Accent unique. Bouton d'action principal, indicateur de navigation active, focus ring. Utilisé sur moins de 10% de chaque écran.
- **Indigo Ink** (#818CF8): Variante plus claire pour le texte actif, les labels sur fond indigo dim, les éléments sélectionnés en navigation.

### Secondary (axes E&C)
- **Sky Signal** (#38BDF8): Axe Interpeller. Titres, badges, fonds dim de l'axe Interpeller exclusivement.
- **Green Signal** (#4ADE80): Axe Débattre. Titres, badges, fonds dim de l'axe Débattre exclusivement.
- **Amber Signal** (#FB923C): Axe Engager. Titres, badges, fonds dim de l'axe Engager exclusivement.

### Tertiary (niveaux de progression)
- **Urgence** (#f85149): Niveau 1 En cours. Signal d'alerte dans la heatmap. Jamais utilisé comme couleur décorative.
- **Intermédiaire** (#f0883e): Niveau 2 Acquis. Signal de progression partielle.
- **Expert** (#3fb950): Niveau 3 Expert. Signal de maîtrise. Aussi utilisé pour les chiffres "zéro urgents" dans les KPI.

### Neutral
- **Fond OLED** (#141414): Background body. Le plus sombre. Fond de la sidebar et du canvas principal.
- **Surface** (#1C1C1C): Cartes, panneaux, sidebar mobile bottom. Premier niveau au-dessus du fond.
- **Surface relevée** (#242424): Inputs, items de liste, intérieur des cartes imbriquées.
- **Surface overlay** (#2A2A2A): Hover states, tooltips, éléments flottants.
- **Texte principal** (#ECECEC): Corps de texte, valeurs, noms de délégués.
- **Texte muted** (#888888): Labels, descriptions secondaires. Minimum acceptable sur fond sombre (5.6:1).
- **Bordure** (rgba(255,255,255,0.07)): Séparateurs entre surfaces. Subtile, jamais structurante.
- **Bordure forte** (rgba(255,255,255,0.12)): Séparateurs entre sections importantes.

**La Règle du Signal Unique.** Chaque couleur fonctionnelle a un rôle et un seul : les couleurs E&C pour les axes, les couleurs de niveau pour la progression, l'indigo pour les actions. Mélanger ces rôles détruit la grammaire visuelle. Interdiction d'utiliser #38BDF8 pour quoi que ce soit d'autre qu'Interpeller.

**La Règle du Contraste Minimum.** Aucun texte en dessous de #888888 sur fond sombre. #666 et #555 échouent le WCAG AA. #444 est réservé aux séparateurs visuels non-textuels uniquement.

## 3. Typography

**Body/Display Font:** Fira Sans (system-ui, sans-serif)
**Mono:** non utilisé

**Character:** Une famille unique en quatre poids distincts. Fira Sans est plus dense et technique qu'Inter, ce qui convient à un outil de données terrain. Pas de serif, pas de display font séparé : la hiérarchie est portée entièrement par le poids et la taille.

### Hierarchy
- **Data** (700, 28px, line-height 1): Chiffres KPI sur la vue équipe. Jamais utilisé pour du texte.
- **Heading** (700, 16px, line-height 1.3): Titres de page. Un seul par page.
- **Title** (600, 14–15px, line-height 1.4): Noms de délégués, questions de coaching, éléments d'importance secondaire.
- **Body** (400–500, 13px, line-height 1.6): Texte courant, descriptions, comportements attendus.
- **Label** (600, 11px, letter-spacing 0.06em, MAJUSCULES): En-têtes de colonnes, labels de formulaire, sections de navigation. Maximum 4 mots. Jamais en majuscules pour du texte de plus de 4 mots.
- **Caption** (400–500, 10–11px, line-height 1.5): Hints, notes, texte tertiaire. Minimum #888 pour rester lisible.

**La Règle de la Famille Unique.** Une seule famille, quatre poids. Toute introduction d'une seconde famille doit être justifiée par un besoin fonctionnel démontrable, pas par une préférence esthétique.

## 4. Elevation

Ce système est plat par défaut. La profondeur est exprimée par la couleur de fond, pas par les ombres. Trois niveaux de surface (#141414 → #1C1C1C → #242424) créent une hiérarchie visuelle sans aucune `box-shadow`.

**Pas d'ombres portées.** Aucun `box-shadow` sur les cartes, les boutons, ou les inputs. Le seul relief est tonal : une surface plus claire est plus proche de l'utilisateur. Cette contrainte est cohérente avec le registre "cockpit" : les instruments de bord n'ont pas d'ombre, ils ont de la clarté.

### Named Rules
**La Règle du Relief Tonal.** Surface au-dessus = plus claire. bg (#141414) < surface (#1C1C1C) < input (#242424) < overlay (#2A2A2A). Jamais inverser cette hiérarchie. Jamais ajouter une `box-shadow` là où un changement de `background` suffit.

## 5. Components

### Buttons

- **Shape:** Légèrement arrondi (10px radius). Pas de pill sur les boutons d'action primaires ; pill réservé aux badges et chips.
- **Primary:** Fond indigo #6366F1, texte blanc, padding 14px vertical. État loading : même layout, texte "Enregistrement…", non-interactif.
- **Hover:** `background: #5558E8` (indigo légèrement plus sombre). Transition `background 0.15s`.
- **Disabled:** `background: rgba(99,102,241,0.25)`, texte `rgba(255,255,255,0.3)`, `cursor: not-allowed`.
- **Ghost / Secondary:** `background: rgba(99,102,241,0.2)`, bordure `rgba(99,102,241,0.3)`, texte #818CF8. Pour les actions de confirmation secondaires (Terminer, Question suivante).

### Cards / Containers

- **Corner Style:** Gently rounded (10px standard, 12px pour les blocs de formulaire).
- **Background:** #1C1C1C avec bordure `1px solid rgba(255,255,255,0.07)`.
- **Shadow Strategy:** Aucune. Voir Elevation.
- **Internal Padding:** 16px standard, 20px pour les blocs à contenu dense.
- **Règle des cartes imbriquées :** Interdit. Une carte ne peut pas contenir une autre carte. Les items de liste intérieurs utilisent #242424 (surface-raised) sans border-radius de carte.

### Inputs / Fields

- **Style:** Fond #242424, bordure `1px solid rgba(255,255,255,0.08)`, radius 8px, padding 8px 10px.
- **Focus:** `outline: 2px solid #6366F1; outline-offset: 2px` via `:focus-visible`. Jamais supprimer outline sans remplaçant.
- **Placeholder:** Couleur #888 minimum. Jamais #555 ou moins (contraste insuffisant).
- **Labels:** Toujours avec `htmlFor` + `id` correspondant. Style : 11px, 600, uppercase, letter-spacing 0.06em, couleur #888.

### Navigation

**Desktop (sidebar 220px):**
- Fond #141414, bordure droite `rgba(255,255,255,0.07)`.
- Item actif : `background: rgba(99,102,241,0.15)`, texte #818CF8, indicateur gauche `2px solid #6366F1`.
- Item inactif : texte #888, hover `rgba(255,255,255,0.05)`.
- Deux sections : Principal et Coaching E&C. Labels de section en uppercase 10px #444.

**Mobile (bottom bar fixe) :**
- Fond #1C1C1C, bordure top `rgba(255,255,255,0.09)`.
- 5 onglets : icône (22px) + label (10px). Actif : couleur accent-ink #818CF8, weight 600.
- `padding-bottom: env(safe-area-inset-bottom)` pour iPhone notch.
- `min-height: 44px` sur chaque onglet.

### Score Badge (composant signature E&C)

Badge de cotation 1/2/3 avec couleur sémantique :
- **1 En cours** : fond `#f85149 + 18% opacité`, bordure `#f85149 + 44% opacité`, texte #f85149.
- **2 Acquis** : même pattern avec #f0883e.
- **3 Expert** : même pattern avec #3fb950.
- **Non coté** : fond transparent, texte #555, affiche `?`.
- Shape : pill (border-radius 20px) pour les badges inline, bouton carré arrondi (10px) pour la saisie.

### Boutons de Cotation (saisie DUO)

Trois boutons 1/2/3 en flex row, chacun `flex: 1`. Hauteur min 60px pour touch target.
- Non sélectionné : bordure `rgba(255,255,255,0.08)`, hover bordure `levelColor + 55% opacité`.
- Sélectionné : fond `levelColor + 18% opacité`, bordure `levelColor` plein.
- Transition : `border-color 0.15s, background 0.15s, color 0.15s`. Jamais `transition: all`.

## 6. Do's and Don'ts

### Do:
- **Do** utiliser #888 minimum pour tout texte secondaire sur fond sombre. #666 et en dessous échouent WCAG AA.
- **Do** réserver l'indigo (#6366F1 / #818CF8) aux actions et états actifs exclusivement, jamais pour la décoration.
- **Do** associer `htmlFor` + `id` à chaque paire label/input dans les formulaires.
- **Do** utiliser `touch-action: manipulation` sur tous les éléments interactifs pour supprimer le délai 300ms.
- **Do** cibler les propriétés de transition explicitement : `border-color 0.15s, background 0.15s`. Jamais `transition: all`.
- **Do** utiliser des inline styles pour les couleurs et opacités dynamiques : Tailwind v4 opacity modifiers (`bg-blue-500/8`) sont instables dans ce projet.
- **Do** respecter `env(safe-area-inset-bottom)` sur la nav mobile pour l'encoche iPhone.
- **Do** maintenir la terminologie figée : DUO, E&C, Interpeller, Débattre, Engager. Jamais renommer.

### Don't:
- **Don't** utiliser glassmorphism, dégradés de texte (`background-clip: text`), ou effets décoratifs. Ce n'est pas une app grand public.
- **Don't** utiliser une palette claire ou blanche. Le fond anthracite est structurel, pas optionnel.
- **Don't** utiliser les couleurs E&C (#38BDF8 / #4ADE80 / #FB923C) pour quoi que ce soit d'autre que leurs axes respectifs.
- **Don't** utiliser les couleurs de niveau (#f85149 / #f0883e / #3fb950) comme couleurs d'interface génériques.
- **Don't** imbriquer des cartes. Une surface #1C1C1C ne contient pas une autre surface #1C1C1C avec bordure.
- **Don't** ajouter `box-shadow` sur les cartes ou les boutons. Le relief est tonal.
- **Don't** utiliser des emojis comme éléments d'interface. SVG icons (Lucide) uniquement.
- **Don't** reproduire les dashboards colorés type Duolingo, Notion, ou Linear : trop grand public, mauvais registre pour un RSM pharma.
- **Don't** utiliser des border-radius > 12px sur les cartes. 20px est réservé aux pills/badges.
- **Don't** descendre sous 13px pour le texte de contenu. 11px est le plancher absolu pour les labels uppercase.
