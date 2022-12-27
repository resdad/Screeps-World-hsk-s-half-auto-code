var E26N19 = require('E26N19')
var E25N19 = require('E25N19')

const stateScanner = function () {
    if (Game.time % 10) return
    if (!Memory.stats) Memory.stats = {}
    Memory.stats.gcl = (Game.gcl.progress / Game.gcl.progressTotal) * 100
    Memory.stats.gclLevel = Game.gcl.level
    Memory.stats.gpl = (Game.gpl.progress / Game.gpl.progressTotal) * 100
    Memory.stats.gplLevel = Game.gpl.level
    Memory.stats.cpu = Game.cpu.getUsed()
    Memory.stats.bucket = Game.cpu.bucket
}

function calcBodyCost(body) {
    return _.reduce(body, (sum, part) => sum + BODYPART_COST[part], 0);
}

function findTaskIndex(t_task) {
    return Memory.carrierTask.findIndex(function (a) { return (a.from == t_task.from) && (a.target == t_task.target) && (a.resourceType == t_task.resourceType) })
}

function ordersCancel() {
    var orders = Game.market.orders;
    orders = _.filter(orders, function (x) { return x.remainingAmount == 0 });
    if (orders.length) {
        for (var i = 0; i <= orders.length; i++) {
            Game.market.cancelOrder(orders[i].id);
        }
        return 'Cancel orders successfully!';
    }
    return 'Ineffective orders!';
}

function autoBuyingEnergy(roomName, lowestAmount) {
    let myOrders = Game.market.orders;
    myOrders = _.filter(myOrders, function (x) { return (x.roomName == "E26N19") && (x.resourceType == RESOURCE_ENERGY) && (x.remainingAmount > 0) });
    let leftEnergy = Game.rooms[roomName].storage.store[RESOURCE_ENERGY] + Game.rooms[roomName].terminal.store[RESOURCE_ENERGY];
    //console.log(leftEnergy);
    if (myOrders.length == 0) {
        if (leftEnergy < lowestAmount) {
            let orders = Game.market.getAllOrders({ type: ORDER_BUY, resourceType: RESOURCE_ENERGY });
            orders.sort(function (a, b) { return b.price - a.price });
            let finalPrice = orders[0].price + 1;
            let amount = (lowestAmount - leftEnergy) + 10000;
            Game.market.createOrder({
                type: ORDER_BUY,
                resourceType: RESOURCE_ENERGY,
                price: finalPrice,
                totalAmount: amount,
                roomName: roomName
            });
            return 'Auto buying energy successfully!';
        }
        else {
            return 'The left energy is enough!';
        }
    }
    else {
        return "There are still orders!";
    }
}

function synthesis_lab(name, roomName, amount) {
    const t = Object.keys(REACTIONS);
    var t1;
    var t2;
    for (var i = 0; i < t.length; i++) {
        for (var j = 0; j < t.length; j++) {
            if (REACTIONS[t[i]][t[j]] == name) {
                t1 = t[i];
                t2 = t[j];
            }
        }
    }
    console.log("需要" + amount + " " + t1 + "和" + t2);
    const storage = Game.rooms[roomName].storage;
    if (storage.store[t1] >= amount && storage.store[t1] >= amount) {
        Memory.taskList.push(
            { name: "synthesis", weight: 3, l1: t1, l2: t2, amount: amount }
        );
        return '👌发布任务成功';
    }
    else {
        if (storage.store[t1] < amount) {
            console.log("缺少" + (amount - storage.store[t1]) + " " + t1);
        }
        if (storage.store[t2] < amount) {
            console.log("缺少" + (amount - storage.store[t2]) + " " + t2);
        }
        return '❗发布任务失败';
    }
}

function moniterTaskList() {
    for (var i = 0; i < Memory.taskList.length; i++) {
        console.log("名称：" + Memory.taskList[i].name + " 任务优先度：" + Memory.taskList[i].weight);
    }
    return '';
}

var chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
function generateMixed(n) {
    var res = "";
    for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * 35);
        res += chars[id];
    }
    return res;
}


//console.log(`<p style="color:red">I am red</p>`)
function controllerFind(controller) {
    let cpuUsedBegin = Game.cpu.getUsed();
    Memory.targetsTower = {};
    Memory.targetsTower.hostileCreeps = [];
    Memory.targetsTower.ownedCreeps = [];
    Memory.targetsTower.needFixedStructures = [];
    //console.log(Memory.targetsTower.hostileCreeps);
    //console.log(Memory.targetsTower.needFixedStructures);
    //console.log(Memory.targetsTower.ownedCreeps);
    let temp_s = controller.room.find(FIND_STRUCTURES, { filter: function (o) { return (o.structureType == STRUCTURE_ROAD && o.hits < o.hitsMax) || (o.structureType == STRUCTURE_CONTAINER && o.hits < o.hitsMax) } });
    //console.log(temp);
    let temp_c = controller.room.find(FIND_CREEPS, { filter: (o) => { return !o.my || (o.my && o.hits < o.hitsMax) } });
    //console.log(temp_c);
    if (temp_s.length) {
        for (let i = 0; i < temp_s.length; i++) {
            Memory.targetsTower.needFixedStructures.push(temp_s[i].id);
        }
        //console.log(Memory.targetsTower.needFixedStructures);
    }
    if (temp_c.length) {
        for (let i = 0; i < temp_c.length; i++) {
            if (temp_c[i].my) {
                Memory.targetsTower.ownedCreeps.push(temp_c[i].id);
            }
            else {
                Memory.targetsTower.hostileCreeps.push(temp_c[i].id);
            }
        }
    }
    let cpuUsedEnd = Game.cpu.getUsed();
    console.log(controller.room.name + "本次搜索消耗：" + (cpuUsedEnd - cpuUsedBegin).toFixed(2));
}

const GlobalList = {
    lab: synthesis_lab,
    ct: moniterTaskList,
    autoBuyingEnergy: autoBuyingEnergy,
    calcBodyCost: calcBodyCost,
    ordersCancel: ordersCancel,
    findTaskIndex: findTaskIndex,
    generateMixed: generateMixed,
    pc_operate: pc_operate,
}

module.exports.loop = function () {
    if (Game.time % 10 == 0) {
        controllerFind(Game.rooms['E26N19'].controller);
        controllerFind(Game.rooms['E25N19'].controller);
    }
    
    if (Game.time % 10000 == 0) {
        ordersCancel();
    }
    if (!Memory.taskList) {
        Memory.taskList = Memory.taskList.sort(function (a, b) { return b.weight - a.weight });
    }
    _.assign(global, GlobalList);

    E26N19();
    E25N19();

    if (Game.cpu.bucket == 10000) {
        if (Game.cpu.generatePixel() == 0) {
            console.log("Generate 1 pixel successfully, now Pixel: " + (Game.resources[PIXEL] + 1));
        }
    }
    if (Game.cpu.getUsed() >= 20) {
        console.log("⚠️危，CPU超过20里！！！！！　　　现在CPU使用量：" + Game.cpu.getUsed().toFixed(2));
    }

    stateScanner()
};
