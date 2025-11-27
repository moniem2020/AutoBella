# WhatsApp Backend Integration Guide

## 🆓 Free Solution: CallMeBot (Recommended for Vercel Free Tier)

Since you want a **free solution** to receive notifications on **your own WhatsApp** number while hosting on **Vercel Free Tier**, the best option is **CallMeBot**.

**CallMeBot** is a free API that allows you to send WhatsApp messages to yourself. It's perfect for personal notifications like "New Booking Received".

### ✅ Why this works for you:
- **Completely Free**: No credit card required.
- **Works on Vercel**: Uses standard HTTP requests.
- **Simple Setup**: Get an API key in 1 minute.
- **Target Audience**: You (the business owner) receive the messages.

---

## 🛠️ Setup Instructions (Do this now!)

1.  **Add the Bot**: Save this number in your phone contacts: `+34 644 66 32 62` (CallMeBot).
2.  **Send Message**: Open WhatsApp and send this exact text to the number above:
    ```text
    I allow callmebot to send me messages
    ```
3.  **Get API Key**: The bot will reply with your personal `apikey`.
4.  **Configure Vercel**:
    - Go to your Vercel Project Settings.
    - Go to **Environment Variables**.
    - Add a new variable:
        - **Key**: `CALLMEBOT_API_KEY`
        - **Value**: (The key you received from the bot)
    - If running locally, add this to your `.env.local` file:
      ```
      CALLMEBOT_API_KEY=your_received_key_here
      ```

---

## 💻 Code Implementation

I have updated your API routes to use CallMeBot. Once you add the `CALLMEBOT_API_KEY`, it will automatically start working.

### How it works:
1. User submits form on your website.
2. Vercel API Route receives the data.
3. API Route sends a request to CallMeBot.
4. CallMeBot sends the WhatsApp message to **+20 1009441336**.

---

## 🔄 Alternative Free Options

If CallMeBot doesn't work for you, here are other free alternatives:

### 1. Telegram Bot (Most Reliable Free Option)
- **Pros**: 100% free, official API, very reliable, unlimited messages.
- **Cons**: You need to install the Telegram app to receive messages.
- **Setup**: Message `@BotFather` on Telegram to create a bot.

### 2. Email (Nodemailer)
- **Pros**: Free (using Gmail), standard.
- **Cons**: Not as instant as WhatsApp.

---

## 🚀 Deployment to Vercel

1. Push your code to GitHub.
2. Import project in Vercel.
3. **CRITICAL**: Add the `CALLMEBOT_API_KEY` in Vercel Environment Variables.
4. Deploy!
