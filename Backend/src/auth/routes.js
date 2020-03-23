const express = require('express')
const router = express.Router()
const reqType = require('../enum').requestType

const login = require('./login')
const signup = require('./signup')

const Route = () => {
    const routes = [
        {
            method: reqType.POST,
            url:    '/login',
            fn:     login
        },
        {
            method: reqType.POST,
            url:    '/signup',
            fn:     signup
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