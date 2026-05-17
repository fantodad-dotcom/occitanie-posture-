-- supabase/migrations/001_initial_schema.sql

-- Délégués
CREATE TABLE delegues (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nom         text NOT NULL,
  secteur     text,
  actif       boolean DEFAULT true,
  manager_id  uuid NOT NULL,
  created_at  timestamptz DEFAULT now()
);

-- Cotations (une ligne = une double visite cotée)
CREATE TABLE cotations (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  delegue_id        uuid NOT NULL REFERENCES delegues(id),
  date_visite       date NOT NULL,
  interpeller       smallint CHECK (interpeller BETWEEN 1 AND 4),
  debattre          smallint CHECK (debattre BETWEEN 1 AND 4),
  engager           smallint CHECK (engager BETWEEN 1 AND 4),
  geste_prioritaire text,
  notes_debrief     text,
  created_at        timestamptz DEFAULT now()
);

-- Doubles visites (planification)
CREATE TABLE doubles_visites (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  delegue_id  uuid NOT NULL REFERENCES delegues(id),
  date_prevue date NOT NULL,
  statut      text DEFAULT 'planifiée' CHECK (statut IN ('planifiée', 'réalisée', 'annulée')),
  created_at  timestamptz DEFAULT now()
);

-- Tokens de partage lecture seule
CREATE TABLE share_tokens (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  manager_id  uuid NOT NULL,
  token       text UNIQUE NOT NULL DEFAULT gen_random_uuid()::text,
  actif       boolean DEFAULT true,
  created_at  timestamptz DEFAULT now()
);

-- RLS: chaque manager ne voit que ses données
ALTER TABLE delegues        ENABLE ROW LEVEL SECURITY;
ALTER TABLE cotations       ENABLE ROW LEVEL SECURITY;
ALTER TABLE doubles_visites ENABLE ROW LEVEL SECURITY;
ALTER TABLE share_tokens    ENABLE ROW LEVEL SECURITY;

CREATE POLICY "manager voit ses délégués"
  ON delegues FOR ALL USING (manager_id = auth.uid());

CREATE POLICY "manager voit ses cotations"
  ON cotations FOR ALL USING (
    delegue_id IN (SELECT id FROM delegues WHERE manager_id = auth.uid())
  );

CREATE POLICY "manager voit ses doubles visites"
  ON doubles_visites FOR ALL USING (
    delegue_id IN (SELECT id FROM delegues WHERE manager_id = auth.uid())
  );

CREATE POLICY "manager gère ses tokens"
  ON share_tokens FOR ALL USING (manager_id = auth.uid());

-- Lecture publique des tokens actifs (pour /share/[token])
CREATE POLICY "token actif lisible publiquement"
  ON share_tokens FOR SELECT USING (actif = true);
