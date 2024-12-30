
# Dynamic Route Handler for uWebSockets.js

This project provides a lightweight and efficient dynamic route handler for `uWebSockets.js`, enabling dynamic `GET` and `POST` request handling based on folder structure. It organizes routes into two distinct folders: `get` and `post`, ensuring clean separation of logic for different HTTP methods.

## Features
- **Dynamic Routing**: Supports dynamic parameters in both folder and file names (e.g., `/users/:id/delete`).
- **Organized Structure**: Separate folders for `GET` and `POST` routes for better code maintainability.
- **Ease of Use**: Automatically reads and registers routes based on folder hierarchy.
- **High Performance**: Built on `uWebSockets.js`, ensuring exceptional speed and scalability.

## Folder Structure
```plaintext
routes/
  get/
    users/
      _id/
        delete.js   # Handles GET requests for /users/:id/delete
      get.js        # Handles GET requests for /users
  post/
    users/
      _id/
        delete.js   # Handles POST requests for /users/:id/delete
    posts/
      create.js     # Handles POST requests for /posts/create
```

## Example Usage
1. **GET /users/:id/delete**  
   This route is handled by `routes/get/users/_id/delete.js`.

2. **POST /posts/create**  
   This route is handled by `routes/post/posts/create.js`.

## How to Use
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the server:
   ```bash
   node server.js
   ```
4. Add your dynamic routes in the `routes/get` and `routes/post` folders.

## Dependencies
- [uWebSockets.js](https://github.com/uNetworking/uWebSockets.js)
- Node.js

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests to enhance functionality or fix bugs.

## License
This project is licensed under the MIT License.
