# ZipTrip - One Day Planner App

<img width="1352" height="955" alt="Screenshot 2025-10-17 145819" src="https://github.com/user-attachments/assets/3773d607-f160-4ad4-a4d5-88518d649f2d" />

This is the frontend part of the **ZipTrip** application, a planning application where users could search for one-day plans or create their own itineraries plans with multiple stops such as parks, museums, cafes, and restaurants. Built with **React**, **Vite.js**, **shadcn/ui**, **React Router**, this application serves users-generated plans for public, plans are searchable and categorized, and user could sign up or sign in, bookmark plans, or easily create their own plans from scratch and share it with others.

The **backend API** is on a seperate [repo](https://github.com/rezahedi/ZipTrip-api) and developed using **Express.js**, **MongoDB/Mongoose** and **JWT** and etc.

The app idea started when I joined the **[Advanced Practicum program](https://codethedream.org/classes/practicum/)** at **Code the Dream** a 8–10 week hands-on program where a team of 4-6 students work in teams to build real-world software using Agile practices. After building the MVP I forked the project, refactored, changed some tech stacks, polished and added many features specially all the Google Map related features.

<img width="1352" height="882" alt="Screenshot 2025-10-17 150047" src="https://github.com/user-attachments/assets/7a4bebd7-707a-4270-8e6a-57f89f67308f" />

---

## 📦 Getting Started

### Backend

To deploy this app locally, find our [backend codebase here](https://github.com/rezahedi/ZipTrip-api), clone the repository locally and follow the setup instructions, then run it.

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
