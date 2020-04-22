# IspFinder (Angular)

Frontend repository for the ISP Finder project.
This project was generated with Angular CLI version 9.0.4.

## Requirements

- Node 8+
- npm

## Setup

1. Install requirements: `npm install --dev`
2. Configure `src/environments/common.ts`, it contains firebase settings and

```yaml
contactAuthor : Email ID shown for reaching the author of the application
computeUrl    : Use for sending form details for processing (like cloud function)
databaseUrl   : Url for fetching content from database. (like realtime database)
```

## Deploy

1. Build: `ng build --prod --base-href https://atb00ker.github.io/angular-isp-finder/`
2. Setup SEO About Page:
    2.1 Copy `dist/isp-finder/index.html` -> `dist/isp-finder/about.html`
    2.2 Change Title of the page from `src/about.html`
3. Deploy: `ngh --dir dist/isp-finder/`
