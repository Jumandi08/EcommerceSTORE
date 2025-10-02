export const formatPrice = (price: number) => {
    const priceFormatted = new Intl.NumberFormat('es-EC', {
        style: 'currency',
        currency: 'USD'
    });
    return priceFormatted.format(price);
}; 