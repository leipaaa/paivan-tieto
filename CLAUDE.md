# Päivän tieto

Suomenkielinen (ja englanninkielinen) nettisivu, joka hakee päivittäin vaihtuvaa sisältöä
Wikimedian avoimista rajapinnoista. Koko sivu on yhdessä tiedostossa `index.html`:
HTML, CSS ja JavaScript ilman käännösvaihetta. Sivu avataan suoraan selaimessa.
Ainoat kirjastot ovat animaatiot (GSAP, Lenis) CDN:stä, ks. kohta Animaatiot.

## Työkieli

Kaikki viestintä käyttäjän kanssa on suomeksi: vastaukset, kysymykset, yhteenvedot ja commit-viestit.
Koodin tunnisteet ja kommentit ovat jo suomeksi; sivun käyttöliittymätekstit tehdään edelleen molemmille kielille (fi/en).

## Julkaisu

Repo `leipaaa/paivan-tieto` on julkinen ja julkaistaan GitHub Pagesilla `main`-haaran juuresta:
https://leipaaa.github.io/paivan-tieto/ (ja `uusi-ulkoasu.html`). Jokainen push `main`-haaraan päivittää sivun
noin minuutissa. Älä lisää repoon mitään salaista.

## Ulkoasuversiot

- `index.html` – **pääversio** (julkinen pääosoite). "Editorial Grid / Magazine" -ulkoasu: Libre Bodoni + Public Sans,
  sanomalehtimäinen, viivat erottavat osiot. Väreinä lämmin paperi, metsänvihreä muste (`--ink:#1b3326`) ja
  puolukanpunainen korostus (`--accent:#a3264d`, tummassa `#f28fb0`). Ei sinistä eikä musta-oranssia,
  jotta se erottuu alkuperäisestä ulkoasusta.
- `uusi-ulkoasu.html` – alkuperäinen ulkoasu (Bricolage Grotesque + Source Serif 4, pyöristetyt kortit).
  Nimi on historiallinen: tiedostot vaihdettiin päittäin, jotta lehtiulkoasu on pääosoitteessa.

HTML ja JavaScript ovat samat, ja ne eroavat vain `<style>`-lohkon ja fonttien osalta, joten **JS- ja HTML-muutokset
tehdään molempiin tiedostoihin**. Luokkanimet ja CSS-muuttujat (`--tahti`, `--viiva` luetaan JS:stä) pidetään samoina.
Molemmat versiot jakavat localStorage-asetukset.

## Animaatiot (molemmissa versioissa)

GSAP 3.13 (+ ScrollTrigger, SplitText) ja Lenis 1.3 ladataan jsDelivr-CDN:stä `defer`-attribuutilla, ja tiedoston
lopussa on oma `<script>`: otsikon kirjainanimaatio, sisällön esiinliukuminen `piirraSisalto`-kääreellä, ruudukon
ruudut vierittäessä ja pehmeä vieritys. React Bitsin tehosteet on toteutettu tavallisella GSAP:lla, koska sivu ei
käytä Reactia. Animaatiot ohitetaan, jos `prefers-reduced-motion` on päällä tai CDN ei lataudu.
Animaatioskripti on molemmissa tiedostoissa sama.

## Lisäsivut ja tiedostot

- `tietosuoja.html`, `kayttoehdot.html`, `404.html`: kaksikieliset (fi/en `data-kieli`-osiot), yhteinen tyyli
  `sivut.css` ja kieli/teema `sivut.js` (lukee samat localStorage-avaimet). `404.html` käyttää absoluuttisia
  polkuja `/paivan-tieto/…`, koska GitHub Pages näyttää sen mistä tahansa puuttuvasta osoitteesta.
  Päivitä tietosuojaselosteen palvelulista, jos sivu alkaa käyttää uutta ulkoista palvelua.
