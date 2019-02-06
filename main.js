var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner')
var roleHarvester2 = require('role.harvesterV2')

module.exports.loop = function () {
// Claim New Room    

for(const i in Game.creeps) {
    if (Game.creeps[i].memory.role === "invader"){
            Game.creeps[i].moveTo(Game.flags.Flag2);
    } ;
}
    
// Towers - fix loop
    var tower = [Game.getObjectById('5c49e4a777b1f1069c4725ef'), Game.getObjectById('5c56f5b5b274ce22c55de679')];
    var t;
    for (t=0; t < tower.length; t++){ 
    if (tower) {
        var closestDamagedStructure = tower[t].pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        var closestHostile = tower[t].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower[t].attack(closestHostile);
        }
        else if (closestDamagedStructure) {
            tower[t].repair(closestDamagedStructure);
        }
}


    }
    
/*
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builders.length);
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgraders.length);
*/    
    
// E22N6    

    var spawnPoint = 'Spawn1';
    var homeRoom = 'E22N6';

// Print Count

    var harvestersE22N6 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.home == 'E22N6');
    console.log('Harvesters in E22N6: ' + harvestersE22N6.length);    
    
    var buildersE22N6 = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.home == 'E22N6');
    console.log('Builders in E22N6: ' + buildersE22N6.length);  
    
    var upgradersE22N6 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.home == 'E22N6');
    console.log('Upgraders in E22N6: ' + upgradersE22N6.length);  
    
    var creepsE22N6 = _.filter(Game.creeps, (creep) => creep.memory.home == 'E22N6');
    console.log('Creeps in E22N6: ' + creepsE22N6.length);  
    
// Print Available Energy

    var totalEnergy = Game.spawns[spawnPoint].room.energyAvailable;
    var totalCapacity = Game.spawns[spawnPoint].room.energyCapacityAvailable;
    console.log('Available Energy in ' + homeRoom + ': ' + totalEnergy + '/' + totalCapacity);


// Auto Spawn
    
// Harvesters

    if (harvestersE22N6.length < 2) {
        var spawnRole = 'harvester'
        var newName = spawnRole + Game.time;
        
        console.log('Spawning new ' + spawnRole + ': ' + newName);
        
        if (totalEnergy > 1000) {
            Game.spawns[spawnPoint].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], newName,
                { memory: { role: spawnRole, home: homeRoom, spawn: spawnPoint }}); }
        else if (totalEnergy > 500) {
            Game.spawns[spawnPoint].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], newName,
                { memory: { role: spawnRole, home: homeRoom, spawn: spawnPoint }}); }
        else {
            Game.spawns[spawnPoint].spawnCreep([WORK, CARRY, MOVE], newName,
                { memory: { role: spawnRole, home: homeRoom, spawn: spawnPoint }});
        }
    }

// Builders
    
    if (buildersE22N6.length < 3) {
        var spawnRole = 'builder';
        var newName = spawnRole + Game.time;
        
        console.log('Spawning new ' + spawnRole + ': ' + newName);
        
        if (totalEnergy > 1000) {
            Game.spawns[spawnPoint].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], newName,
                { memory: { role: spawnRole, home: homeRoom, spawn: spawnPoint }}); }
        else if (totalEnergy > 500) {
            Game.spawns[spawnPoint].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], newName,
                { memory: { role: spawnRole, home: homeRoom, spawn: spawnPoint }}); }
        else {
            Game.spawns[spawnPoint].spawnCreep([WORK, CARRY, MOVE], newName,
                { memory: { role: spawnRole, home: homeRoom, spawn: spawnPoint }});
        }
    }
    
// Upgraders
    
    if (upgradersE22N6.length < 1) {
        var spawnRole = 'upgrader';
        var newName = spawnRole + Game.time;
        
        console.log('Spawning new ' + spawnRole + ': ' + newName);
        
        if (totalEnergy > 1000) {
            Game.spawns[spawnPoint].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], newName,
                { memory: { role: spawnRole, home: homeRoom, spawn: spawnPoint }}); }
        else if (totalEnergy > 500) {
            Game.spawns[spawnPoint].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], newName,
                { memory: { role: spawnRole, home: homeRoom, spawn: spawnPoint }}); }
        else {
            Game.spawns[spawnPoint].spawnCreep([WORK, CARRY, MOVE], newName,
                { memory: { role: spawnRole, home: homeRoom, spawn: spawnPoint }});
        }
    }

