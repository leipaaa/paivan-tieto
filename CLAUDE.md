# Päivän tieto

Suomenkielinen (ja englanninkielinen) nettisivu, joka hakee päivittäin vaihtuvaa sisältöä
Wikimedian avoimista rajapinnoista. Koko sivu on yhdessä tiedostossa `index.html`:
HTML, CSS ja JavaScript ilman kirjastoja tai käännösvaihetta. Sivu avataan suoraan selaimessa.

## Julkaisu

Repo `leipaaa/paivan-tieto` on julkinen ja julkaistaan GitHub Pagesilla `main`-haaran juuresta:
https://leipaaa.github.io/paivan-tieto/ (ja `uusi-ulkoasu.html`). Jokainen push `main`-haaraan päivittää sivun
noin minuutissa. Älä lisää repoon mitään salaista.

## Ulkoasuversiot

`uusi-ulkoasu.html` on kopio `index.html`:stä, jossa on eri `<style>` ja fontit ("Editorial Grid / Magazine":
Libre Bodoni + Public Sans, sanomalehtimäinen). HTML ja JavaScript ovat samat, joten **JS- ja HTML-muutokset
tehdään molempiin tiedostoihin**. Luokkanimet ja CSS-muuttujat (`--tahti`, `--viiva` luetaan JS:stä) pidetään samoina.
Molemmat versiot jakavat localStorage-asetukset.

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
| Kissagif | Giphy random API (`GIPHY_OLETUS`), varalla cataas.com | sama |
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
- **saa**: sääpaneeli; ≥1280 px oma palsta vasemmalla/oikealla (`.wrap.saa-vasen/.saa-oikea`), kapeammalla vaakarivi otsikon alla. Päivittyy 30 min välein.
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
`kissa-koko`, `kissa-piilossa`, `giphy-avain`, `saa-kaupunki`, `saa-puoli`.

## Opittuja asioita (älä riko näitä)

- Wikimedian pikkukuvat toimivat vain vakioleveyksillä (esim. 330, 500, 960). 900 px epäonnistuu → käytä 960.
- fi.wiktionaryn `list=random` palauttaa enimmäkseen muunkielisiä sanoja → käytä suomen sanojen luokkia.
- Wikisanakirjan otsikot ovat muodossa `==Suomi==` (välilyönnit vaihtelevat).
- Satunnaiset Wikisitaattien sivut sisältävät rivoa sisältöä → käytetään vain viikon sitaatteja ja valittujen ajattelijoiden sivuja. Sanoille, vitseille ja mietelauseille on suodattimet `SOPIMATON*`.
- Wikidata SPARQL on hidas, jos kyselyssä on DISTINCT tai monta tyyppiä. Kaupunkilistat välimuistitetaan selaimeen 30 päiväksi.
- Giphy ei toimi ilman API-avainta (401). Avain on lähdekoodissa vakiona `GIPHY_OLETUS` ja näkyy kaikille sivun katsojille.
- Kissa vaihtuu 60 s välein, jotta Giphyn ilmaisavaimen tuntiraja ei täyty.

## Testaus

Ei automaattisia testejä. Avaa `index.html` selaimessa ja tarkista kehittäjätyökalujen konsoli.
Tarkista aina molemmat kielet, vaalea ja tumma teema, ruudukko 1–4 aiheella ja puhelinleveys (375 px).
Syntaksin voi tarkistaa Nodella:

```
node -e "const s=require('fs').readFileSync('index.html','utf8');[...s.matchAll(/<script>([\s\S]*?)<\/script>/g)].forEach(m=>new Function(m[1]));console.log('ok')"
```
