// Strapi 5 API Response Type
export type StrapiCategoryType = {
  id: number;
  documentId: string;
  categoryName: string;
  slug: string;
  createdAt: string;
  mainImage?: {
    id: number;
    url: string;
  };
}

// Legacy format (kept for compatibility)
export type CategoryType = {
  id: number;
  documentId: string;
  categoryName: string;
  slug: string;
  createdAt: string;
  mainImage?: {
    url: string;
  };
}

// Transformer function from Strapi 5 to internal format
export function transformStrapiCategory(strapiCategory: StrapiCategoryType): CategoryType {
  return {
    id: strapiCategory.id,
    documentId: strapiCategory.documentId,
    categoryName: strapiCategory.categoryName,
    slug: strapiCategory.slug,
    createdAt: strapiCategory.createdAt,
    mainImage: strapiCategory.mainImage ? {
      url: strapiCategory.mainImage.url
    } : undefined
  };
} 