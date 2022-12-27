// Harvester代码
var Claimer = {
    /** @param {Creep} creep **/
    run: function (creep) {
        
              //creep.moveTo(Game.flags.Flag5);
        
            if(creep.attackController(Game.rooms['E23N17'].controller)==ERR_NOT_IN_RANGE){
                creep.moveTo(Game.rooms['E23N17'].controller);
            }
        
    }
};

module.exports = Claimer;
//ok