const redis = require('redis');
const appConfig = require('../config/db.config');

function createRedisClient(){
    let redisClient=null;
    if(appConfig.redisServerPassword){
        redisClient = redis.createClient(parseInt(appConfig.redisPort), appConfig.redisHost, {
            auth_pass : appConfig.get('redisServerPassword'),
            no_ready_check : true
        })
    } else {
        redisClient = redis.createClient(parseInt(appConfig.redisPort), appConfig.redisHost);
    }
    redisErrorHandler(redisClient);
    return redisClient;
}
function redisErrorHandler(redisClient) {

  redisClient.on('connect', function() {
    console.log('========= Connected to redis =========');
  });
  redisClient.on('error', function(err) {
    console.error('========= Redis error =========', err);
  });
  redisClient.on('end', function() {
    console.log('========= Redis connection closed =========');
  });
}

function Cache(redisClient, redisDbIndex){
    this.redisClient = redisClient;
    this.redisDbIndex = redisDbIndex || 0;
    if(this.redisDbIndex != 0) {
        this.redisClient.select(redisDbIndex, function(err, res) {
            if(err) {
                console.error("Error selecting redisDbIndex", redisDbIndex, err);
            } else {
                console.log("Success selecting redisDbIndex", redisDbIndex, res);
            }
        });
    }
}

Cache.prototype.getCacheData = async function(cacheKey){
    console.log("getCacheData key " , cacheKey);
    return await new Promise((resolve, reject) => {
        this.redisClient.get(cacheKey, function(err, results){
            if(err){
                console.error("getCacheData error", err);
                reject(err);
            } else if(!results){
                console.log("getCacheData not found");
                resolve(null);
            } else {
                console.log("getCacheData success");
                if(results && typeof results === 'string') {
                results = JSON.parse(results);
                }
                resolve(results);
            }
        });
    });
}

Cache.prototype.setCacheData = async function(cacheKey, results, expiry){
    console.log("setCacheData", cacheKey, results, expiry);
    const data = results?.[0]?.collections?.dataValues;
    return await new Promise((resolve, reject) => {
        if(!data) {
            resolve("No data to cache");
            return;
        }
        if(expiry){
            this.redisClient.set(cacheKey, JSON.stringify(data), 'EX', expiry, (err, res) => {
                if(err){
                    console.error("setCacheData error", err);
                    reject(err);
                } else {
                    console.log("setCacheData success", res);
                    resolve(res);
                }
            });
        } else {
            this.redisClient.set(cacheKey, JSON.stringify(data), (err, res) => {
                if(err){
                    console.error("setCacheData error", err);
                    reject(err);
                } else {
                    console.log("setCacheData success", res);
                    resolve(res);
                }
            });
        }
    });
}

Cache.prototype.clearCacheData = function(cacheKey){
    console.log("clearCacheData", cacheKey);
    this.redisClient.del(cacheKey, function(err, clear) {
        if(err){
            console.error("clearCacheData error", err);
        } else {
            console.log("clearCacheData success", clear);
        }
    });
}

Cache.prototype.flush = function() {
    console.log("Flushing Redis !", this.redisDbIndex);
    this.redisClient.flushdb( function (err, succeeded) {
        if (err) {
            console.error("Error flushing redis", err);
        } else {
            console.log("Flushed redis", succeeded);
        }
    });
}

const cache = new Cache(createRedisClient());
const collectionCacheObjKey = 'COLLECTION';

function getUserCacheKey(collectionId, userId) {
    return collectionCacheObjKey + ":" + userId + ":" + collectionId;
}

async function setCacheData(collectionId, userId, results) {
    const cacheKey = getUserCacheKey(collectionId, userId);
    return await cache.setCacheData(cacheKey, results);
}
async function getCacheData(collectionId, userId) {
    const cacheKey = getUserCacheKey(collectionId, userId);
    return await cache.getCacheData(cacheKey);
}

module.exports = {
    cache,
    getUserCacheKey,
    setCacheData,
    getCacheData
}