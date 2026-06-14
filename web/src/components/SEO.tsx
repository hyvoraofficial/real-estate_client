import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  schema?: Record<string, any>;
  url?: string;
}

export const SEO: React.FC<SEOProps> = ({ 
  title = "SK Buildings | Flats, Shops & Rental Properties in Bangalore", 
  description = "SK Buildings offers residential flats, commercial shops, rental properties and joint development projects in Bangalore and Whitefield.",
  schema,
  url = "https://skbuildings.in"
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <link rel="canonical" href={url} />
      
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};
