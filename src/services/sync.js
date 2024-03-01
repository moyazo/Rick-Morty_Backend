'use strict';
const characterSyncMethod = require('./characters');
// const locationSyncMethod = require('./locations');
const episodeSyncMethod = require('./episodes');

const syncApi = async (API_URL_CHARACTER,API_URL_LOCATION,API_URL_EPISODE) => {
    
    const characters = await characterSyncMethod(API_URL_CHARACTER);
    await episodeSyncMethod(API_URL_EPISODE,characters);
    // const apiEpisodes = await episodeSyncMethod(API_URL_EPISODE);
}


module.exports = syncApi;