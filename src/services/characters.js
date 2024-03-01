'use strict';
const db = require('../models/index');
const Character = db.Character;

const characterSync = async (url) => {
    try {
        let mappedResultsForRelation = [];
        for (let i = 0; i < 42; i++) {
            const fetchedData = await fetch(url + `?page=${i + 1}`);
            const data = await fetchedData.json();
            const results = data.results;
            
            for (let i = 0; i < results.length; i++) {
            
                mappedResultsForRelation.push({
                    characterId: results[i].id,
                    episodesIds: async () => {
                        let ids = [];
                        for (let j = 0; j < results[i].episode.length; j++) {
                            const episodeURL = results[i].episode[j];
                            const episodeFetched = await fetch(episodeURL);
                            const episodeData = await episodeFetched.json();
                            const episodeId = episodeData.id;
                            ids.push(episodeId);                            
                        }
                        return ids;
                    }
                })
            }
            const mappedResults = results.map((result) => {
                return {
                    characterId: result.id,
                    characterName: result.name,
                    characterStatus: result.status,
                    species: result.species,
                    type: result.type,
                    gender: result.gender,
                    image: result.image
                }
            });
            
            const charactersToCreate = [];
            const charatersFromDB = await Character.findAll();

            for (const mappedResult of mappedResults) {
                
                const matched = charatersFromDB.find((characterFromDB) => mappedResult.characterId === characterFromDB.characterId);
                if(!matched) {
                    charactersToCreate.push(mappedResult);
                }
            }
            if (charactersToCreate.length > 0) {                    
                Character.bulkCreate(charactersToCreate);
            }
        
        }
        return mappedResultsForRelation;
    } catch (error) {
        console.log('Error en characterSync: ' + error.message);
        return error.message;
    }
}

module.exports = characterSync;