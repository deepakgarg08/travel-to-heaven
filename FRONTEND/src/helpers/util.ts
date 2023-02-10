import { Hotel } from "../store/hotelSlice";

export const sort = function (data: Hotel[], key: string) {
  // items.sort((a, b) => a.value - b.value);
  if (key === "distanceToCenterKm" || key === "minPrice") {
    data.sort((a, b) => {
      return b[key] - a[key];
    });
  }
};

export const filerByPrice = function (data: Hotel[], minimumPrice: number, maxPrice: number) {
  const result: Hotel[] = data.filter((hotel) => {
    const price = hotel.minPrice;
    return price >= minimumPrice && price <= maxPrice;
  });

  return result;
};
export const filterByDistance = function (data: Hotel[], maxDistance: number) {
  const result: Hotel[] = data.filter((hotel) => {
    const distance = hotel.distanceToCenterKm;
    return distance <= maxDistance;
  });

  return result;
};
