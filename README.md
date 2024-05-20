
# hive-web-app: Aplikace pro statistické zpracocování údajů z elektronické váhy včelích úlů

> Doporučuji podívat se na nasazenou verzi, která je dostupná z adresy [https://hive-web-app.vercel.app/](https://hive-web-app.vercel.app/). Přihlášení je možné pomocí jakéhokoliv Google účtu z domény `vutbr.cz`.

## Nastavení služeb

Aplikace závisí na externích službách, proto je její instalace poměrně náročná.

Služby:
- Google Drive API
- Gloogle Cloud
- [Visual Crossing Weather API](https://www.visualcrossing.com/)
- Redis

Pro každou z těchto služeb je nutné nastavit klíče a jiná tajemství do proměnných prostředí, viz návod níže.

### Google Drive API

| Proměnné prostředí | Popis |
| --- | --- |
| `GOOGLE_PRIVATE_KEY` | privátní klíč vygenerovaný pro projekt |
| `GOOGLE_CLIENT_EMAIL` | email účtu s přístupem k logu z vah |

Postup:
1. Založte nový Google Cloud projekt.
2. Založte pod projektem nový `Service account`.
3. Název (email) účtu uložte do proměnné `GOOGLE_CLIENT_EMAIL`.
4. Servisnímu účtu vygenerujte API klíč a uložte ho do proměnné `GOOGLE_PRIVATE_KEY`.
5. Lokalizujte soubor s logem z vah na Google Drive. Nasdílejte přístup k tomuto souboru s uživatelem `GOOGLE_CLIENT_EMAIL`.

### Autentizace OAuth

| Proměnné prostředí | Popis |
| --- | --- |
| `NEXTAUTH_SECRET` | Náhodné tajemství |
| `NEXTAUTH_URL` | URL aplikace |
| `GG_ID` | ID klienta OAuth |
| `GG_SECRET` | Tajemství klienta OAuth |

Postup:
1. Vygenerujte náhodné tajemství (např. příkazem `openssl rand -base64 32`) a uložte ho do proměnné prostředí `NEXTAUTH_SECRET`.
2. Nastavte adresu aplikace (např. `http://localhost:3000`) do proměnné prostředí `NEXTAUTH_URL`.
Google Cloud, skece OAuth:
3. Povolte autentizaci OAuth pro doménu `NEXTAUTH_URL`.
4. Povolte právo (scope) `.../auth/drive.appdata` pro čtení a zápis do souborů aplikace (to je nutné pro zápis poznámek).
Google Cloud, skece Credentials:
5. Vytvořte nový OAuth client ID.
6. Nastavte adresu aplikace (např. `http://localhost:3000`) jako autorizovanou.
7. Autorizujte adresu `.../api/auth/callback/google` (např. `http://localhost:3000/api/auth/callback/google`) k přesměrování z Google OAuth.


### Databáze Redis

| Proměnné prostředí | Popis |
| --- | --- |
| `KV_URL` | Adresa databáze |

Postup:
1. Založte databázi (redis 7.2.4) a zpřístupněte ji na určité adrese (např. `redis://localhost:6379`)
2. Nastavte adresu do proměnné prostředí `KV_URL`.

### Visual Crossing Weather API

| Proměnné prostředí | Popis |
| --- | --- |
| `WEATHER_API_KEY` | Klč pro API |

> API má ve volné verzi omezený počet dotazů za den.

Postup:
1. Založte si účet na [Visual Crossing Weather API](https://www.visualcrossing.com/).
2. Na stránce [nastavení](https://www.visualcrossing.com/account) získejte klíč pro API a zkopírujte ho do proměnné prostředí `WEATHER_API_KEY`.

## Instalace a spuštění

Před instalací proveďte nastavení služeb a proměnných prostředí. Lze také použít soubor `.env`.
K instalaci a spuštění je vyžadováno internetové připojení a následující software:
- `Node.js v20.0.0`
- `npm v9.8.1`

```bash
npm install
npm run build
npm run start
```

## Příklad souboru `.env`

```
GG_ID="....apps.googleusercontent.com"
GG_SECRET="hash"

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="hash"

GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nhash\n-----END PRIVATE KEY-----\n"
GOOGLE_CLIENT_EMAIL="...@projectname.iam.gserviceaccount.com"

KV_URL="redis://localhost:6379"

WEATHER_API_KEY="hash"

KV_USE_TLS='false'
```