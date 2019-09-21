const Bmi = (weight, height) => {
  let heightft = Math.floor(height);
  let heightinch = height - Math.floor(height);

  let heightmeter = heightft * 0.3048 + heightinch * 0.0254 * 10;

  let bmi = weight / (heightmeter * heightmeter);

  return bmi.toFixed(1);
};

export default Bmi;
