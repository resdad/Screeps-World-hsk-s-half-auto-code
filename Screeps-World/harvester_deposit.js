module.exports = function harvest_deposit(creep) {
    var sources = Game.rooms['E26N20'].find(FIND_DEPOSITS);
    for (var name in Game.creeps) {
        var c = Game.creeps[name];
        if (c.memory.role == "scout" && c.memory.is_here == true) {
            if (creep.store.getFreeCapacity() > 0) {
                if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
            }
            else {
                if (creep.transfer(Game.rooms['E26N19'].storage, RESOURCE_MIST) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.rooms['E26N19'].storage);
                }
            }
        }
    }
}