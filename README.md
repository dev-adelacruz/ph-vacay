# 🌴 PH Vacay 2026

**Master your 2026 Philippine holiday calendar.** Identify long weekends, find bridge opportunities, and maximize every leave credit you have.

Live at → [ph-vacay.vercel.app](https://ph-vacay.vercel.app)

---

## What It Does

PH Vacay analyzes all 2026 Philippine public holidays and tells you exactly how to get the most out of them — whether you're planning a beach escape or hunting for 200% paydays.

### Two Modes

| Mode | For |
|---|---|
| 🌴 **Vacationer** | Maximize days off with minimal leave credits spent |
| 💸 **Hustler** | Identify Special/Regular holidays where working earns 130–200% pay |

### Holiday Classification

The app automatically categorizes each holiday by how it falls in the week:

- **Long Weekend (No-Brainer)** — Holiday falls on a Monday or Friday. Free 3-day break, no leave required.
- **Bridge Opportunity (Hackable)** — Holiday falls on a Tuesday or Thursday. Take 1 leave day to unlock 4 consecutive days off.
- **Standard** — Falls mid-week. Still a day off, just less leverage.

### Features

- **2026 Roadmap** — All holidays grouped by month in a clean list view, with bridge recommendations
- **Calendar Grid** — Visual month-by-month calendar with holiday highlights and escape sequence shading
- **Vacation Whisperer** — Curated Philippine travel destination suggestions per month (Sagada in Jan, Boracay in April, Batanes in June...)
- **OOO Generator** — Draft your out-of-office message in Chill, Pro, or Ghost tone with one click
- **Plan & Bookmark** — Save holidays you're planning to take; your plan persists across sessions via `localStorage`
- **Share Your Plan** — Copy a formatted summary of your planned holiday sequences to share with friends
- **History Toggle** — Show or hide holidays that have already passed
- **Countdown** — Live "X days to [next holiday]" ticker in the header

---

## Tech Stack

| Tool | Version |
|---|---|
| React | 19 |
| Vite | 7 |
| Tailwind CSS | 4 |
| Lucide React | 0.562 |

No backend. No database. Pure client-side SPA.

---

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

Requires Node 18+.

---

## Holiday Data

All holidays are declared via official Philippine proclamations. The list is maintained in `src/App.jsx` under `HOLIDAYS_2026`.

| Date | Holiday | Type |
|---|---|---|
| Jan 1 | New Year's Day | Regular |
| Feb 17 | Chinese New Year | Special |
| Feb 25 | EDSA Revolution Anniversary | Special |
| Mar 20 | Eid'l Fitr *(Proc. No. 1189)* | Regular |
| Apr 2 | Maundy Thursday | Regular |
| Apr 3 | Good Friday | Regular |
| Apr 4 | Black Saturday | Special |
| Apr 9 | Araw ng Kagitingan | Regular |
| May 1 | Labor Day | Regular |
| Jun 12 | Independence Day | Regular |
| Aug 21 | Ninoy Aquino Day | Special |
| Aug 31 | National Heroes Day | Regular |
| Nov 1 | All Saints' Day | Special |
| Nov 2 | All Souls' Day | Special |
| Nov 30 | Bonifacio Day | Regular |
| Dec 8 | Feast of the Immaculate Conception | Special |
| Dec 24 | Christmas Eve | Special |
| Dec 25 | Christmas Day | Regular |
| Dec 30 | Rizal Day | Regular |
| Dec 31 | Last Day of the Year | Special |

---

## Contributing

This project is open for collaboration! If you'd like to contribute:

- **New proclamations** — Update `HOLIDAYS_2026` in `src/App.jsx` when new holiday proclamations are released
- **Feature ideas** — Open an issue or submit a PR
- **Bug reports** — Open an issue with reproduction steps

PRs are welcome. Keep it simple and focused — this is intentionally a lightweight, zero-dependency frontend.

---

## License

MIT
