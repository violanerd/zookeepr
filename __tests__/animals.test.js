const fs = require('fs');
const { filterByQuery, findById, createNewAnimal, validateAnimal} = require("../lib/animals.js");
const { animals } = require("../data/animals");

jest.mock('fs');

test('creates an animal object', () => {
    const animal = createNewAnimal({name: "Test", id: "testing"}, animals);
    
    expect(animal.name).toBe('Test');
    expect(animal.id).toBe('testing');
});

test('validates animal', () => {
    const animal = {name: 'Harry', species: 'cat', diet: 'treats', personalityTraits: ['zany']};
    const invalidAnimal = {name: 'Harry', species: 'cat', diet: 'treats'};
    expect(validateAnimal(animal)).toBeTruthy();
    expect(validateAnimal(invalidAnimal)).toBeFalsy();
})

test('finds animal by id', () => {
    const startingAnimals = [
        {
          id: "3",
          name: "Erica",
          species: "gorilla",
          diet: "omnivore",
          personalityTraits: ["quirky", "rash"],
        },
        {
          id: "4",
          name: "Noel",
          species: "bear",
          diet: "carnivore",
          personalityTraits: ["impish", "sassy", "brave"],
        },
      ];
    
    
    const test = (findById('3', startingAnimals));
    const result = {
            id: "3",
            name: "Erica",
            species: "gorilla",
            diet: "omnivore",
            personalityTraits: ["quirky", "rash"],
          }

    expect(test).toEqual(result);
})

test('filters by query', () => {
    const startingAnimals = [
        {
          id: "3",
          name: "Erica",
          species: "gorilla",
          diet: "omnivore",
          personalityTraits: ["quirky", "rash"],
        },
        {
          id: "4",
          name: "Noel",
          species: "bear",
          diet: "carnivore",
          personalityTraits: ["impish", "sassy", "brave"],
        },
      ];
    
      const updatedAnimals = filterByQuery({ species: "gorilla" }, startingAnimals);
    
      expect(updatedAnimals.length).toEqual(1);
});
