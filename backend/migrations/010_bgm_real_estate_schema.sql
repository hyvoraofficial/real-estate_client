-- ============================================================
-- 010_bgm_real_estate_schema.sql
-- BGM Real Estate High-Value Asset Management Schema
-- ============================================================

-- 1. Ensure properties table supports all high-value asset fields
ALTER TABLE properties ADD COLUMN IF NOT EXISTS slug VARCHAR(255);
ALTER TABLE properties ADD COLUMN IF NOT EXISTS category VARCHAR(50) DEFAULT 'buildings';
ALTER TABLE properties ADD COLUMN IF NOT EXISTS property_type VARCHAR(100);
ALTER TABLE properties ADD COLUMN IF NOT EXISTS price_display VARCHAR(100);
ALTER TABLE properties ADD COLUMN IF NOT EXISTS price_type VARCHAR(50) DEFAULT 'fixed';
ALTER TABLE properties ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS city VARCHAR(100);
ALTER TABLE properties ADD COLUMN IF NOT EXISTS state VARCHAR(100);
ALTER TABLE properties ADD COLUMN IF NOT EXISTS pincode VARCHAR(20);
ALTER TABLE properties ADD COLUMN IF NOT EXISTS plot_area VARCHAR(100);
ALTER TABLE properties ADD COLUMN IF NOT EXISTS built_up_area VARCHAR(100);
ALTER TABLE properties ADD COLUMN IF NOT EXISTS carpet_area VARCHAR(100);
ALTER TABLE properties ADD COLUMN IF NOT EXISTS road_width VARCHAR(50);
ALTER TABLE properties ADD COLUMN IF NOT EXISTS facing VARCHAR(50);
ALTER TABLE properties ADD COLUMN IF NOT EXISTS property_age VARCHAR(50);
ALTER TABLE properties ADD COLUMN IF NOT EXISTS category_details JSONB DEFAULT '{}'::jsonb;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS amenities JSONB DEFAULT '[]'::jsonb;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS documents JSONB DEFAULT '[]'::jsonb;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS seo_title VARCHAR(255);
ALTER TABLE properties ADD COLUMN IF NOT EXISTS seo_description TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS map_lat NUMERIC(10, 8);
ALTER TABLE properties ADD COLUMN IF NOT EXISTS map_lng NUMERIC(11, 8);

-- Make project_id optional for independent assets like land or standalone buildings
ALTER TABLE properties ALTER COLUMN project_id DROP NOT NULL;

-- 2. Enquiries / Leads Table
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(25) NOT NULL,
  email VARCHAR(255),
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  property_title VARCHAR(255),
  message TEXT,
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'interested', 'follow_up', 'closed')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Website CMS & Settings Table
CREATE TABLE IF NOT EXISTS website_settings (
  id VARCHAR(50) PRIMARY KEY DEFAULT 'global_settings',
  company_name VARCHAR(255) DEFAULT 'BGM Real Estate',
  logo_url VARCHAR(500) DEFAULT '/logo.png',
  phone VARCHAR(50) DEFAULT '+91 98765 43210',
  whatsapp VARCHAR(50) DEFAULT '+91 98765 43210',
  email VARCHAR(255) DEFAULT 'contact@bgmrealestate.com',
  address TEXT DEFAULT 'BGM Real Estate Hub, Bangalore / Hubballi, Karnataka',
  google_maps_url TEXT,
  business_hours VARCHAR(255) DEFAULT 'Mon - Sat: 9:00 AM - 7:00 PM',
  hero_headline VARCHAR(255) DEFAULT 'Exceptional Real Estate. Extraordinary Opportunities.',
  hero_subheading TEXT DEFAULT 'Discover premium buildings, commercial properties, sites and land opportunities curated by BGM Real Estate.',
  hero_image_url VARCHAR(500),
  about_content TEXT,
  mission TEXT,
  vision TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default website settings if not present
INSERT INTO website_settings (id, company_name, phone, email, address)
VALUES ('global_settings', 'BGM Real Estate', '+91 98765 43210', 'contact@bgmrealestate.com', 'BGM Real Estate Corporate Office, Bangalore / Hubballi, Karnataka')
ON CONFLICT (id) DO NOTHING;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_properties_slug ON properties(slug);
CREATE INDEX IF NOT EXISTS idx_properties_category ON properties(category);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(featured);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at);
