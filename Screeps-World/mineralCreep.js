module.exports = function mineralCreep(creep) {
    if (creep.store.getFreeCapacity() == creep.store.getCapacity()) {
        var mineral = creep.room.find(FIND_MINERALS);
        if (creep.harvest(mineral[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(mineral[0]);
        }
    }
    else {
        var container = creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_CONTAINER } });
        for (var s in creep.store) {
            if (creep.transfer(container, s) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
            }
        }
    }
}
