# Food Expiry Label Generator (offline PWA)

A self-contained, mobile-first food label app. No account, external API, or backend is required after installation. Presets, settings, and print profiles are stored in this browser's IndexedDB.

## What is included

- Food presets with separately configured calendar-day or manually entered expiry rules and an explicit safety-procedure approval check.
- Local UK date calculations that handle month-ends, leap years, and daylight-saving calendar dates.
- Adjustable printer profiles; default is **thermal, 50 × 30 mm**, one label per printed page. Additional 40 × 30, 60 × 40, 70 × 50, and 100 × 50 mm options and custom dimensions.
- **A4 and US Letter sheet profiles**, with columns, margins and spacing; a starter A4 profile is included.
- Automatic font shrinking, text wrapping, and a warning if optional storage text must be hidden. Essential food name, start date, and expiry date are never silently removed. Labels that cannot fit are blocked.
- Browser print dialog, calibration print, adjustable label quantity, offline service worker, JSON backup/restore, and local settings.

## Run locally for development

Extract the ZIP and run a local web server in the `food-label-app` folder:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser. Opening `index.html` as a file is **not** a supported way to test service-worker/offline functionality.

## Install on iPhone

1. Upload the **contents of `food-label-app`** to a static **HTTPS** web host. There is no required server runtime or database. Keep all files in the same folder.
2. Visit the site in Safari on your iPhone with internet access.
3. Share → **Add to Home Screen** → Add.
4. Open the app and check **Settings → Offline & printing**. Once caching finishes, test opening it in airplane mode.
5. In **Food presets**, enter approved shelf-life rules; then select your label dimensions in **Printers & labels**.

For some iPhone versions and printer drivers, custom paper sizes are not respected by the system print dialog. Thermal printing from iPhone may require an AirPrint-compatible printer or the manufacturer's app. **The app does not directly speak Bluetooth/USB printer protocols**, automatically detect installed rolls, or guarantee compatibility with every printer.

## Calibrate printer output

- In **Printers & labels**, choose or create a profile matching the physical roll.
- **Save changes**, then **Print calibration label**. Print at 100% / actual size when the driver supports it.
- Measure the result. Turn off “Fit to page” or automatic scaling, if available; confirm roll size and orientation in the printer driver.
- iPhone printing may need vendor-specific settings. Validate on the final printer before real use.

## Storage and food safety

Backup JSON regularly under Settings. Deleting Safari website data or the installed app may remove stored presets. The app is a date calculator, **not food-safety advice**. The person configuring each food must verify dates and wording against their organisation's approved procedure.

## Implementation notes

Only vanilla HTML, CSS and JavaScript. IndexedDB `food-labels-v1` stores state; versioned cache `food-labels-offline-v3` provides offline app assets. The application includes migration of the earlier single-template A4 prototype into an extra profile. Calendar date arithmetic lives in `date-engine.js` and is separate from printing code.

The browser's **Print / Save as PDF** facility can be used where supported; there is no separate PDF engine in this version. Profile print CSS uses `@page size`, which some browsers or printer drivers override.
