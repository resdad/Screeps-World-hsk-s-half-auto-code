/**
 * 任务对象格式： {target: ,resourceType: ,weight: ,from:, amount:}
 * 权重顺序： 1 < 2 < 3 
 */

function findRepeativeTask(t_task) {
    //console.log(JSON.stringify(t_task));
    //console.log(JSON.stringify(Memory.carrierTask));
    if (Memory.carrierTask.length) {
        let tempObject = _.filter(Memory.carrierTask, function (a) { return (a.from == t_task.from) && (a.target == t_task.target) && (a.resourceType == t_task.resourceType) });
        //console.log(JSON.stringify(tempObject));
        //console.log(tempObject.length);
        if (tempObject.length >= 1) {
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return true;
    }
}

function findTaskIndex(t_task) {
    return Memory.carrierTask.findIndex(function (a) { return (a.from == t_task.from) && (a.target == t_task.target) && (a.resourceType == t_task.resourceType) })
}

module.exports = function centerCreep(creep) {
    var cpuStart = Game.cpu.getUsed();
    //Memory.carrierTask=[];
    //creep.drop(RESOURCE_ENERGY);
    var ps = creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_POWER_SPAWN } });
    if (creep.store.getFreeCapacity() == creep.store.getCapacity()) {
        if (ps) {
            if (ps.store[RESOURCE_POWER] == 0) {
                if (creep.room.storage.store[RESOURCE_POWER] > 0) {
                    if (findRepeativeTask({ target: ps.id, resourceType: RESOURCE_POWER, weight: 3, from: creep.room.storage.id, amount: 100 })) {
                        Memory.carrierTask.push({ target: ps.id, resourceType: RESOURCE_POWER, weight: 2, from: creep.room.storage.id, amount: 100 });
                    }
                }
            }
            else {
                if (findTaskIndex({ target: ps.id, resourceType: RESOURCE_POWER, weight: 3, from: creep.room.storage.id, amount: 100 }) != -1) {
                    Memory.carrierTask.splice(findTaskIndex({ target: ps.id, resourceType: RESOURCE_POWER, weight: 3, from: creep.room.storage.id, amount: 100 }), 1);
                }
            }

            if (ps.store[RESOURCE_ENERGY] <= 2500) {
                if (findRepeativeTask({ target: ps.id, resourceType: RESOURCE_ENERGY, weight: 3, from: creep.room.storage.id, amount: creep.store.getCapacity() })) {
                    Memory.carrierTask.push({ target: ps.id, resourceType: RESOURCE_ENERGY, weight: 2, from: creep.room.storage.id, amount: creep.store.getCapacity() });
                }
            }
            else {
                if (findTaskIndex({ target: ps.id, resourceType: RESOURCE_ENERGY, weight: 3, from: creep.room.storage.id, amount: creep.store.getCapacity() }) != -1) {
                    Memory.carrierTask.splice(findTaskIndex({ target: ps.id, resourceType: RESOURCE_ENERGY, weight: 3, from: creep.room.storage.id, amount: creep.store.getCapacity() }), 1);
                }
            }
        }
        if (creep.room.storage) {
            let linkStorage = creep.room.storage.pos.findClosestByRange(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_LINK } });
            if (linkStorage.store[RESOURCE_ENERGY] > 0) {
                if (findRepeativeTask({ target: creep.room.storage.id, resourceType: RESOURCE_ENERGY, weight: 1, from: linkStorage.id, amount: creep.store.getCapacity() })) {
                    Memory.carrierTask.push({ target: creep.room.storage.id, resourceType: RESOURCE_ENERGY, weight: 1, from: linkStorage.id, amount: creep.store.getCapacity() });
                }
            }
            else {
                if (findTaskIndex({ target: creep.room.storage.id, resourceType: RESOURCE_ENERGY, weight: 1, from: linkStorage.id, amount: creep.store.getCapacity() }) != -1) {
                    Memory.carrierTask.splice(findTaskIndex({ target: creep.room.storage.id, resourceType: RESOURCE_ENERGY, weight: 1, from: linkStorage.id, amount: creep.store.getCapacity() }), 1);
                }
            }
        }

        Memory.carrierTask = Memory.carrierTask.sort(function (a, b) { return b.weight - a.weight });
        if (Memory.carrierTask.length) {
            if (Game.getObjectById(Memory.carrierTask[0].from).pos.roomName == creep.pos.roomName) {
                if (creep.withdraw(Game.getObjectById(Memory.carrierTask[0].from), Memory.carrierTask[0].resourceType) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(Memory.carrierTask[0].from));
                }
            }
        }
    }
    else {
        if (ps) {
            if (ps.store[RESOURCE_POWER] > 0) {
                if (creep.store[RESOURCE_POWER] > 0) {
                    if (creep.transfer(creep.room.storage, RESOURCE_POWER) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.storage);
                    }
                }
            }
        }
        if (Memory.carrierTask.length) {
            if (Game.getObjectById(Memory.carrierTask[0].from).pos.roomName == creep.pos.roomName) {
                if (creep.transfer(Game.getObjectById(Memory.carrierTask[0].target), Memory.carrierTask[0].resourceType) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(Memory.carrierTask[0].target));
                }
            }
        }
    }
    var cpuEnd = Game.cpu.getUsed();
    console.log(creep + "本次消耗：" + (cpuEnd - cpuStart).toFixed(2));
}