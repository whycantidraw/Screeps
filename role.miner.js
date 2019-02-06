var roleMiner = {

    /** @param {Creep} creep **/
    run: function (creep) {
        
        function distanceTo(a, b) {
            var ar = creep.pos.getRangeTo(a);
            var br = creep.pos.getRangeTo(b);

            if(ar == br)
                return a;

            return (ar > br ? b : a);
        }
        
            var sources = creep.room.find(FIND_SOURCES_ACTIVE);
            var closestSource = distanceTo(sources[0], sources[1]);
            
            if (creep.harvest(closestSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestSource, { visualizePathStyle: { stroke: '#ffaa00' } });
                creep.say('⛏ seeking');
            }
    }
};

module.exports = roleMiner;