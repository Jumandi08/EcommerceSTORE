'use client';

import { useEffect, useState } from "react";

// Types
export type ReviewType = {
  id: number;
  rating: number;
  comment: string;
  helpful: number;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
};

export type ReviewStats = {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
};

export type ReviewsResponse = {
  data: ReviewType[];
  meta: ReviewStats;
};

// Hook para obtener reviews de un producto
export function useGetProductReviews(productId: number | null) {
  const [result, setResult] = useState<ReviewsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews/product/${productId}`;
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const json = await res.json();
        setResult(json);
        setLoading(false);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Error fetching reviews';
        setError(errorMessage);
        setLoading(false);
        setResult(null);
      }
    })();
  }, [productId]);

  return { result, loading, error };
}

// Función para crear una review
export async function createReview(
  productId: number,
  rating: number,
  comment: string,
  token: string
): Promise<{ success: boolean; data?: ReviewType; error?: string }> {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        data: {
          rating,
          comment,
          product: productId
        }
      })
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error?.message || 'Error creating review');
    }

    const json = await res.json();
    return { success: true, data: json.data };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error creating review';
    return { success: false, error: errorMessage };
  }
}

// Función para actualizar una review
export async function updateReview(
  reviewId: number,
  rating: number,
  comment: string,
  token: string
): Promise<{ success: boolean; data?: ReviewType; error?: string }> {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews/${reviewId}`;

    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        data: {
          rating,
          comment
        }
      })
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error?.message || 'Error updating review');
    }

    const json = await res.json();
    return { success: true, data: json.data };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error updating review';
    return { success: false, error: errorMessage };
  }
}

// Función para eliminar una review
export async function deleteReview(
  reviewId: number,
  token: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews/${reviewId}`;

    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error?.message || 'Error deleting review');
    }

    return { success: true };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error deleting review';
    return { success: false, error: errorMessage };
  }
}

// Función para marcar review como útil
export async function markReviewHelpful(
  reviewId: number
): Promise<{ success: boolean; data?: ReviewType; error?: string }> {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews/${reviewId}/helpful`;

    const res = await fetch(url, {
      method: 'POST'
    });

    if (!res.ok) {
      throw new Error('Error marking review as helpful');
    }

    const json = await res.json();
    return { success: true, data: json.data };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error marking review';
    return { success: false, error: errorMessage };
  }
}
