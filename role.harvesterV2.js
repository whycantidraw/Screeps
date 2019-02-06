var roleHarvester2 = {

    /** @param {Creep} creep **/
    run: function (creep) {
        
        function distanceTo(a, b) {
            var ar = creep.pos.getRangeTo(a);
            var br = creep.pos.getRangeTo(b);

            if(ar == br)
                return a;

            return (ar > br ? b : a);
        }
        
        
        
        if (creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(StructureContainer);
            var closestSource = distanceTo(StructureContainer[0], StructureContainer[1]);
            var energyDropped = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 1);
            
            if (energyDropped.length) {
                console.log('found ' + energyDropped[0].energy + ' energy at ', energyDropped[0].pos);
                creep.pickup(energyDropped[0]);
                creep.say('⛏ Salvaging');
            }
            
            if (creep.harvest(StructureContainer) == ERR_NOT_IN_RANGE) {
                creep.moveTo(StructureContainer, { visualizePathStyle: { stroke: '#ffaa00' } });
                creep.say('⛏ seeking');
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                creep.say('⛏  returning');
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }
};

module.exports = roleHarvester2;