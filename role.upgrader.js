var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep) {

        function distanceTo(a, b) {
            var ar = creep.pos.getRangeTo(a);
            var br = creep.pos.getRangeTo(b);

            if(ar == br)
                return a;

            return (ar > br ? b : a);
        }

        if (creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
        
        else {
            var sources = creep.room.find(FIND_SOURCES);
            var closestSource = distanceTo(sources[0], sources[1]);
            if (creep.harvest(closestSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestSource, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }
};

module.exports = roleUpgrader;