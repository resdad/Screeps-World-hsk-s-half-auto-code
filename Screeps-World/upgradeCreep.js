module.exports = function upgradeCreep(creep) {
    // if (creep.pos.isEqualTo(44, 11,"E25N19") || creep.pos.isEqualTo(44, 10,"E25N19") ) {
    //     creep.move(TOP);
    // }
    // else {
    //     if (creep.pos.isNearTo(creep.room.storage)) {
    //         creep.withdraw(Game.rooms['E26N19'].storage, RESOURCE_ENERGY);
    //         console.log(creep.upgradeController(Game.rooms['E26N19'].controller));
    //     }
    //     else {
    //         creep.moveTo(Game.rooms['E26N19'].storage);
    //     }
    // }
    var cpuStart = Game.cpu.getUsed();
    if (creep.store.getFreeCapacity() == creep.store.getCapacity()) {
        if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.storage);
        }
    }
    else {
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
    }
    var cpuEnd = Game.cpu.getUsed();
    //console.log(creep + "本次消耗：" + (cpuEnd - cpuStart).toFixed(2));
}