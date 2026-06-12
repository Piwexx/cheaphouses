-- Renombrar columnas country→state, country_short→state_short
ALTER TABLE public.listings RENAME COLUMN country TO state;
ALTER TABLE public.listings RENAME COLUMN country_short TO state_short;

-- Eliminar flag (valor constante '🇺🇸', sin uso en la UI)
ALTER TABLE public.listings DROP COLUMN flag;

-- Agregar link (nullable — el seed no tiene URLs reales todavía)
ALTER TABLE public.listings ADD COLUMN link text;

-- Crear bucket público para imágenes de listings
INSERT INTO storage.buckets (id, name, public)
VALUES ('listing-images', 'listing-images', true)
ON CONFLICT (id) DO NOTHING;

-- RLS: lectura pública de imágenes
CREATE POLICY "listing_images_public_read"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'listing-images');
