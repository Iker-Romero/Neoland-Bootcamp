// 2.3 En base al ejercicio anterior. Crea dinamicamente un elemento  por cada petición a la api que diga...'El nombre X tiene un Y porciento de ser de Z' etc etc. EJ: El nombre Pepe tiene un 22 porciento de ser de ET y un 6 porciento de ser de MZ.

const getData = async (name) => {
  try {
    const rawData = await fetch(`https://api.nationalize.io?name=${name}`);
    const jsonData = await rawData.json();
    return jsonData;
  } catch (error) {
    console.log(error);
  }
};

const button = document.querySelector("button");

const input = document.querySelector("input");

button.addEventListener("click", async () => {
  try {
    console.log(input.value);
    const data = await getData(input.value);
    console.log(data);

    // 2.4 En base al ejercicio anterior, crea un botón con el texto 'X' para cada uno de los p que hayas insertado y que si el usuario hace click en este botón eliminemos el parrafo asociado.

    for (const country of data.country) {
      const div = document.createElement("div");
      const p = document.createElement("p");
      const text = document.createTextNode(
        `El nombre ${input.value} tiene un ${country.probability} porciento de ser ${country.country_id}.`
      );
      p.appendChild(text);
      const button = document.createElement("button");
      button.innerText = "X";
      div.appendChild(p);
      button.addEventListener("click", () => {
        div.remove();
      });
      div.appendChild(button);
      document.body.appendChild(div);
    }
  } catch (error) {
    console.log(error);
  }
});