// Declare Spawns to Room

    if (Game.spawns[spawnPoint].spawning) {
        var spawningCreep = Game.creeps[Game.spawns[spawnPoint].spawning.name];
        Game.spawns[spawnPoint].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns[spawnPoint].pos.x + 1,
            Game.spawns[spawnPoint].pos.y,
            { align: 'left', opacity: 0.8 });
    }
    
// E22N5  

    var spawnPoint = 'Spawn2';
    var homeRoom = 'E22N5';

// Print Count

    var harvestersE22N5 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.home == 'E22N5');
    console.log('Harvesters in E22N5: ' + harvestersE22N5.length);    
    
    var buildersE22N5 = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.home == 'E22N5');
    console.log('Builders in E22N5: ' + buildersE22N5.length);  
    
    var upgradersE22N5 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.home == 'E22N5');
    console.log('Upgraders in E22N5: ' + upgradersE22N5.length);  
    
    var creepsE22N5 = _.filter(Game.creeps, (creep) => creep.memory.home == 'E22N5');
    console.log('Creeps in E22N5: ' + creepsE22N5.length);  
    
// Print Available Energy

    var totalEnergy = Game.spawns[spawnPoint].room.energyAvailable;
    var totalCapacity = Game.spawns[spawnPoint].room.energyCapacityAvailable;
    console.log('Available Energy in E22N5: ' + totalEnergy + '/' + totalCapacity);


// Auto Spawn
    
// Harvesters

    if (harvestersE22N5.length < 1) {
        var spawnRole = 'harvester'
        var newName = spawnRole + Game.time;
        
        console.log('Spawning new ' + spawnRole + ': ' + newName);
        
        if (totalEnergy > 1000) {
            Game.spawns[spawnPoint].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], newName,
                { memory: { role: spawnRole, home: homeRoom, spawn: spawnPoint }}); }
        else if (totalEnergy > 500) {
            Game.spawns[spawnPoint].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], newName,
                { memory: { role: spawnRole, home: homeRoom, spawn: spawnPoint }}); }
        else {
            Game.spawns[spawnPoint].spawnCreep([WORK, CARRY, MOVE], newName,
                { memory: { role: spawnRole, home: homeRoom, spawn: spawnPoint }});
        }
    }

// Builders
    
    if (buildersE22N5.length < 3) {
        var spawnRole = 'builder';
        var newName = spawnRole + Game.time;
        
        console.log('Spawning new ' + spawnRole + ': ' + newName);
        
        if (totalEnergy > 1000) {
            Game.spawns[spawnPoint].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], newName,
                { memory: { role: spawnRole, home: homeRoom, spawn: spawnPoint }}); }
        else if (totalEnergy > 500) {
            Game.spawns[spawnPoint].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], newName,
                { memory: { role: spawnRole, home: homeRoom, spawn: spawnPoint }}); }
        else {
            Game.spawns[spawnPoint].spawnCreep([WORK, CARRY, MOVE], newName,
                { memory: { role: spawnRole, home: homeRoom, spawn: spawnPoint }});
        }
    }
    
// Upgraders
    
    if (upgradersE22N5.length < 2) {
        var spawnRole = 'upgrader';
        var newName = spawnRole + Game.time;
        
        console.log('Spawning new ' + spawnRole + ': ' + newName);
        
        if (totalEnergy > 1000) {
            Game.spawns[spawnPoint].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], newName,
                { memory: { role: spawnRole, home: homeRoom, spawn: spawnPoint }}); }
        else if (totalEnergy > 500) {
            Game.spawns[spawnPoint].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], newName,
                { memory: { role: spawnRole, home: homeRoom, spawn: spawnPoint }}); }
        else {
            Game.spawns[spawnPoint].spawnCreep([WORK, CARRY, MOVE], newName,
                { memory: { role: spawnRole, home: homeRoom, spawn: spawnPoint }});
        }
    }

// Declare Spawns to Room

    if (Game.spawns[spawnPoint].spawning) {
        var spawningCreep = Game.creeps[Game.spawns[spawnPoint].spawning.name];
        Game.spawns[spawnPoint].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns[spawnPoint].pos.x + 1,
            Game.spawns[spawnPoint].pos.y,
            { align: 'left', opacity: 0.8 });
    }
    
// Is dead? Run clean.
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }

// Run Roles
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}