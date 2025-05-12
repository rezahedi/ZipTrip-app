# One Day Planner App (Practicum Project)

This is the frontend part of the **One Day Planner** application — a planning application where users could search for one-day plans or create their own one-day itineraries plans with multiple stops such as parks, museums, cafes, and restaurants. Built with **React**, **Vite.js**, **MUI - Material UI**, **React Router** and **Axios**, this application serves users-generated plans for public, plans are searchable and categorized, and user could sign up or sign in, bookmark plans, or create their own plans from scratch and share it with others.

The **backend team** is developing the API in a separate [repository](https://github.com/Code-the-Dream-School/ii-practicum-team-5-back), using **Express.js**, **MongoDB/Mongoose** and **JWT**.

## About the Advanced Practicum program and Code the Dream

The **[Advanced Practicum program](https://codethedream.org/classes/practicum/)** at **Code the Dream** is an 8–10 week hands-on experience where a team of 4-6 students work in teams to build real-world software using Agile practices, GitHub, and project management tools. It’s designed to bridge the gap between learning and working in a professional tech environment.

**[Code the Dream](https://codethedream.org)** is a nonprofit offering free, remote advanced coding classes to people from diverse backgrounds, aiming to make tech careers more accessible and inclusive.

Special thanks to **Code the Dream** and all the **volunteer mentors** for giving us the opportunity to grow, and gain valuable experience in a supportive and inclusive environment. 🙏🏽

---

## 📦 Getting Started

### Backend

To deploy this app locally, find our [backend codebase here](https://github.com/Code-the-Dream-School/ii-practicum-team-5-back), clone the repository locally and follow the setup instructions, then run it.

### Frontend Environment Setup

To run the project locally, create a `.env` file in the root directory or use the `.env.example` file by renaming it and define the following variable:

```
VITE_API_BASE_URL=http://localhost:8000
VITE_GOOGLE_MAP_API_KEY=<Google-map-api-key>
```

### Google Maps Platform API Key

Running the project locally requires a valid API key for the Google Maps Platform. See the official documentation on how to create and configure your own key. For this project to work you also need to enable both `Maps JavaScript API` and `Places API` in your Google Cloud Console.

### Installing

Now install the packages by running `npm install` then run the frontend server with `npm run dev` and test it in your browser.
