import { setWorldConstructor } from "@wdio/cucumber-framework";
import chai from 'chai'

class CustomWorld {
    constructor () {

    }
}

setWorldConstructor(CustomWorld);