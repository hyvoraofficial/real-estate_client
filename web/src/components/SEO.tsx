import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  schema?: Record<string, any>;
  url?: string;
}

export const SEO: React.FC<SEOProps> = ({ 
  title = "HYVORA Property Management | Smart Real Estate Software", 
  description = "HYVORA Property Management is a modern property management platform for managing properties, apartments, tenants, maintenance, payments, complaints, documents, and real-estate operations.",
  schema,
  url = "https://hyvorademo.in"
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
