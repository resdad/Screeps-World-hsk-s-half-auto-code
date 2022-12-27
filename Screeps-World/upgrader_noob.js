module.exports = function upgrader_noob(creep) {
    var cpuStart = Game.cpu.getUsed();
    //console.log("a");
    if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {  // 升级状态&&能量不足的时候，变为采集者
        creep.memory.upgrading = false;
    }
    if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {  // 非升级状态&&能量满的时候，变为升级状态
        creep.memory.upgrading = true;
    }
    if (creep.memory.upgrading) { // 升级状态，找到控制器并升级 + 可视化
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
    }
    else {  // 采集状态 + 可视化
        var sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        }
    }
    var cpuEnd = Game.cpu.getUsed();
    console.log(creep + "本次消耗：" + (cpuEnd - cpuStart).toFixed(2));
}