# SuperDense Task

## Overview

Collaborative Whiteboard Application

## Features

- **Real-Time Collaboration:** Multiple users can join a shared whiteboard session and see each other's drawings in real time.
- **Create/Join Sessions:** Users can create or join a whiteboard session using a unique room ID.
- **Sketching Tools:**  Users can draw on the whiteboard using various colors and pencil sizes.
- **Save & Load Sessions:** Users can save their whiteboard sessions and load them for later use.
- **User-Friendly Interface:** The application provides an intuitive interface with a color picker and drawing tools.
## Technologies Used

- **ReactJS**
- **NodeJS**
- **MySQL**
- **API Integration**
- **Responsive**

## Project Structure

- **client**: Frontend React application.
- **server**: Backend Node.js application for managing the whiteboard sessions and real-time communication
- **How Applicaation works**![Chart of full application](https://github.com/user-attachments/assets/1e9dddb4-33a1-4b21-9352-50d733b0e5c5)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/tyagi1558/SuprRepoAssig.git
   

2. **Install dependencies:**
  - **Backend (server):** Navigate to the Server folder:
       ```bash
        cd server
  - **Install Backend dependencies:** Install dependencies:
       ```bash
       npm install --force
  - **Start the server:** 
       ```bash
      node server.js || nodemon server.js 
  - **Node version must be Greater then 14V**

   - **Frontend (Client):** Navigate to the client folder:
    
     ```bash
      cd client
 - **Install frontend dependencies:** Install dependencies:
  
    ```bash
      npm install --force
**Start the server:**

   ```bash
   npm start

The server will start on http://localhost:3000 by default.
