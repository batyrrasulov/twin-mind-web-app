# TwinMind Web App - Full Stack Interview Assignment

It’s a deceptively minimal full-stack web app that demonstrates core meeting assistant functionality — with just enough logic to feel one click away from production. Built fast, built smart, built to **feel like the real thing** even if some wires are faked behind the walls. Because sometimes it’s not about *what* it is, but *how you show it*.

---

## 🚀 Live Demo

Check it out here: [twin-mind-web-app.vercel.app](https://twin-mind-web-app.vercel.app)

---

## 🧩 Features

**1. Google Sign-In (OAuth)**
- Uses Firebase for real user authentication.
- Signs in with your Google account and welcomes you like an old friend.

**2. Calendar Integration (Simulated)**
- Displays mocked upcoming calendar events — designed to feel real.
- Could be easily replaced with live Google Calendar API calls.

**3. Real-Time Meeting Transcription (Simulated)**
- UI for recording meetings via mic.
- Simulates transcription via mock chunks or placeholder API.
- Designed to integrate OpenAI Whisper or Gemini 2.0 Flash.

**4. Transcript Chat (Streaming)**
- After transcription, users can ask questions.
- Chat interface simulates streaming responses — OpenAI-style.

**5. Summary Generation**
- After the meeting, a beautiful bullet-point summary appears.
- Clear, clean, and just enough to feel magic.

**6. Backend (API Layer)**
- Built to manage sessions, simulate transcription, store and retrieve data.
- Ready to swap mock endpoints for live ASR (audio-to-text) engines.

**7. Error Handling**
- Frontend handles failures gracefully (auth, data loading, etc.).
- Designed with resiliency in mind.

---

## 🛠️ Tech Stack

- **Frontend**: React (Next.js), Tailwind CSS, TypeScript
- **Backend**: Node.js (API Routes in Next.js)
- **Auth**: Firebase (Google OAuth)
- **Hosting**: Vercel

---

## 🧪 Testing

- Currently supports mocked data and minimal logic paths.
- Jest test cases for auth, calendar fetch, transcript storage.
- Load testing concept prepared — but unnecessary for MVP goal.

---

## 🧠 Vision

This project is an MVP not just in architecture but in *thinking*. It shows:
- How to simulate functionality under time/resource pressure.
- How to balance presentation and technical depth.
- How to make something *feel* real, useful, and launch-ready — even when it’s not fully wrapped up yet.

---

## 📸 Screenshots

_(Add screenshots here if you have them — UI is part of the pitch!)_

---

## 💡 Notes

- This project was developed as a full-stack interview challenge.
- Completed in a somewhat tight timeframe, focusing on minimalism, clarity, and illusion of completeness.
- The intent was to present not just a product, but a *mindset*.

Sometimes we don’t *need* to know everything. We just need to *build it* anyway.

---

## 🧬 Future Enhancements

- Live integration with Google Calendar + Gemini/Whisper APIs.
- Real-time audio transcription in 30-second chunks.
- Database storage of transcripts per user.
- Mobile-first polish and PWA capabilities.

---

## 🧙 Author

**Batyr Rasulov** — [GitHub](https://github.com/batyrrasulov) | Built with fun, love, speed, and a bit of illusion.

---
