module.exports = function builder_noob(creep) {
    if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) { // building && 背包为空
        creep.memory.building = false;  // 变为 非building状态
        creep.say('🔄 harvest');
    }
    if (!creep.memory.building && creep.store.getFreeCapacity() == 0) { // 非building状态 && 背包满(空余为0)
        creep.memory.building = true;  // 变为 building状态
        creep.say('🚧 build');
    }

    if (creep.memory.building) {  // building状态的时候
        var targets = Game.rooms['E29N16'].find(FIND_CONSTRUCTION_SITES); // 寻找建筑位
        if (targets.length) {  // targets.length > 0  || 建筑位 > 0
            if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } }); // 绘制路径
            }
        }
    }
    else {  // 非building状态的时候， 到source旁边并采集
        var sources = Game.rooms['E29N16'].find(FIND_SOURCES);
        if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[1], { visualizePathStyle: { stroke: '#ffaa00' } });
        }
    }
}