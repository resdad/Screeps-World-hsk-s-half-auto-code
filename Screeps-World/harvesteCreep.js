module.exports = function harvestCreep(creep) {
    var cpuStart = Game.cpu.getUsed();
    var sources = creep.pos.findClosestByPath(FIND_SOURCES);
    if (sources.energy > 0) {
        if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources);
        }
        else {
            var link = creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: (structure) => { return (structure.structureType == STRUCTURE_LINK) && (structure.cooldown == 0) } });
            creep.transfer(link, RESOURCE_ENERGY);
        }
    }
    var cpuEnd = Game.cpu.getUsed();
    //console.log(creep + "本次消耗：" + (cpuEnd - cpuStart).toFixed(2));
}