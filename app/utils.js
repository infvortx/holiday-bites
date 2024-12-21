import {
  faBowlFood,
  faChampagneGlasses,
  faCookieBite,
  faSpoon,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";


export function getIcon(recipe) {
    switch (recipe) {
      case "main":
        return(faBowlFood);
      case "dessert":
        return(faCookieBite);
      case "soup":
        return(faSpoon);
      case "snack":
        return(faCookieBite);
        break;
      case "beverage":
        return(faChampagneGlasses);
    }

    return faUtensils;
}

export function imperialCalculation(grams) {
  const conversions = [
    // not 100% accurate because materials have different densities, the data is for dry flour-like ingredients
    { unit: "Pounds", value: grams / 453.59 },
    { unit: "Ounces", value: grams / 28.34 },
    { unit: "Tablespoons", value: grams / 14.79 },
    { unit: "Teaspoons", value: grams / 4.93 },
  ];

  const bestConversion =
    conversions.find((c) => c.value >= 1) || conversions[conversions.length - 1];

  const roundedValue = Math.round(bestConversion.value);

  return `${roundedValue} ${bestConversion.unit}`;
}

export function metricCalculation(grams) {
  const kg = grams / 1000;
  if (Number.isInteger(kg)) {
    return `${kg} kg`;
  }
  return `${grams} g`;
}
