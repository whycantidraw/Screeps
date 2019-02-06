var roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {
        
        function distanceTo(a, b) {
            var ar = creep.pos.getRangeTo(a);
            var br = creep.pos.getRangeTo(b);

            if(ar == br)
                return a;

            return (ar > br ? b : a);
        }
        
        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if (creep.memory.building) {

            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            const repairTargets = creep.room.find(FIND_STRUCTURES, {filter: object => object.hits < object.hitsMax});
            
            repairTargets.sort((a,b) => a.hits - b.hits);
            
            if (targets.length) {
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
            else if (repairTargets.length) {
                if (creep.repair(repairTargets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(repairTargets[0], { visualizePathStyle: { stroke: '#ffaa00' } });
                }
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

module.exports = roleBuilder;