- `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `og-image.png` (1200×630, some-esikatselu).
  PNG:t on piirretty Chromen headless-tilassa SVG:stä/HTML:stä.
- `sitemap.xml`, `robots.txt`. Huom: hakukoneet lukevat robots.txt:n vain verkkotunnuksen juuresta
  (`leipaaa.github.io/robots.txt`), joten projektisivun robots.txt on lähinnä sitemap-viittaus.
- Metatiedot (description, canonical, Open Graph, Twitter) ovat molempien pääsivujen `<head>`issä;
  `uusi-ulkoasu.html`:n canonical osoittaa pääsivuun.

## Yksityisyys, suostumus ja analytiikka

Sivu ei aseta evästeitä. Suostumusbanneri (`suostumus`-moduuli) kysyy luvan kävijätilastoille, ja valinta
tallennetaan avaimeen `suostumus` (`kaikki` | `valttamattomat`). Alatunnisteen Evästeasetukset-linkki avaa
bannerin uudelleen. Analytiikka on GoatCounter (ilman evästeitä), ja se ladataan vain suostumuksella ja vain, jos
vakio `ANALYTIIKKA` (GoatCounter-tilin koodi) ei ole tyhjä. Tili luodaan osoitteessa goatcounter.com.

## Aiheet ja lähteet

| Aihe | Suomeksi | Englanniksi |
|---|---|---|
| Päivän sana | fi.wiktionary – luokat "Suomen kielen kaksitavuiset sanat" ym. | en.wiktionary – sanat, jotka käyttävät mallinetta `Template:was wotd` |
| Päivän auto | en.wikipedia `Category:Cars introduced in VUOSI` + suomenkielinen artikkeli kielilinkistä | sama ilman suomea |
| Päivän lentokone | en.wikipedia `Category:Aircraft first flown in VUOSI` | sama |
| Päivän pääkaupunki / kaupunki | Wikidata SPARQL (lista) + wbgetentities (luvut) + fi.wikipedia | sama, en.wikipedia |
| Yleistieto | fi.wikipedia `/api/rest_v1/page/random/summary` | en.wikipedia |
| Päivän vitsi | fi.wikibooks "Vitsikirja/…" ja "Wikijunior Vitsikirja/…" -sivut | icanhazdadjoke.com |
| Päivän mietelause | fi.wikiquote "Malline:Viikon sitaatti/…" + ajattelijoiden sivut | en.wikiquote "Wikiquote:Quote of the day/PÄIVÄ" |
| Kartta | OpenStreetMap upotus (`export/embed.html`) | sama |
| Kissagif | cataas.com (oletus); Giphy vain, jos käyttäjä syöttää oman avaimen ⚙-painikkeesta | sama |
| Sää | Open-Meteo forecast + geocoding (ei avainta), oletus Helsinki | sama |

Kaikki Wikimedia-kutsut käyttävät `origin=*`, jotta CORS toimii selaimesta.

## Koodin rakenne (index.html, `<script>`)

Tunnisteet ja kommentit ovat suomeksi. Pääosat järjestyksessä:

- **Perusapurit**: `$`, `el`, `link`, `nappi`, `store` (localStorage try/catch-kääreellä), `getJSON` (aikakatkaisu)
- **Kieli**: `KIELI`, `TEKSTIT.fi/en`, `T(avain)`, `NIMET_K`, `LYHYET_K`. Uudet käyttöliittymätekstit lisätään molempiin kieliin.
- **siistiWiki()**: muuntaa wikitekstin luettavaksi (mallineet, linkit, viitteet pois)
- **Muistit**: `nahty` (jo näytetyt, kielikohtaiset), `paiva` (päivän valinta, vaihtuu päivämäärän mukaan), `suosikit`
- **Kuvat**: `artikkelinKuvat`, `kuvaRestista`, `yhdistaKuvat`, `hyvaKuva` (suodattaa logot, kartat, liput)
- **Haut**: `haeSana`, `haeAuto`/`haeLentokone` (`haeKulkuneuvo` + `LAJIT`), `haePaakaupunki`, `haeTieto`, `haeVitsi`, `haeMietelause` → koottu objektiin `HAKU`
- **Piirtäminen**: `teeGalleria`, `teeKartta`, `piirraSisalto` + `PIIRRA`-funktiot (parametri `tiivis` = ruudukon pieni ruutu)
- **Näkymät**: `tila.nakyma` = `aihe` | `visa` | `suosikit` | `ruudukko`; `valitseAihe`, `naytaToinen`, `naytaRuudukko`, `naytaSuosikit`, `uusiVisa`
- **tahtitaivas**: canvas-tausta, tähdet yhdistyvät viivoilla kursoriin
- **kissa**: kissagif-ikkuna, koko säädettävä (−/+ ja vetokahva), koko tallennetaan
- **saa**: sääpaneeli; kaupunki vaihdetaan 📍-lomakkeella (tarkistus: 2–80 merkkiä, kirjaimet/välilyönnit/yhdysmerkit, virhe kentän alla); ≥1280 px oma palsta vasemmalla/oikealla (`.wrap.saa-vasen/.saa-oikea`), kapeammalla vaakarivi otsikon alla. Päivittyy 30 min välein.
- **Päivän vaihtuminen**: minuutin välein tarkistetaan päivämäärä; uusi päivä → uudet päivän valinnat ilman sivun päivitystä.

## Periaate

Sivu toimii kuin staattinen näyttö: sisältö latautuu ja päivittyy itsestään järkevillä oletuksilla.
Painikkeet (Näytä toinen, Päivitä kaikki, asetukset) ovat lisävalintoja, eivät edellytys.

Uusi aihe lisätään näin: lisää avain `AIHEET`-listaan, nimet `NIMET_K`/`LYHYET_K`-objekteihin,
hakufunktio `HAKU`-objektiin ja piirtofunktio `PIIRRA`-objektiin. Hakufunktio palauttaa olion
`{tyyppi, kieli, otsikko, teksti?, kuvat?, lahde:{nimi,url}}`.

## localStorage-avaimet

`kieli`, `teema`, `nakyma`, `valittu-aihe`, `ruudukko-aiheet`, `pk-tila`, `suosikit`, `visa-pisteet`,
`paiva-<aihe>-<kieli>`, `nahty-<aihe>-<kieli>`, `kaupungit-<tila>`, `wotd-lista`,
`kissa-koko`, `kissa-piilossa`, `giphy-avain`, `saa-kaupunki`, `saa-puoli`, `suostumus`.

## Opittuja asioita (älä riko näitä)

- Wikimedian pikkukuvat toimivat vain vakioleveyksillä (esim. 330, 500, 960). 900 px epäonnistuu → käytä 960.
- fi.wiktionaryn `list=random` palauttaa enimmäkseen muunkielisiä sanoja → käytä suomen sanojen luokkia.
- Wikisanakirjan otsikot ovat muodossa `==Suomi==` (välilyönnit vaihtelevat).
- Satunnaiset Wikisitaattien sivut sisältävät rivoa sisältöä → käytetään vain viikon sitaatteja ja valittujen ajattelijoiden sivuja. Sanoille, vitseille ja mietelauseille on suodattimet `SOPIMATON*`.
- Wikidata SPARQL on hidas, jos kyselyssä on DISTINCT tai monta tyyppiä. Kaupunkilistat välimuistitetaan selaimeen 30 päiväksi.
- Ei salaisuuksia frontendissä: sivu on staattinen, joten kaikki koodissa oleva on julkista. Giphy-avain poistettiin
  koodista; vanha avain on yhä git-historiassa, joten se on mitätöitävä Giphyn hallintapaneelissa.
- Giphy ei toimi ilman API-avainta (401). Kissa vaihtuu 60 s välein, jotta tuntirajat eivät täyty.
- Kissagifit ovat 1–2 Mt, joten kissa käynnistyy vasta `load`-tapahtuman jälkeen, ettei se hidasta pääsisältöä.
- Yksi selkeä pääpainike näkymää kohden: "Näytä toinen" / "Päivitä kaikki". Muut ovat toissijaisia (`.inline.toissijainen`).
- Kontrasti: tekstin ja taustan suhde vähintään 4,5:1 molemmissa teemoissa ja molemmissa ulkoasuissa.

## Testaus

Ei automaattisia testejä. Avaa `index.html` selaimessa ja tarkista kehittäjätyökalujen konsoli.
Tarkista aina molemmat kielet, vaalea ja tumma teema, ruudukko 1–4 aiheella ja puhelinleveys (375 px).
Node ei ole tällä koneella asennettuna; syntaksi tarkistetaan avaamalla sivu selaimessa ja katsomalla konsoli.
Paikallinen palvelin: kopioi tiedostot kansioon `…/paivan-tieto/` ja aja `python3 -m http.server`, jotta 404-sivun polut toimivat.
Syntaksin voi tarkistaa Nodella:

```
node -e "const s=require('fs').readFileSync('index.html','utf8');[...s.matchAll(/<script>([\s\S]*?)<\/script>/g)].forEach(m=>new Function(m[1]));console.log('ok')"
```
