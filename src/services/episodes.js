'use strict';
const db = require('../models/index');
const Episode = db.Episode;
const Character = db.Character;
const CharacterEpisode = db.CharacterEpisode;

const episodeSync = async (url,characters) => {
    try {
        for (let i = 0; i < 3; i++) {
            const fetchedData = await fetch(url + `?page=${i + 1}`);
            const data = await fetchedData.json();
            const results = data.results;
            const mappedResults = results.map((result) => {
                return {
                    episodeId: result.id,
                    episodeName: result.name,
                    air_name: result.air_date,
                    episodeCode: result.episode,
                }
            });
            
            const episodesToCreate = [];
            const episodesFromDB = await Episode.findAll();

            for (const mappedResult of mappedResults) {
                
                const matched = episodesFromDB.find((episodeFromDB) => mappedResult.episodeId === episodeFromDB.episodeId);
                if(!matched) {
                    episodesToCreate.push(mappedResult);
                }
            }
            if (episodesToCreate.length > 0) {                    
                Episode.bulkCreate(episodesToCreate);
            }
        }

        if (characters.length > 0) {
            const createCharacterEpisode = async (character, episodeId) => {
                const episodeFromDB = await Episode.findOne({
                    where: {
                        episodeId: episodeId,
                    },
                });
        
                const characterFromDB = await Character.findOne({
                    where: {
                        characterId: character.characterId,
                    },
                });
        
                await CharacterEpisode.create({
                    characterId: characterFromDB.id,
                    episodeId: episodeFromDB.id,
                });
            };
        
            const processCharacter = async (character) => {
                const episodesApiIds = await character.episodesIds();
                const createPromises = episodesApiIds.map((episodeId) =>
                    createCharacterEpisode(character, episodeId)
                );
        
                await Promise.all(createPromises);
            };
        
            await Promise.all(characters.map(processCharacter));
        }
        
    } catch (error) {
        console.log('Error en episodeSync: ' + error.message);
        return error.message;
    }
}

module.exports = episodeSync;