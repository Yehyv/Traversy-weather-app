require('dotenv').config();
const express = require('express');
const router = express.Router();
const needle = require('needle');
const url = require('url');
const apicache = require('apicache');

//ENV VARs

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;



//init cache
let cache = apicache.middleware
//routes
router.get('/api', cache('2 minutes'), async (req,res)=>{
    try {
        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE,
            ...url.parse(req.url,true).query
        });
        const apiRes = await needle('get',`${API_BASE_URL}?${params}`);
        const data = apiRes.body;
        res.status(200).json(data);
    } catch (error) {
        res.status(401).json("error occured");
    }
   
})



module.exports = router