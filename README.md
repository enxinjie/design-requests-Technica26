# GraphixHub

Design Request and Asset Timeline Manager for 2026 Technica Fellowship.

Team: Zoey, Mitali, Idiakosa, and Shagun.

## Local setup
Only need to do npm install once
```bash
npm install
npm run dev
```

Check if there are issues with `npm run build` and `npm run lint`

## Project structure

- `src/pages/` contains components representing pages for routing 
- `src/components/` contains reusable pieces used to make those pages
- `src/types/` includes types, interfaces for this project
- `src/data/` contains temporary mock data before we add Firestore functionality later on.
- `src/App.tsx` is where the first route definitions will be added.

## Planned routes

| URL | Purpose |
| --- | --- |
| `/login` | Existing users sign in |
| `/signup` | New users create an account |
| `/dashboard` | Role-specific overview and assigned work |
| `/requests` | List requests the current user may view |
| `/requests/new` | Organizer creates a request |
| `/requests/:requestId` | View one request; `:requestId` is replaced by its ID |