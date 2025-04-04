import puppeteer from "puppeteer";
import dns from "dns";
import { URL } from "url";
import axios from "axios";
import whois from "whois-json";

// func to analyze the website:

export const analyzeWebsite = async (url) => {
    let browser;

    try {
        browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });

        //extract PAGE HTML :
        const pageContent = await page.content();

        //extract metadata of page:
        const metaTags = await page.evaluate(() => {
            let metas = {};
            document.querySelectorAll("meta").forEach((meta) => {
                if (meta.name) metas[meta.name] = meta.content;
            });
            return metas;
        });


        // check domain age of website using (WHOIS - lookup):
        const domainInfo = await whois(new URL(url).hostname);
        const domainAge = domainInfo.creationDate ? new Date(domainInfo.creationDate) : "Unknown"

        // check if site has ssl certificate(starts with : https://)
        const has_SSL = url.startsWith("https://");

        // get ip address :
        const ipAdress = await new Promise((resolve) => {
            dns.lookup(new URL(url).hostname, (err, address) => {
                resolve(address || "Unknown");
            });
        });


        // check JS for any kind of malicious code:
        const riskyJSfunctions = ["eval(", "document.write(", "setTimeout(", "setInterval(", "Function("];
        const isMaliciousJS = riskyJSfunctions.some((func) => pageContent.includes(func));

        //final report:
        return {
            url,
            domainAge,
            has_SSL,
            ipAdress,
            metaTags,
            isMaliciousJS
        }
    } catch (error) {
        console.error("Error analyzing website:", error.message);
        return { error: "Failed to analyze website" };
    } finally {
        if (browser) await browser.close();
    }

}