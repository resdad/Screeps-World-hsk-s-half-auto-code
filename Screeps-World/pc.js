module.exports = function pc_operate(pc) {
    //console.log("A");
    pc.usePower(PWR_GENERATE_OPS);
    //console.log(pc.room.storage.effects.ticksRemaining);
    if (pc.pos.isEqualTo(30, 15, "E26N19")) {
        pc.move(TOP_RIGHT);
    }
    if (pc.ticksToLive < 2500) {
        if (Game.powerCreeps['hsk'].renew(Game.getObjectById("639ae82f11eed9b859f31b4f")) == ERR_NOT_IN_RANGE) {
            pc.moveTo(Game.getObjectById("639ae82f11eed9b859f31b4f"));
        }
    }
    else {
        //console.log(pc.room.storage.effects[0].ticksRemaining);
        if (pc.room.storage.effects.length) {
            if (pc.room.storage.effects[0].ticksRemaining <= 100) {
                if (pc.store[RESOURCE_OPS] < 100) {
                    if (pc.withdraw(pc.room.storage, RESOURCE_OPS, 100) == ERR_NOT_IN_RANGE) {
                        pc.moveTo(pc.room.storage);
                    }
                }
                else {
                    if (pc.usePower(PWR_OPERATE_STORAGE, pc.room.storage) == ERR_NOT_IN_RANGE) {
                        pc.moveTo(pc.room.storage);
                    }
                }
            }
            else {
                if (pc.store[RESOURCE_OPS] > 0) {
                    if (pc.transfer(pc.room.storage, RESOURCE_OPS) == ERR_NOT_IN_RANGE) {
                        pc.moveTo(pc.room.storage);
                    }
                }
            }
        }
        else {
            if (pc.store[RESOURCE_OPS] < 100) {
                if (pc.withdraw(pc.room.storage, RESOURCE_OPS, 100) == ERR_NOT_IN_RANGE) {
                    pc.moveTo(pc.room.storage);
                }
            }
            else {
                if (pc.usePower(PWR_OPERATE_STORAGE, pc.room.storage) == ERR_NOT_IN_RANGE) {
                    pc.moveTo(pc.room.storage);
                }
            }
        }
    }
}