import {config as baseConfig} from '../wdio.conf';

// Import the wdio.conf.ts file and merge into this file with Object.assign method which does the same thing as spread operator in combining two objects together {...obj1, ...obj2}
export const config = Object.assign(baseConfig, {
    // All test env specific key value pairs
    environment: 'TEST',
    sauceDemoURL: 'https://www.saucedemo.com'
})