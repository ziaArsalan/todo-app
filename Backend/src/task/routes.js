const express = require('express')
const router = express.Router()
const reqType = require('../enum').requestType

const isAuthenticated = require('../util/isAuthenticated')
const createTask = require('./createTask')
const getUserTask = require('./getUserTask')

const Route = () => {
    const routes = [
        {
            method: reqType.POST,
            url:    '/',
            auth:   isAuthenticated,
            fn:     createTask
        },
        {
            method: reqType.GET,
            url:    '/',
            auth:   isAuthenticated,
            fn:     getUserTask
        }
    ]

    for (let route of routes){
        const {method, url, auth, fn} = route

        if(auth){
            router[method](url, auth, fn)
        } else {
            router[method](url, fn)
        }
    }

    return router
}

module.exports = Route()