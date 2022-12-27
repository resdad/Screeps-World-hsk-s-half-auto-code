const buildCreep = require('./buildCreep');
const harvesteCreep = require('./harvesteCreep');
const harvester_deposit = require('./harvester_deposit');
const healCreep = require('./healCreep');
const mineralCarryCreep = require('./mineralCarryCreep');
const mineralCreep = require('./mineralCreep');
const upgradeCreep = require('./upgradeCreep');

require('main_mount')

function E26N19() {
    autoBuyingEnergy("E26N19", 200000);
    var CONSTRUCTION_SITES = Game.rooms['E25N19'].find(FIND_CONSTRUCTION_SITES);
    var observer = Game.getObjectById("639af1dc6d5c176ac6d5d0cf");
    observer.observeRoom("E23N17");
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log("Clearing non-existing creep memory:", name);
        }
    }
    var harvester = _.filter(
        Game.creeps,
        (creep) => creep.memory.role == "harvester"
    );
    var attacker = _.filter(
        Game.creeps,
        (creep) => creep.memory.role == "attacker"
    );
    var upgrader = _.filter(
        Game.creeps,
        (creep) => creep.memory.role == "upgrader"
    );
    var builder = _.filter(
        Game.creeps,
        (creep) => creep.memory.role == "builder"
    );
    var carrier = _.filter(
        Game.creeps,
        (creep) => creep.memory.role == "carrier"
    );
    var healer = _.filter(
        Game.creeps,
        (creep) => creep.memory.role == "healer"
    );
    var claimer = _.filter(
        Game.creeps,
        (creep) => creep.memory.role == "claimer"
    );
    var mineraler = _.filter(
        Game.creeps,
        (creep) => creep.memory.role == "mineraler"
    );
    var mcarrier = _.filter(
        Game.creeps,
        (creep) => creep.memory.role == "mcarrier"
    );
    var scout = _.filter(
        Game.creeps,
        (creep) => creep.memory.role == "scout"
    );
    var h_deposit = _.filter(
        Game.creeps,
        (creep) => creep.memory.role == "h_deposit"
    );
    var stkeeper = _.filter(
        Game.creeps,
        (creep) => creep.memory.role == "stkeeper"
    );
    var slkeeper = _.filter(
        Game.creeps,
        (creep) => creep.memory.role == "lkeeper"
    );


    if (!Game.spawns['Spawn1'].spawning && harvester.length < 2) {
        var newName = "矿工";
        Game.spawns["Spawn1"].spawnCreep(
            [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE],
            Game.spawns['Spawn1'].pos.roomName + newName + Game.time % 10,
            { memory: { role: "harvester" } }
        );
    }
    if (!Game.spawns['Spawn1'].spawning && mcarrier.length < 0) {
        var newName = "稀矿搬运工";
        Game.spawns["Spawn1"].spawnCreep(
            [CARRY, CARRY, MOVE, MOVE, CARRY, CARRY, MOVE, MOVE, CARRY, MOVE, MOVE],
            Game.spawns['Spawn1'].pos.roomName + newName + Game.time % 10,
            { memory: { role: "mcarrier" } }
        );
    }
    if (!Game.spawns['Spawn1'].spawning && stkeeper.length < 0) {
        var newName = "终端工";
        var workerBody = [], bodyIteration = [CARRY, CARRY, MOVE];
        while (calcBodyCost(workerBody) + calcBodyCost(bodyIteration) <= Game.spawns['Spawn1'].room.energyAvailable && workerBody.length + bodyIteration.length <= 45) {
            workerBody = workerBody.concat(bodyIteration);
        }
        Game.spawns["Spawn1"].spawnCreep(
            workerBody,
            Game.spawns['Spawn1'].pos.roomName + newName + Game.time % 10,
            { memory: { role: "stkeeper" } }
        );
    }
    //console.log(slkeeper[0].pos);
    if (!Game.spawns['Spawn3'].spawning && slkeeper.length < 1) {
        var workerBody = [], bodyIteration = [CARRY, CARRY];
        while (calcBodyCost(workerBody) + calcBodyCost(bodyIteration) <= Game.spawns['Spawn3'].room.energyAvailable && workerBody.length + bodyIteration.length <= 50) {
            workerBody = workerBody.concat(bodyIteration);
        }
        var newName = "中心管理员";
        Game.spawns["Spawn3"].spawnCreep(
            workerBody,
            Game.spawns['Spawn3'].pos.roomName + newName + Game.time % 10,
            { memory: { role: "lkeeper" }, directions: [RIGHT] }
        );
    }
    if (!Game.spawns['Spawn4'].spawning && mineraler.length < 0) {
        var newName = "稀矿工";
        Game.spawns["Spawn4"].spawnCreep(
            [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
            Game.spawns['Spawn4'].pos.roomName + newName + Game.time % 10,
            { memory: { role: "mineraler" } }
        );
    }
    if (!Game.spawns['Spawn1'].spawning && h_deposit.length < 0) {
        var newName = "沉淀稀矿工";
        Game.spawns["Spawn1"].spawnCreep(
            [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
            Game.spawns['Spawn1'].pos.roomName + newName + Game.time % 10,
            { memory: { role: "h_deposit" } }
        );
    }
    if (!Game.spawns['Spawn1'].spawning && scout.length < 0) {
        var newName = "眼线";
        Game.spawns["Spawn1"].spawnCreep(
            [MOVE],
            Game.spawns['Spawn1'].pos.roomName + newName + Game.time % 10,
            { memory: { role: "scout" } }
        );
    }
    //console.log(builder.length);
    if (!Game.spawns['Spawn4'].spawning && carrier.length < 1) {
        var workerBody = [], bodyIteration = [CARRY, CARRY, MOVE];
        while (calcBodyCost(workerBody) + calcBodyCost(bodyIteration) <= Game.spawns['Spawn4'].room.energyAvailable && workerBody.length + bodyIteration.length <= 30) {
            workerBody = workerBody.concat(bodyIteration);
        }
        var newName = "搬运工";
        Game.spawns["Spawn4"].spawnCreep(
            workerBody,
            Game.spawns['Spawn4'].pos.roomName + newName + Game.time % 10,
            { memory: { role: "carrier" } }
        );
    }
    if (!Game.spawns['Spawn1'].spawning && upgrader.length < 0) {
        var newName = "冲级工";
        Game.spawns["Spawn1"].spawnCreep(
            [WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, MOVE],
            Game.spawns['Spawn1'].pos.roomName + newName + Game.time % 10,
            { memory: { role: "upgrader" }, directions: [BOTTOM_LEFT] }
        );
    }
    if (!Game.spawns['Spawn1'].spawning && upgrader.length < 0) {
        var newName = "冲级工";
        Game.spawns["Spawn1"].spawnCreep(
            [WORK, WORK, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY],
            Game.spawns['Spawn1'].pos.roomName + newName + Game.time % 10,
            { memory: { role: "upgrader" }, directions: [BOTTOM_LEFT] }
        );
    }
    if (!Game.spawns['Spawn4'].spawning && builder.length < 1 && carrier.length == 1 && CONSTRUCTION_SITES.length > 0) {
        var newName = "建筑工";
        Game.spawns["Spawn4"].spawnCreep(
            [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
            Game.spawns['Spawn1'].pos.roomName + newName + Game.time % 10,
            { memory: { role: "builder" } }
        );
    }
    //console.log(builder.length);
    //console.log(tombstone.length);


    for (var name in Game.structures) {
        var s = Game.structures[name];
        if (s.structureType == STRUCTURE_TOWER) {
            tower(s);
        }
    }
    //console.log(sa);

    //console.log(carrier.length);

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        //console.log(creep);
        //console.log(creep + Game.cpu.getUsed(creep).toFixed(1));
        if (creep.memory.role == "harvester") {
            harvesteCreep(creep);
        }
        if (creep.memory.role == "upgrader") {
            upgradeCreep(creep);
        }
        if (creep.memory.role == "builder") {
            creep.memory.dontPullMe = false;
            buildCreep(creep);
        }
        if (creep.memory.role == "mineraler") {
            mineralCreep(creep);
        }
        if (creep.memory.role == 'carrier') {
            carryCreep(creep);
        }
        if (creep.memory.role == 'healer') {
            healCreep(creep);
        }
        if (creep.memory.role == 'mcarrier') {
            mineralCarryCreep(creep);
        }
        if (creep.memory.role == 'h_deposit') {
            harvester_deposit(creep);
        }
        if (creep.memory.role == 'stkeeper') {
            terminalCreep(creep);
        }
        if (creep.memory.role == "lkeeper") {
            creep.memory.dontPullMe = true;
            centerCreep(creep);
        }
        
    }
    var link1 = Game.getObjectById("63883b00d63e3fd380e7c291");
    var linkm = Game.getObjectById("63a2f76e68e8085f9818104f");
    var link2 = Game.getObjectById("63884134b16ac186acd30ac1");
    var link3 = Game.getObjectById("63748eb1a806de5cce4c6ac3");
    var link4 = Game.getObjectById("63a3c70d8ec3bb90a05c84af");
    var link5 = Game.getObjectById("63a57d66daa1072c77ea4fde");

    if (link5.store[RESOURCE_ENERGY] == 800) {
        link5.transferEnergy(linkm);
    }
    if (link4.store[RESOURCE_ENERGY] == 800) {
        link4.transferEnergy(linkm);
    }
    if (link3.store[RESOURCE_ENERGY] == 800) {
        link3.transferEnergy(linkm);
    }
    if (link1.store[RESOURCE_ENERGY] == 800) {
        link1.transferEnergy(linkm);
    }
    if (link2.store[RESOURCE_ENERGY] == 800) {
        link2.transferEnergy(linkm);
    }
    var a = Game.getObjectById("639ae82f11eed9b859f31b4f");
    a.processPower();
    //var hsk = Game.powerCreeps['hsk'];
    //console.log(hsk);
    if (Game.powerCreeps['hsk'].ticksToLive > 0) {
        //console.log("s");
        pc_operate(Game.powerCreeps['hsk']);
    }
    else {
        //console.log("A");
        Game.powerCreeps['hsk'].spawn(Game.getObjectById('639ae82f11eed9b859f31b4f'));
    }

}
module.exports = E26N19;