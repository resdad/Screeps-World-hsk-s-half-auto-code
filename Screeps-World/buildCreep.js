module.exports = function buildCreep(creep) {
    if (creep.store.getFreeCapacity() == creep.store.getCapacity()) {
        if (creep.withdraw(Game.rooms['E25N19'].storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.rooms['E25N19'].storage);
        }
    }
    else {
        var Construction_Sites = Game.rooms['E25N19'].find(FIND_CONSTRUCTION_SITES);
        if (Construction_Sites.length > 0) {
            if (creep.build(Construction_Sites[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Construction_Sites[0]);
            }
        }
    }
}
