
# 🎮 College Fun Games - IT Club Challenge

An interactive web-based scavenger hunt game designed for College Sport Week. Players navigate through multiple levels, solving puzzles and finding clues around campus.

## 🌟 Features

- **Google OAuth Authentication** - Secure sign-in with Google accounts
- **Progress Tracking** - Automatic save using Supabase database
- **Multiple Game Levels** - 5 challenging levels with unique puzzles
- **Unlock System** - Location-based clues to unlock next levels
- **Real-time Leaderboard** - Track participant progress
- **Responsive Design** - Works on mobile, tablet, and desktop

## 🚀 Live Demo

**Play Now:** [https://college-fun-games.vercel.app](https://college-fun-games.vercel.app)

### QR Code
Scan to play:

![QR Code](./qrcode.png)
*(Add your QR code image to the repository)*

## 🛠️ Tech Stack

- **Frontend:** React 19
- **Authentication:** Supabase Auth + Google OAuth
- **Database:** Supabase (PostgreSQL)
- **Deployment:** Vercel
- **Styling:** Custom CSS

## 📋 Game Structure

1. **Level 1** - Introduction challenge
2. **Unlock 1** - Find the cafeteria (clue-based)
3. **Level 2** - Intermediate puzzle
4. **Unlock 2** - Find the library (clue-based)
5. **Level 3** - Advanced challenge
6. **Unlock 3** - Find the entrance (clue-based)
7. **Level 4** - Expert level
8. **Unlock 4** - Find the hot water station (clue-based)
9. **Level 5** - Final challenge
10. **Completion** - View final results and leaderboard

## 🏃 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Supabase account
- Google Cloud Console account (for OAuth)

### Installation

1. Clone the repository
```bash
git clone https://github.com/Boredoom17/college-fun-games.git
cd college-fun-games
```

2. Install dependencies
```bash
npm install --legacy-peer-deps
```

3. Create `.env` file
```env
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run locally
```bash
npm start
```

Visit `http://localhost:3000`

## 🗄️ Database Schema

### Participants Table
```sql
- id (uuid, primary key)
- user_email (text, unique)
- participant_number (integer, unique)
- current_level (integer, default: 1)
- completed_levels (jsonb, default: [])
- created_at (timestamp)
```

## 🔐 Environment Variables

Required environment variables for deployment:

- `REACT_APP_SUPABASE_URL` - Your Supabase project URL
- `REACT_APP_SUPABASE_ANON_KEY` - Your Supabase anonymous key

## 🚢 Deployment

### Deploy to Vercel

1. Install Vercel CLI
```bash
npm i -g vercel
```

2. Deploy
```bash
vercel --prod
```

3. Add environment variables in Vercel dashboard or CLI
```bash
vercel env add REACT_APP_SUPABASE_URL
vercel env add REACT_APP_SUPABASE_ANON_KEY
```

## 🎯 Usage

1. **Scan QR Code** or visit the URL
2. **Sign in with Google**
3. **Start from Level 1**
4. **Solve puzzles** to progress
5. **Find locations** using clues to unlock next levels
6. **Complete all levels** to see your ranking

## 📱 QR Code Setup

Generate a QR code for easy mobile access:
- URL: `https://college-fun-games.vercel.app`
- Recommended size: 300x300px minimum
- Format: PNG or SVG

## 🤝 Contributing

This is a college project, but suggestions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is for educational purposes as part of College Sport Week IT Club Challenge.

## 👨‍💻 Author

**Aadarsha Chhetri** - [Boredoom17](https://github.com/Boredoom17)

## 🙏 Acknowledgments

- IT Club team for organizing Sport Week
- Supabase for the backend infrastructure
- Vercel for hosting
- React community

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

Made with ❤️ for College Sport Week 2026
