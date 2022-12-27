var Attacker = {
    run: function (creep) {
        //creep.heal(creep);
        //creep.moveTo(Game.flags.Flag5);
        var l = creep.room.find(FIND_STRUCTURES,{filter:{structureType:STRUCTURE_INVADER_CORE}});
        //creep.rangedMassAttack(l[0]);
        var a =Game.getObjectById("5f615d4cbbf9fe7686c12298");
        //creep.moveTo(l[0]);
        if(creep.attack(l[0])==ERR_NOT_IN_RANGE)
        {creep.moveTo(l[0])}
    }
};

module.exports = Attacker;
//ok