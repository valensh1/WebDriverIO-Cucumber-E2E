import { setWorldConstructor } from "@wdio/cucumber-framework";
import chai from 'chai'

class CustomWorld {
    appid: string;
    testNo: number;
    constructor () {
        this.appid = '',
       this.testNo = 1
    }
}

setWorldConstructor(CustomWorld);