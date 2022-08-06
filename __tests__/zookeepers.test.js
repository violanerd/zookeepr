const fs = require('fs');
const { filterByQuery, findById, createNewZookeeper, validateZookeeper} = require("../lib/zookeepers.js");
const { zookeepers } = require("../data/zookeepers");

jest.mock('fs');

test("creates an zookeeper object", () => {
    const zookeeper = createNewZookeeper({ name: "Darlene", id: "jhgdja3ng2" }, zookeepers);
  
    expect(zookeeper.name).toBe("Darlene");
    expect(zookeeper.id).toBe("jhgdja3ng2");
  });

  test("filters by query", () => {
    const startingZookeepers = [
      {
        id: "2",
        name: "Raksha",
        age: 31,
        favoriteAnimal: "penguin",
      },
      {
        id: "3",
        name: "Isabella",
        age: 67,
        favoriteAnimal: "bear",
      },
    ];
  
    const updatedZookeepers = filterByQuery( { age: 31 }, startingZookeepers);
  
    expect(updatedZookeepers.length).toEqual(1);
  });
  test("finds by id", () => {
    const startingZookeepers = [
      {
        id: "2",
        name: "Raksha",
        age: 31,
        favoriteAnimal: "penguin",
      },
      {
        id: "3",
        name: "Isabella",
        age: 67,
        favoriteAnimal: "bear",
      },
    ];
  
    const result = findById("3", startingZookeepers);
  
    expect(result.name).toBe("Isabella");
  });

  test('validates zookeeper', () => {
    const zookeeper = {id: '1', name: 'Harry', age: 22, favoriteAnimal: 'cat'};
    const invalidzookeeper = {id: '1', name: 'Harry', favoriteAnimal: 'cat'};
    expect(validateZookeeper(zookeeper)).toBeTruthy();
    expect(validateZookeeper(invalidzookeeper)).toBeFalsy();
})