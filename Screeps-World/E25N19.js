const builder_noob = require('./builder_noob');
const carryCreep = require('./carryCreep');
const centreCreep = require('./centreCreep');

require('main_mount')

function E25N19() {
    //autoBuyingEnergy("E25N19",100000);
    new RoomVisual("E25N19").text(((Game.rooms['E25N19'].controller.progress / Game.rooms['E25N19'].controller.progressTotal) * 100).toFixed(1) + "%", 41, 4, { color: 'yellow', front: 0.75 });
    var CONSTRUCTION_SITES = Game.rooms['E25N19'].find(FIND_CONSTRUCTION_SITES);
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log("Clearing non-existing creep memory:", name);
        }
    }

    var harvester = _.filter(
        Game.creeps,
        (creep) => creep.memory.role == "h"
    );
    var upgrader = _.filter(
        Game.creeps,
        (creep) => creep.memory.role == "u"
    );
    var builder = _.filter(
        Game.creeps,
        (creep) => creep.memory.role == "b"
    );
    var slkeeper = _.filter(
        Game.creeps,
        (creep) => creep.memory.role == "slkeeper"
    );
    var carrier = _.filter(
        Game.creeps,
        (creep) => creep.memory.role == "scarrier"
    );
    var stkeeper = _.filter(
        Game.creeps,
        (creep) => creep.memory.role == "stkeeper"
    );

    if (!Game.spawns['Spawn2'].spawning && carrier.length < 1) {
        var workerBody = [], bodyIteration = [CARRY, CARRY, MOVE];
        while (calcBodyCost(workerBody) + calcBodyCost(bodyIteration) <= Game.spawns['Spawn2'].room.energyAvailable && workerBody.length + bodyIteration.length <= 15) {
            workerBody = workerBody.concat(bodyIteration);
        }
        var newName = "搬运工";
        Game.spawns["Spawn2"].spawnCreep(
            workerBody,
            Game.spawns['Spawn2'].pos.roomName + newName + Game.time % 10,
            { memory: { role: "scarrier" } }
        );
    }
    if (!Game.spawns['Spawn2'].spawning && harvester.length < 2) {
        var newName = "矿工";
        Game.spawns["Spawn2"].spawnCreep(
            [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE],
            Game.spawns['Spawn2'].pos.roomName + newName + Game.time % 10,
            { memory: { role: "h" } }
        );
    }

    if (!Game.spawns['Spawn2'].spawning && upgrader.length < 4) {
        // console.log(upgrader.length);
        var newName = "冲级工";
        Game.spawns["Spawn2"].spawnCreep(
            [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE],
            Game.spawns['Spawn2'].pos.roomName + newName + Game.time % 10,
            { memory: { role: "u" } }
        );
    }
    if (!Game.spawns['Spawn2'].spawning && builder.length < 0 && scarrier.length > 1 && CONSTRUCTION_SITES.length > 0) {
        var newName = "建筑工";
        Game.spawns["Spawn2"].spawnCreep(
            [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
            Game.spawns['Spawn2'].pos.roomName + newName + Game.time % 10,
            { memory: { role: "b" } }
        );
    }
    if (!Game.spawns['Spawn2'].spawning && stkeeper.length < 0) {
        var newName = "周转";
        Game.spawns["Spawn2"].spawnCreep(
            [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
            Game.spawns['Spawn2'].pos.roomName + newName + Game.time % 10,
            { memory: { role: "stkeeper" } }
        );
    }
    if (!Game.spawns['Spawn6'].spawning && slkeeper.length < 1) {
        var workerBody = [], bodyIteration = [CARRY, CARRY];
        while (calcBodyCost(workerBody) + calcBodyCost(bodyIteration) <= Game.spawns['Spawn3'].room.energyAvailable && workerBody.length + bodyIteration.length <= 20) {
            workerBody = workerBody.concat(bodyIteration);
        }
        var newName = "中心管理员";
        Game.spawns["Spawn6"].spawnCreep(
            workerBody,
            Game.spawns['Spawn6'].pos.roomName + newName + Game.time % 10,
            { memory: { role: "slkeeper" }, directions: [TOP_RIGHT] }
        );
    }

    for (var name in Game.rooms.structures) {
        var s = Game.structures[name];
        if (s.structureType == STRUCTURE_TOWER) {
            tower(s);
            //console.log(towerkeeper.length);
        }
    }
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == "h") {
            harvester_noob(creep);
        }
        if (creep.memory.role == "stkeeper") {
            terminalCreep(creep);
        }
        if (creep.memory.role == "u") {
            upgrader_noob(creep);
        }
        if (creep.memory.role == "b") {
            builder_noob(creep);
        }
        if (creep.memory.role == "slkeeper") {
            creep.memory.dontPullMe = true;
            centreCreep(creep);
        }
        if (creep.memory.role == "scarrier") {
            carryCreep(creep);
        }
    }
    var linkMain = Game.rooms['E25N19'].storage.pos.findClosestByRange(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_LINK } });
    var link1 = Game.getObjectById('638089577cef9ae9a0cc9877');
    if (link1.store[RESOURCE_ENERGY] == 800) {
        link1.transferEnergy(linkMain);
    }
    //console.log(Game.cpu.getUsed(Game.rooms['E25N19']).toFixed(1));
    //console.log(Game.cpu.getUsed(Game.rooms['E26N19']).toFixed(1));
}
module.exports = E25N19;