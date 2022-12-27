// Harvester代码
var stKeeper = {
    /** @param {Creep} creep **/
    run: function (creep) {
        if(creep.room.terminal.store.getFreeCapacity(RESOURCE_ENERGY) == 0){
            if(creep.store.getCapacity() == creep.store.getFreeCapacity()){
                if(creep.withdraw(creep.room.storage,RESOURCE_ENERGY)==ERR_NOT_IN_RANGE){
                    creep.moveTo(creep.room.storage);
                }
            }
            else{
                if(creep.transfer(creep.room.terminal,RESOURCE_ENERGY)==ERR_NOT_IN_RANGE){
                    creep.moveTo(creep.room.terminal);
                }
            }
        }
    }
};
module.exports = stKeeper;
//ok