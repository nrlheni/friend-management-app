# Friends Management App (Frontend)

This is the frontend application for the Friends Management App, built using **React** and **TypeScript**. It provides functionality for managing Friend Lists, sending and accepting Friend Requests, viewing Blocked Users, and seeing Mutual Friends.

## Prerequisites

Make sure you have the following installed on your machine:
- The backend API service, [friends-management-service](#), should be set up and running.

## Getting Started

Follow these steps to run the project locally:

### 1. Install Dependencies

```bash
npm install
```
### 2. Run the backend service

### 3. Start Development Server

```bash
npm run dev
```

## Features

- **Friend List**: View a list of all your friends and see profile details. In this page you can add/create friend request to anyone (users)
- **Friend Request**: View a list of all the friend requests from another user. You can also Accept or decline the friend requests.
- **Blocks**: View list of all blocks.
- **Mutual Friends**: View mutual friends between users. This feature can found in detail of user
- **User Info**: View information about users, including mutuals, and block action.


## Notes
- You need to move to other tab to refresh the data after do some actions (accept, reject, block)
- If you find the page can't be loaded, then just restart the server and open the url that provided in console/terminal