module.exports = function mineralCarryCreep(creep) {
    if (creep.store.getCapacity() == creep.store.getFreeCapacity()) {
        var container = creep.room.find(FIND_STRUCTURES, { filter: (structure) => { return (structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_KEANIUM] > 0; } });
        if (creep.withdraw(container[0], RESOURCE_KEANIUM) == ERR_NOT_IN_RANGE) {

            //console.log(container);
            creep.moveTo(container[0]);
        }
    }
    else {
        if (creep.transfer(creep.room.storage, RESOURCE_KEANIUM) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.storage);
        }
    }
}