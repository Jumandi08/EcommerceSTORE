"use client"
import { useState, useEffect } from "react";
import { Star, ThumbsUp, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGetProductReviews, createReview, markReviewHelpful } from "@/api/reviews";
import { useAuth } from "@/hooks/use-auth";

interface Review {
  id: number;
  rating: number;
  comment: string;
  helpful: number;
  verified: boolean;
  createdAt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

interface ProductReviewsProps {
  productId: number;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  // Obtener reseñas del backend
  const { result: reviewsData, loading: loadingReviews } = useGetProductReviews(productId);
  const { user } = useAuth();

  const [reviews, setReviews] = useState<Review[]>([]);

  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
  });

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Actualizar reseñas cuando llegan del backend
  useEffect(() => {
    if (reviewsData?.data) {
      setReviews(reviewsData.data);
    }
  }, [reviewsData]);

  // Obtener estadísticas de reseñas
  const totalReviews = reviewsData?.meta?.totalReviews || 0;
  const averageRating = reviewsData?.meta?.averageRating || 0;
  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviewsData?.meta?.ratingDistribution?.[stars as keyof typeof reviewsData.meta.ratingDistribution] || 0,
    percentage: totalReviews > 0
      ? ((reviewsData?.meta?.ratingDistribution?.[stars as keyof typeof reviewsData.meta.ratingDistribution] || 0) / totalReviews) * 100
      : 0,
  }));

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!user || !user.jwt) {
      setSubmitError("Debes iniciar sesión para dejar una reseña");
      return;
    }

    if (newReview.comment.trim().length < 10) {
      setSubmitError("El comentario debe tener al menos 10 caracteres");
      return;
    }

    setSubmitting(true);

    try {
      const result = await createReview(productId, newReview.rating, newReview.comment, user.jwt);

      if (result.success && result.data) {
        // Agregar la nueva reseña a la lista
        setReviews([result.data, ...reviews]);
        setNewReview({ rating: 5, comment: "" });
        setShowReviewForm(false);
      } else {
        setSubmitError(result.error || "Error al crear la reseña");
      }
    } catch (error) {
      setSubmitError("Error al enviar la reseña. Por favor intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleMarkHelpful = async (reviewId: number) => {
    const result = await markReviewHelpful(reviewId);
    if (result.success && result.data) {
      // Actualizar el contador de helpful en la lista
      setReviews(reviews.map(r => r.id === reviewId ? result.data! : r));
    }
  };

  if (loadingReviews) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Cargando reseñas...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header de Reseñas */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Reseñas de Clientes
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {totalReviews} {totalReviews === 1 ? 'reseña' : 'reseñas'}
          {totalReviews > 0 && reviews.filter(r => r.verified).length > 0 &&
            ` (${reviews.filter(r => r.verified).length} verificadas)`
          }
        </p>
      </div>

      {/* Resumen de Rating */}
      <div className="grid md:grid-cols-2 gap-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
        {/* Rating Promedio */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
            {averageRating.toFixed(1)}
          </div>
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 ${
                  i < Math.round(averageRating)
                    ? "fill-yellow-400 stroke-yellow-400"
                    : "stroke-gray-300 dark:stroke-gray-600"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Basado en {reviews.length} reseñas
          </p>
        </div>

        {/* Distribución de Estrellas */}
        <div className="space-y-2">
          {ratingDistribution.map(({ stars, count, percentage }) => (
            <div key={stars} className="flex items-center gap-3">
              <div className="flex items-center gap-1 min-w-[80px]">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {stars}
                </span>
                <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
              </div>
              <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[40px] text-right">
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Botón para agregar reseña */}
      {!showReviewForm && (
        <div>
          <Button
            onClick={() => {
              if (!user) {
                setSubmitError("Debes iniciar sesión para escribir una reseña");
                return;
              }
              setShowReviewForm(true);
            }}
            variant="outline"
            className="w-full md:w-auto"
          >
            Escribir una reseña
          </Button>
          {submitError && !showReviewForm && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{submitError}</p>
          )}
        </div>
      )}

      {/* Formulario de Nueva Reseña */}
      {showReviewForm && (
        <form
          onSubmit={handleSubmitReview}
          className="p-6 border-2 border-rose-200 dark:border-rose-800 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 space-y-4"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Escribe tu reseña
          </h3>

          {/* Selector de Rating */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Calificación
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= newReview.rating
                        ? "fill-yellow-400 stroke-yellow-400"
                        : "stroke-gray-300 dark:stroke-gray-600"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comentario */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Tu opinión
            </label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              placeholder="Cuéntanos sobre tu experiencia con este producto..."
              className="w-full min-h-[120px] p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
              required
            />
          </div>

          {submitError && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200 text-sm">
              {submitError}
            </div>
          )}

          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={submitting}
              className="bg-rose-600 hover:bg-rose-700 disabled:opacity-50"
            >
              {submitting ? "Publicando..." : "Publicar Reseña"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowReviewForm(false);
                setSubmitError("");
              }}
              disabled={submitting}
            >
              Cancelar
            </Button>
          </div>
        </form>
      )}

      <Separator />

      {/* Lista de Reseñas */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Aún no hay reseñas para este producto
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              ¡Sé el primero en compartir tu opinión!
            </p>
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              {/* Header de la reseña */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                    <User className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {review.user?.username || "Usuario"}
                      </p>
                      {review.verified && (
                        <span className="px-2 py-0.5 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                          ✓ Verificado
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(review.createdAt).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "fill-yellow-400 stroke-yellow-400"
                          : "stroke-gray-300 dark:stroke-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Comentario */}
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {review.comment}
              </p>

              {/* Botón de útil */}
              <button
                onClick={() => handleMarkHelpful(review.id)}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>Útil ({review.helpful})</span>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
