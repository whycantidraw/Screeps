var roleHarvester = {

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
            var sources = creep.room.find(FIND_SOURCES_ACTIVE);
            var closestSource = distanceTo(sources[0], sources[1]);
            var energyDropped = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 1);
            const containersWithEnergy = creep.room.find(FIND_STRUCTURES, {
                filter: (i) => i.structureType == STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] > 0
            });
            
            if (containersWithEnergy.length) {
                console.log('Container found.');
                if(creep.withdraw(containersWithEnergy[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containersWithEnergy[0]);
                }
                
            }
            
            else if (energyDropped.length) {
                console.log('found ' + energyDropped[0].energy + ' energy at ', energyDropped[0].pos);
                if(creep.pickup(energyDropped[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(energyDropped[0]);
                    creep.say('⛏ Salvaging');
                }
            }
            
            else if (creep.harvest(closestSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestSource, { visualizePathStyle: { stroke: '#ffaa00' } });
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
            
            var closestTarget = distanceTo(targets[0], targets[1]);
            
            if (targets.length > 0) {
                if (creep.transfer(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestTarget, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }
};

module.exports = roleHarvester;