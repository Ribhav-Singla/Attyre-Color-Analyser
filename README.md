
# Attyre Color Analyser

This repository contains the frontend implementation of the **Attyre Color Analyser** project. The purpose of this project is to allow users to upload an image, extract the dominant color from it, and display the color information. The project demonstrates the ability to work with image processing, color extraction, and responsive UI design.



## Run Locally

Clone the project

```bash
  git clone https://github.com/Ribhav-Singla/Attyre-Color-Analyser.git
```

Go to the project directory

```bash
  cd Attyre-Color-Analyser
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Libraries and Frameworks

**React**: A JavaScript library for building user interfaces.

**Tailwind CSS**: A utility-first CSS framework for creating custom designs with ease.

**Framer Motion**: A library for animations and transitions in React applications.

**React Router DOM**: For handling navigation and routing in the app.

**React Icons**: To use scalable vector icons for the UI.

**Axios**: For making HTTP requests to fetch data (post request).
##  Design Decisions & Assumptions
**Mocked API**: The backend is mocked using a small Express app available at [https://attyre-backend.vercel.app/](https://attyre-backend.vercel.app/). This app only supports GET and POST requests at the root (`/`) endpoint for basic testing and interaction.

**Max Width for Content**: To avoid scattering of content on large screens, the body width is set to a maximum of 1280px. This ensures a consistent layout across different screen sizes.

**Default Colors**: The default colors for skin, hair, and eyes are set when the app starts. However, the user has the ability to change them, allowing for customization of the appearance.

**Font Size**: The font size may differ slightly from the Figma design, and while the font style is not exactly the same as in the Figma file, it can be adjusted in future updates for better alignment.

**Modular Components**: The app uses modular components built with TypeScript for better scaling and maintainability, ensuring a flexible and reusable codebase.

**Image Upload Size Assumption**: It is assumed that users will upload small-sized images, approximately 10MB in size. Larger images may cause performance issues in the app, so it's important to keep the uploads within this size range to ensure smooth functionality. The image URL is saved in `localStorage` and not the image itself, ensuring the data persists even after page reloads.
