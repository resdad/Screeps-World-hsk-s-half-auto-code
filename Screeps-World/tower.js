module.exports = function tower_operate(structure) {
    var cpuStart = Game.cpu.getUsed();
    var totalTarget = [];
    if (Game.time % 10 == 0) {
        var structures = structure.room.find(FIND_STRUCTURES);
        var Creeps = structure.room.find(FIND_CREEPS);
        for (var i = 0; i < structures.length; i++) {
            if (structures[i].structureType == STRUCTURE_ROAD || structures[i].structureType == STRUCTURE_CONTAINER || structures[i].structureType == STRUCTURE_RAMPART) {
                totalTarget.push(structures[i].id);
            }
        }
        for (var i = 0; i < Creeps.length; i++) {
            totalTarget.push(Creeps[i].id);
        }
        totalTarget.sort();
        for (var i = 0; i < totalTarget.length + 1; i++) {
            Memory.targetTower = totalTarget;
        }
    }
    if (Memory.targetTower.length) {
        for (var i = 0; i < Memory.targetTower.length; i++) {
            var tempObject = Game.getObjectById(Memory.targetTower[i]);
            if (tempObject instanceof Creep) {
                if (!tempObject.my && structure.attack(tempObject) == OK) {
                    //console.log(tempObject);
                    structure.attack(tempObject);
                }
            }
            else if (tempObject instanceof Structure) {
                if (tempObject.structureType == STRUCTURE_ROAD || tempObject.structureType == STRUCTURE_CONTAINER) {
                    if (tempObject.hits / tempObject.hitsMax < 0.5) {
                        structure.repair(tempObject);
                    }
                }
                else if (tempObject.structureType == STRUCTURE_RAMPART && tempObject.hits < 35000) {
                    structure.repair(tempObject);
                }
            }

        }
    }
    var cpuEnd = Game.cpu.getUsed();
    console.log((cpuEnd - cpuStart).toFixed(1) + structure);
}
