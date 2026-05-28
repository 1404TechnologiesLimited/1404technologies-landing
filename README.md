# 1404 Technologies Landing Page

Marketing and services site for [1404 Technologies](https://www.1404technologies.com) — managed IT, cybersecurity, call centre outsourcing, and enterprise software for UK and U.S. businesses.

[OmniServe](https://www.myomniserve.com) is featured as a 1404 Technologies product.

## Quick start

```bash
npm install
npm run dev
```

## Contact form

Submissions are sent to HubSpot CRM via the [Forms API](https://developers.hubspot.com/docs/api/marketing/forms). The portal ID, form GUID, and region are hardcoded in [src/lib/hubspot.js](src/lib/hubspot.js) — these are public values (the same ones HubSpot puts in the embed snippet).

## Deploy

Hosted on Vercel. Push to `master` to trigger a redeploy. Analytics and Speed Insights are enabled via `@vercel/analytics`.
