CREATE TABLE app_public.logging (
  id bigserial NOT NULL,
  type text NULL,
  "text" varchar NOT NULL,
  CONSTRAINT logging_pk PRIMARY KEY (id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE app_public.logging TO visitor;
