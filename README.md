# MediBook — Doctor Consultation App (Basic Version)

A simple two-screen app for browsing doctors and booking a consultation, built with **React** (Vite). It's built as a mobile-first web app, so it runs in any browser but is designed and sized like a phone screen.

## Screens

1. **Doctor List** — shows every doctor's name, specialization, and star rating, pulled from a local JSON file (`src/data/doctors.json`). Tapping **Book** on a card jumps straight to the booking form with that doctor pre-selected.
2. **Book Appointment** — a form for name, doctor, date, and time slot. Submitting shows a confirmation card with a summary of the booking.

## Tech stack

- React 18 + Vite
- [lucide-react](https://lucide.dev/) for icons
- Plain CSS (`src/index.css`) — no UI framework needed

## Project structure

```
doctor-consult-app/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                 # React entry point
    ├── App.jsx                  # Top-level app: screen state + navigation
    ├── index.css                # All styling
    ├── data/
    │   ├── doctors.json         # Mock doctor data (name, specialization, rating, fee)
    │   └── timeSlots.js         # Available appointment time slots
    └── components/
        ├── DoctorList.jsx       # Screen 1
        ├── BookAppointment.jsx  # Screen 2 (form + confirmation)
        └── RatingBadge.jsx      # Small reusable star-rating pill
```

## How to run

**Requirements:** Node.js 18+ installed.

```bash
# 1. Move into the project folder
cd doctor-consult-app

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`) in your browser. For the closest mobile feel, open your browser's dev tools and switch to a mobile device preview, or just narrow the window — the layout is capped at 390px wide like a phone screen.

To build a production bundle: `npm run build` (output goes to `dist/`).

## Notes on design choices

- **Data source:** doctors are loaded from a local JSON file (`doctors.json`) to keep the demo self-contained. Swapping this for a real API later just means replacing the `import doctors from "./data/doctors.json"` line in `App.jsx` with a `fetch()` call.
- **Modularity:** each screen is its own component, and small reusable pieces (like the rating badge) are split out so the code stays easy to extend — e.g. adding a doctor detail screen or real backend later wouldn't require touching unrelated files.
- **Validation:** the booking form checks that all four fields are filled before it will confirm, and shows an inline error message rather than failing silently.
