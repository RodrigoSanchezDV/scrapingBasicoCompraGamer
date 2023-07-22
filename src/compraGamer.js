import { chromium } from "@playwright/test";
import compraGamerScrap from "../models/compraGamerProducts.js"

import mongoose from "mongoose";
mongoose.connect(
    "mongodb://127.0.0.1:27017/compraGamerScrap",
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
)
.then(() => console.log("Connected to mongoDB"))

const links_products = [
    "https://compragamer.com/?seccion=3&cate=58",
    "https://compragamer.com/?seccion=3&cate=27",
    "https://compragamer.com/?seccion=3&cate=48",
    "https://compragamer.com/?seccion=3&cate=26",
    "https://compragamer.com/?seccion=3&cate=49",
    "https://compragamer.com/?seccion=3&cate=6" ,
    "https://compragamer.com/?seccion=3&cate=62" ,
    "https://compragamer.com/?seccion=3&listado_prod=1-8647&cate=15" ,
    "https://compragamer.com/?seccion=3&listado_prod=1-8647&cate=47" ,
    "https://compragamer.com/?seccion=3&listado_prod=1-8647&cate=19" ,
    "https://compragamer.com/?seccion=3&listado_prod=1-8647&cate=81" ,
    "https://compragamer.com/?seccion=3&listado_prod=1-8647&cate=35",
    "https://compragamer.com/?seccion=3&listado_prod=1-8647&cate=36" ,
    "https://compragamer.com/?seccion=3&listado_prod=1-8647&cate=67" ,
    "https://compragamer.com/?seccion=3&listado_prod=1-8647&cate=7" ,
    "https://compragamer.com/?seccion=3&listado_prod=1-8647&cate=34" ,
    "https://compragamer.com/?seccion=3&listado_prod=1-8647&cate=5" ,
    "https://compragamer.com/?seccion=3&listado_prod=1-8647&cate=8" ,
    "https://compragamer.com/?seccion=3&listado_prod=1-8647&cate=39" ,
    "https://compragamer.com/?seccion=3&listado_prod=1-8647&cate=2" ,
    "https://compragamer.com/?seccion=3&listado_prod=1-8647&cate=13" ,
    "https://compragamer.com/?seccion=3&listado_prod=1-8647&cate=18" ,
    "https://compragamer.com/?seccion=3&listado_prod=1-8647&cate=38" ,
    "https://compragamer.com/?seccion=3&listado_prod=1-8647&cate=65" ,
    "https://compragamer.com/?seccion=3&listado_prod=1-8647&cate=72" ,
    "https://compragamer.com/?seccion=3&listado_prod=1-8647&cate=74" ,
    "https://compragamer.com/?seccion=3&listado_prod=1-8647&cate=78" ,
    "https://compragamer.com/?seccion=3&listado_prod=1-8647&cate=84" ,
    "https://compragamer.com/?seccion=3&listado_prod=1-8647&cate=85" ,
    "https://compragamer.com/?seccion=3&listado_prod=1-8647&cate=66" ,
    "https://compragamer.com/?seccion=3&listado_prod=1-8647&cate=14" ,
    "https://compragamer.com/?seccion=3&listado_prod=1-8647&cate=83" ,
    "https://compragamer.com/?seccion=3&listado_prod=1-8647&cate=31" ,
    "https://compragamer.com/?seccion=3&listado_prod=1-8647&cate=111" ,
    "https://compragamer.com/?seccion=3&listado_prod=1-8647&cate=21" ,
    "https://compragamer.com/?seccion=3&listado_prod=1-8647&cate=42" ,
    "https://compragamer.com/?seccion=3&listado_prod=1-8647&cate=89", 
    "https://compragamer.com/?seccion=3&listado_prod=1-8647&cate=105" ,
    "https://compragamer.com/?seccion=3&listado_prod=1-8647&cate=3", 
    "https://compragamer.com/?seccion=3&listado_prod=1-8647&cate=24"] 

;(async()=>{
    const browser = await chromium.launch({ headless: false })
    for (const link of links_products) {
        const page = await browser.newPage()
        let category = false;
        await page.goto(`${link}`)
        const content = await page.textContent(`[class="mat-chip mat-focus-indicator mat-primary mat-standard-chip mat-chip-with-trailing-icon ng-star-inserted"]`)        
        category = content.replace("  cancel", "")
        await page.waitForTimeout(6000);
        await page.waitForSelector('.card-product',{ timeout: 3000 } );
        const all_products = await page.$$(".card-product")
        console.log(category)
        console.log(all_products.length)
        for await (const product of all_products) {
            const product_title = await product.$(`.theme_nombreProducto`)
            const product_price = await product.$(`.price`) 
            const product_image = await product.$(`[style="display: inline-block; position: relative;"]`)
            let name = await product_title.innerText()
            /* await product_image.screenshot({ path: `./screenshots/${name}.png`})  */
            let img = name + ".png"
            let price = await product_price.innerText()
            await compraGamerScrap.create({
                category,
                name,
                price,
                img,
            })
            console.log(name)
            console.log(price)
        }
        await page.waitForTimeout(180000);
        page.close()
    }
    browser.close()
})();


