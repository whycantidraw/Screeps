var roleRepair = {

    /** @param {Creep} creep **/

    run: function (creep) {

        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 repair');
        }

const targets = creep.room.find(FIND_STRUCTURES, {
    filter: object => object.hits < 10000 // Sets limiter
});

targets.sort((a,b) => a.hits - b.hits);

if(targets.length) {
    if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0]);
    }
}