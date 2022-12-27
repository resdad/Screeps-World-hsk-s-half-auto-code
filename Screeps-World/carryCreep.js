module.exports = function carryCreep(creep) {
    var cpuStart = Game.cpu.getUsed();
    if (Memory.taskList[0].name == "usualCarrying") {
        var targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_LAB)
                    && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        if (targets) {
            if (creep.store.getFreeCapacity() == creep.store.getCapacity()) {
                if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage);
                }
            }
            else {
                if (creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets);
                }
            }
        }
        else {
            //var nuke = creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: (structure) => { return (structure.structureType == STRUCTURE_NUKER) && (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0 || structure.store.getFreeCapacity(RESOURCE_GHODIUM) > 0) } });
            var tower = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER)
                        && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 500;
                }
            });
            if (tower.length) {
                if (creep.store.getFreeCapacity() == creep.store.getCapacity()) {
                    if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.storage);
                    }
                }

                else {
                    if (creep.transfer(tower[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(tower[0]);
                    }
                }

            }
            else if (creep.room.terminal && Memory.dealing == false) {
                let terminalStore = [];
                for (var i in creep.room.terminal.store) {
                    terminalStore.push(i);
                }
                //console.log(terminalStore);

                if (creep.store.getFreeCapacity() == creep.store.getCapacity()) {
                    if (terminalStore.length) {
                        if (creep.withdraw(creep.room.terminal, terminalStore[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.terminal);
                        }
                    }
                }
                else {
                    for (var type in creep.store) {
                        if (creep.transfer(creep.room.storage, type) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.storage);
                        }
                    }
                }
            }
        }
    }
    else if (Memory.taskList[0].name == "synthesis") {
        const t1 = Memory.taskList[0].l1;
        const t2 = Memory.taskList[0].l2;
        const amount = Memory.taskList[0].amount;

        var lab = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_LAB)
                    && (structure.store.getCapacity() == structure.store.getFreeCapacity());
            }
        });
        if (creep.store.getCapacity() == creep.store.getFreeCapacity()) {
            if (lab[0].store[t1] < amount) {
                if (creep.withdraw(creep.room.storage, t1) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage);
                }
            }
            else if (lab[1].store[t2] < amount) {
                if (creep.withdraw(creep.room.storage, t2) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage);
                }
            }
        }
        else {
            if (creep.store[t1] > 0) {
                if (creep.transfer(lab[0], t1)) {
                    creep.moveTo(lab[0]);
                }
            }
            else if (creep.store[t2] > 0) {
                if (creep.transfer(lab[1], t2)) {
                    creep.moveTo(lab[1]);
                }
            }
        }
    }
    var cpuEnd = Game.cpu.getUsed();
    console.log(creep + "本次消耗：" + (cpuEnd - cpuStart).toFixed(2));
}