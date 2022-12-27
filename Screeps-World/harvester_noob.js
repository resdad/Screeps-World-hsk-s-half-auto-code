module.exports = function harvester_noob(creep) {
    var cpuStart = Game.cpu.getUsed();
    if (creep.store.getFreeCapacity() > 0) {
        var sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[1]);
        }
    }
    else {
        var s = Game.getObjectById('5bbcae619099fc012e638e76');
        var link = s.pos.findClosestByRange(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_LINK } });
        if (creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(link);
        }
    }
    var cpuEnd = Game.cpu.getUsed();
    console.log(creep + "本次消耗：" + (cpuEnd - cpuStart).toFixed(2));
}