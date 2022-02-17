
import * as cheerio from 'cheerio';

export class CheerioProcessor {

    protected process(html: string, config = {}){
        return cheerio.load(html, config);
    }

}
