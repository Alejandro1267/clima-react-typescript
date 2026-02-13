export const formatTemperture = (temperture: number) => {
  return parseInt((temperture - 273.15).toString());
}