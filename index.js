const puppeteer = require('puppeteer')

function delay(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}

(async() => {
    const url = "https://www.instagram.com"

    const user = "gabrielribeiro7863"
    const password = "programadorx"
    const profile = 'cristiano'
    const followers = `[href="/${profile}/followers/"]`

    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()

    async function keys(key, times, interval = 100){
        for(let i = 0; i < times; i++){
            await page.keyboard.press(key)
            delay(interval)
        }
    }

    await page.goto(url)
    await delay(8000)

    await page.type('[name="username"]', user)
    await delay(1000)

    await page.type('input[name="password"]', password)
    await delay(1000)

    await keys('Enter', 1)
    await delay(8000)

    await page.type('[placeholder="Pesquisar"]', profile)
    await delay(2000)

    await keys('Enter', 2, interval = 500)
    await delay(4000)

    try{
        await page.click(followers)
    }
    catch{
        console.log("Você deve ter digitado o @ do perfil errado. Tente novamente.")
        await browser.close()
    }

    await browser.close()
})()