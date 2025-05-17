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

## 📸 Screenshots
<img width="1034" alt="Screenshot 2025-05-16 at 23 37 32" src="https://github.com/user-attachments/assets/2b61355c-b955-4c05-a770-3f6f685d0b7a" />
<img width="1319" alt="Screenshot 2025-05-16 at 23 38 14" src="https://github.com/user-attachments/assets/d583edbe-29f7-444a-84b1-a056a0db7f15" />
<img width="1025" alt="Screenshot 2025-05-16 at 23 40 40" src="https://github.com/user-attachments/assets/e58fb412-751f-4945-999e-ff4519e7cc53" />
<img width="1043" alt="Screenshot 2025-05-16 at 23 38 50" src="https://github.com/user-attachments/assets/5823cd17-32cc-4a8b-a56e-513411bdfebc" />
<img width="1025" alt="Screenshot 2025-05-16 at 23 40 40" src="https://github.com/user-attachments/assets/4aa2671c-8639-4cc0-a82c-931f0036b001" />
<img width="1079" alt="Screenshot 2025-05-16 at 23 41 42" src="https://github.com/user-attachments/assets/4ae9a4c3-6e7c-4ba1-9a15-dca1a0a7d966" />
<img width="1063" alt="Screenshot 2025-05-16 at 23 42 18" src="https://github.com/user-attachments/assets/e1b197a7-719f-46ff-8a55-19ef6b65a03d" />
<img width="1074" alt="Screenshot 2025-05-16 at 23 42 38" src="https://github.com/user-attachments/assets/6c4e21bf-35d8-4add-bd57-88ec03a7fd77" />
<img width="1035" alt="Screenshot 2025-05-16 at 23 43 12" src="https://github.com/user-attachments/assets/e15d2b86-6934-4d96-bcb4-95e716726f68" />
<img width="1071" alt="Screenshot 2025-05-16 at 23 43 51" src="https://github.com/user-attachments/assets/02a3c06a-d595-4091-b42a-5aebf31e4abc" />
<img width="1062" alt="Screenshot 2025-05-16 at 23 44 39" src="https://github.com/user-attachments/assets/53005ea9-4991-49c1-8e92-9287e428acab" />
<img width="1064" alt="Screenshot 2025-05-16 at 23 45 00" src="https://github.com/user-attachments/assets/21f4e04c-991f-443b-93ee-c42d6cc9baa5" />
<img width="927" alt="Screenshot 2025-05-16 at 23 45 37" src="https://github.com/user-attachments/assets/59241f6e-704f-4725-bbbb-ba6578de97a4" />
<img width="911" alt="Screenshot 2025-05-16 at 23 46 07" src="https://github.com/user-attachments/assets/f8979054-8fa1-4241-9f4e-0b0e888d0648" />
<img width="1057" alt="Screenshot 2025-05-16 at 23 47 13" src="https://github.com/user-attachments/assets/2f5063f1-1500-4758-8d63-613c2f67ec84" />

---
