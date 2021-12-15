const Pets = require("../models/pets");
const Max = require("../models/maximums");
const controller = {};

controller.creamascota = async (req, res) => {

  // este endpoint crea una nueva mascota e incrementa 
  // la cantidad de esa especie en la coleccion maximums.

  const spe = req.body.data.species;

  try {
    const countMax = await Max.count();
    const maximums = await Max.find();

    let max = 0;
    if (countMax > 0) {
      let sp = maximums.find((x) => x.specie === spe);
      let totSpecie = sp != null ? sp.length : 0;

      if (totSpecie == 0) {
        max = new Max({
          specie: spe,
          quantity: 1,
        });
        await max.save();
      } else {
        let quanAct = sp.quantity;
        const sum = {
          quantity: quanAct + 1,
        };
        let a = await Max.findOneAndUpdate({ specie: spe }, sum);
      }
    } else {
      max = new Max({
        specie: req.body.data.species,
        quantity: 1,
      });
      await max.save();
    }

    const pet = new Pets({
      name: req.body.data.name,
      species: req.body.data.species,
      gender: req.body.data.gender,
      age: req.body.data.age,
      dateBirth: req.body.data.dateBirth,
    });

    const newPet = await pet.save();
    res.json(newPet);
  } catch (error) {
    res.status(500).send("the pet was not added");
  }
};

controller.lismascotas = async (req, res) => {

  // este endpoint devulve el listado de mascotas

  try {
    const pets = await Pets.find();
    res.json(pets);
  } catch (error) {
    res.status(500).send("the pets are not found");
  }
};

controller.calcAverDev = async (req, res) => {

  // este endpoint recibe como parametro la especie para luego
  // poder listar y filtrar por ese mismo, para asi calcular el promedio 
  // y la desviacion estandar

  try {
    const specie = req.params.specie;
    const pets = await Pets.find();
    // const total = pets.length;  total de todos los registros de la coleccion pets

    //######################   AVERAGE  ######################
    let array = [];
    let type = pets.filter((x) => x.species === specie); //traigo esa especie
    let totalSpecie = type.length; // total de esa especie
    type.map((x) => array.push(x.age)); // meto las edades en un array
    let sumAgesSpecie = array.reduce((a, b) => a + b, 0); // sumo las edades del array
    let average = sumAgesSpecie / totalSpecie; // saco promedio de esa especie

    //######################  STANDARD DEVIATION  ######################

    //calculo la desviaciones del dato respecto al promedio y elevo al cuadrado
    let dataDev = type.map((elem) => {
      return Math.pow(elem.age - average, 2);
    });
    //calculo la varianza, el promedio de estos valores
    let varianza = dataDev.reduce((a, b) => a + b) / totalSpecie;
    //la desviacion estandar es la raiz cuadrada de la varianza
    //(.toFixed(3) cantidad de decimales)
    let stdDeviation = Math.sqrt(varianza).toFixed(3);

    res.json({ totalSpecie, average, stdDeviation });
  } catch (error) {
    res.status(500).send("the calc is not found");
  }
};

controller.kpidemascotas = async (req, res) => {
  try {

    // este endpoint devuelve la coleccion maximums con las maximas cantidades de cada especie 
    // para luego mostra los valores en una tabla.
    
    // const pets = await Pets.find();
    // const NewArrayQSpecies = pets.reduce((acc, I) => {
    //   acc[I.species] = ++acc[I.species] || 1;
    //   return acc;
    // }, {});
    // res.json(NewArrayQSpecies);

    let arrayTot = [];
    const quant = await Max.find();
    quant.map((x) => arrayTot.push(x.quantity)); 
    let sumTotSpeci = arrayTot.reduce((a, b) => a + b, 0); 

    res.json({ quant,sumTotSpeci });
  } catch (error) {
    res.status(500).send("the pets are not found");
  }
};

module.exports = controller;
