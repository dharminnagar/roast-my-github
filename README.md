# Roast My GitHub

Welcome to **Roast My GitHub**, a fun and quirky web application that generates humorous "roasts" of your GitHub profile! 

This project analyzes your repositories, commit patterns, bio, and more to deliver a playful, tech-flavored roast in Gen Z lingo. Whether you want a mild tease or an extreme burn, we've got you covered—just don’t take it too seriously! 😏

Built with a modern tech stack and a sprinkle of creativity, this app is perfect for developers who want a laugh at their own expense or a reality check on their GitHub game. Built in under 2 days, this project is open for contributions, it’s a community-driven project that’s all about good vibes and coding humor.

---

## ✨ Features

- **Custom Roasts**: Choose your roast intensity (Mild, Medium, Extreme) and length (Short, Medium, Large).
- **GitHub Integration**: Fetches your profile data, README, repos, and contribution stats via the GitHub API.
- **AI-Powered Humor**: Uses Google’s Gemini AI model to craft witty, tech-savvy roasts.
- **Sleek UI**: A responsive, theme-switchable interface with light/dark mode support.
- **Shareable Fun**: Share your roast on X (Twitter) with a single click.
- **Feedback System**: Submit feedback to help improve the app.
- **Database Persistence**: Stores roasts and analytics using Prisma and PostgreSQL.

---

## 🛠️ Tech Stack

[![Next.js](https://img.shields.io/badge/Next.js-11.1.2-000000?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.4.4-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-2.2.19-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-3.9.0-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13.4-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Google Generative AI](https://img.shields.io/badge/Google_Generative_AI-API-4285F4?style=flat-square&logo=google)](https://developers.google.com/generative-ai)

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom components (Shadcn/UI-inspired)
- **AI**: [Google Generative AI (Gemini)](https://developers.google.com/generative-ai) for roast generation
- **Database**: PostgreSQL with [Prisma](https://www.prisma.io/) ORM
- **API**: GitHub API for profile data
- **Frontend Libraries**: 
  - `next-themes` for theme management
  - `sonner` for toast notifications
  - `lucide-react` for icons

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- **Node.js**: v18 or higher
- **npm/yarn/pnpm/bun**: Any package manager will do!
- **PostgreSQL**: A running instance (local or hosted)
- **GitHub Personal Access Token**: For API access
- **Google Generative AI API Key**: For roast generation

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/dharminnagar/roast-my-github.git
   cd roast-my-github

2. **Install Dependencies**:
   ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

3. **Set Environment Variables**:
   Create a .env file in the root directory and populate it with the variables from .env.example (see below).

4. **Setup the Database**: 
   - Ensure your PostgreSQL instance is running.
   - Update the DATABASE_URL in your .env file.
   - Run the Prisma migrations:
        ```bash
        npx prisma migrate dev
        ```
5. **Run the Development Server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```
6. **Open the App**:
    Navigate to `http://localhost:3000` in your browser to view the app.

---

## 📝 Environment Variables
Create a .env file based on the .env.example file. Add your own values for the following variables:
```env
# .env.example

# Server URL (for internal API calls, typically your local/dev/prod URL)
SERVER_URL="http://localhost:3000"

# GitHub API Token (generate from GitHub > Settings > Developer Settings > Personal Access Tokens)
GITHUB_TOKEN="your_github_personal_access_token"

# Google Generative AI API Key (get from Google Cloud Console)
GENAI_API_KEY="your_google_genai_api_key"

# PostgreSQL Database URL
DATABASE_URL="postgresql://username:password@localhost:5432/roast_my_github?schema=public"
```

- SERVER_URL: The base URL of your app (e.g., http://localhost:3000 for dev).

- GITHUB_TOKEN: Required for GitHub API requests. Ensure it has public_repo scope.

- GENAI_API_KEY: Needed for the Gemini AI model to generate roasts.

- DATABASE_URL: Connection string for your PostgreSQL database.

---

## 🤝 Contributing
We’d love your help to make Roast My GitHub even _spicier_! Here’s how to contribute:

1. **Fork** the repository.
2. **Create** a new branch
    ```bash
    git checkout -b feature/cool-new-feature
    ```
3. **Make** your Changes:
    - Add new features, fix bugs, or improve the roasts!
    - Stick to the existing code style (TypeScript, Tailwind, etc.).
    - Update documentation if needed.
4. **Test** your changes
    - Run the app locally and test your new feature.
    - Ensure the app works as expected.
    - Check for any console errors or warnings.
4. **Commit** your changes
    ```bash
    git commit -am 'Add some cool feature'
    ```
5. **Push** to the branch
    ```bash
    git push origin feature/cool-new-feature
    ```
6. **Create a Pull Request**:
    - Go to the original repository and click on the "New Pull Request" button.
    - Add a title and description for your PR.
    - Submit the PR and wait for approval!

### Contribution Ideas
- Add more roast prompts or tweak the existing ones for extra sass.
- Improve UI/UX with new components or animations.
- Enhance GitHub data analysis (e.g., star counts, fork stats).
- Optimize performance or database queries.

---

## 📚 Learn More
- **Next.js**: Check the official [docs](https://nextjs.org/docs) or [interactive tutorial](https://nextjs.org/learn).
- **Prisma**: Learn about the [Prisma ORM](https://www.prisma.io/docs/).
- **Google Generative AI**: Explore the [Generative AI Docs](https://developers.google.com/generative-ai).

---

## 📬 Feedback
Got thoughts? Roast us back! Use the feedback feature in the app or open an issue on GitHub. Let’s keep the vibes lit! 🔥

---

## 📝 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

Happy roasting, fam! No cap, your GitHub’s about to get cooked. 🍳 🔥