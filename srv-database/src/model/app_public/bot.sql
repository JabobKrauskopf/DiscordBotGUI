CREATE TABLE app_public.bot (
  id bigserial NOT NULL,
  token text NULL,
  "name" varchar NOT NULL,
  CONSTRAINT bot_pk PRIMARY KEY (id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE app_public.bot TO visitor;

INSERT INTO app_public.bot ("name") VALUES('Discord Bot');
