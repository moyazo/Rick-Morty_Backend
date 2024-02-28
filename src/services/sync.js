'use strict';
const characterSyncMethod = require('./characters');
const locationSyncMethod = require('./locations');
const episodeSyncMethod = require('./episodes');
const API_URL_CHARACTER = 'https://rickandmortyapi.com/api/character';
const API_URL_LOCATION = 'https://rickandmortyapi.com/api/location';
const API_URL_EPISODE = 'https://rickandmortyapi.com/api/episode';

const syncApi = async (API_URL_CHARACTER,API_URL_LOCATION,API_URL_EPISODE) => {
    const apiCharacters =  await characterSyncMethod(API_URL_CHARACTER);
    const apiLocations = await locationSyncMethod(API_URL_LOCATION);
    const apiEpisodes = await episodeSyncMethod(API_URL_EPISODE);
}


module.exports = syncApi;