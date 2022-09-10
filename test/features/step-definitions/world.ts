import { setWorldConstructor } from "@wdio/cucumber-framework";
import chai from 'chai'

class CustomWorld {
    appid: String;
    testNo: Number;
    constructor () {
        this.appid = '',
       this.testNo = 1
    }
}

setWorldConstructor(CustomWorld);