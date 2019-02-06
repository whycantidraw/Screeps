/*

Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Bob' { memory: { role: 'builder' } } );
Game.creeps['Harvester1'].memory.role = 'harvester';

Test Miner/HarvesterV2:
Game.spawns['Spawn1'].spawnCreep( [WORK,WORK,MOVE], 'Roland', { memory: { role: 'miner' } } );
Game.spawns['Spawn1'].spawnCreep( [WORK,WORK,MOVE], 'Doloran', { memory: { role: 'harvester2' } } )

Game.spawns['Spawn1'].spawnCreep( [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], 'Jim', { memory: { role: 'harvester' } } );
Game.spawns['Spawn1'].spawnCreep( [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], 'Patrick', { memory: { role: 'upgrader' } } );
Game.spawns['Spawn1'].spawnCreep( [WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE], 'Roland', { memory: { role: 'miner' } } );

Test Claimyboi
Game.spawns['Spawn1'].spawnCreep( [CLAIM,CLAIM,MOVE], 'Dora', { memory: { role: 'invader' } } );
Game.spawns['Spawn1'].spawnCreep( [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], 'Patrick', { memory: { role: 'invader' } } );

var listSources = creep.room.find(FIND_SOURCES) // Create array based on sources

var energyDropped = creep.pos.findInRange(FIND_DROPPED_ENERGY, 1);



*/