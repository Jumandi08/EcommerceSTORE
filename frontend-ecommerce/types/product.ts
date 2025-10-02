// Strapi 5 API Response Type
export type StrapiProductType = {
  id: number;
  documentId: string;
  productName: string;
  slug: string;
  description: string;
  active: boolean;
  isFeatured: boolean;
  taste: string;
  origin: string;
  price: number;
  stock: number;
  images: {
    id: number;
    url: string;
  }[];
  category?: {
    id: number;
    slug: string;
    categoryName: string;
  };
}

// Legacy Strapi 4 Format (for internal use)
export type ProductType = {
    id: number;
    attributes: {
        productName: string;
        slug: string;
        description: string;
        active: boolean;
        isFeatured: boolean;
        taste: string;
        origin: string;
        price: number;
        stock: number;
        images: {
            data: {
                id: number;
                attributes: {
                    url: string;
                };
            }[];
        };
        category: {
            data: {
                attributes: {
                    slug: string;
                    categoryName: string;
                };
            };
        };
    };
};

// Transformer function from Strapi 5 to internal format
export function transformStrapiProduct(strapiProduct: StrapiProductType): ProductType {
  return {
    id: strapiProduct.id,
    attributes: {
      productName: strapiProduct.productName,
      slug: strapiProduct.slug,
      description: strapiProduct.description,
      active: strapiProduct.active,
      isFeatured: strapiProduct.isFeatured,
      taste: strapiProduct.taste,
      origin: strapiProduct.origin,
      price: strapiProduct.price,
      stock: strapiProduct.stock || 0,
      images: {
        data: strapiProduct.images.map(img => ({
          id: img.id,
          attributes: {
            url: img.url
          }
        }))
      },
      category: {
        data: {
          attributes: {
            slug: strapiProduct.category?.slug || '',
            categoryName: strapiProduct.category?.categoryName || ''
          }
        }
      }
    }
  };
}