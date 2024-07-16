<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Node.js Backend Application</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            padding: 20px;
        }
        h1, h2, h3 {
            color: #333;
        }
        code {
            background-color: #f0f0f0;
            padding: 2px 4px;
            border-radius: 4px;
            font-size: 0.9em;
        }
        pre {
            background-color: #f0f0f0;
            padding: 10px;
            border-radius: 4px;
            overflow-x: auto;
        }
        .icon {
            width: 30px;
            height: 30px;
            margin-right: 10px;
            vertical-align: middle;
        }
    </style>
</head>
<body>
    <h1>Node.js Backend Application</h1>

    <h2>Objective</h2>
    <p>Create a Node.js API that stores users’ emails and location, and automatically sends hourly weather reports every 3 hours.</p>

    <h2>Requirements</h2>
    <ol>
        <li>The API should have routes to store user details and update users’ locations.</li>
        <li>Use a database like MongoDB to store users and their weather data with the date and time.</li>
        <li>Create a route to get users’ weather data for a given day from the Database.</li>
        <li>Provide a Postman API collection for testing the routes.</li>
        <li>No front end is required.</li>
    </ol>

    <h2>Instructions</h2>
    <ol>
        <li><strong>Set up a Node.js project and install the necessary dependencies</strong>, such as Express and Mongoose.</li>
        <pre><code>npm init -y
npm install express mongoose nodemailer axios</code></pre>

        <li><strong>Create a MongoDB database</strong> and define a schema for storing user details such as email, location, and weather data.</li>

        <li><strong>Use the OpenWeatherMap API</strong> to fetch weather data for the users’ locations.</li>

        <li><strong>Create routes</strong> for:
            <ul>
                <li>Storing user details (<code>POST /users</code>)</li>
                <li>Updating users’ locations (<code>PUT /users/:id/location</code>)</li>
                <li>Retrieving users’ weather data for a given day (<code>GET /users/:id/weather/:date</code>)</li>
            </ul>
        </li>

        <li><strong>Use Nodemailer with Gmail</strong> or another email service to send hourly weather reports to users’ emails every 3 hours.</li>

        <li><strong>Integrate OpenAI or Gemini APIs</strong> to generate a text about the weather and include it in the weather report.</li>

        <li><strong>Use Google Cloud</strong> to get the city name from the coordinates.</li>

        <li><strong>Deploy your application</strong> on Vercel or a similar platform.</li>

        <li><strong>Explain how to deploy this application on AWS</strong> and specify the services used.</li>

        <li><strong>Test the routes</strong> using Postman and provide a Postman API collection for testing.</li>
    </ol>

    <h2>Bonus</h2>
    <ol>
        <li>Add error handling and validation for the routes.</li>
        <li>Implement authentication for the routes.</li>
    </ol>

    <h2>Getting Started</h2>
    <ol>
        <li>Clone this repository.</li>
        <li>Install dependencies:</li>
        <pre><code>npm install</code></pre>
        <li>Set up environment variables for MongoDB connection string, OpenWeatherMap API key, Gmail credentials, etc.</li>
        <li>Start the server:</li>
        <pre><code>npm start</code></pre>
    </ol>

    <h2>API Documentation</h2>
    <ul>
        <li><strong>POST /users</strong>: Create a new user with email and location.</li>
        <li><strong>PUT /users/:id/location</strong>: Update a user's location.</li>
        <li><strong>GET /users/:id/weather/:date</strong>: Get weather data for a user on a specific date.</li>
    </ul>

    <h2>Postman API Collection</h2>
    <p>Download the Postman API collection <a href="link_to_your_postman_collection">here</a>.</p>

    <h2>Technologies Used</h2>
    <ul>
        <li><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/320px-Node.js_logo.svg.png" alt="Node.js" class="icon"> Node.js</li>
        <li><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/320px-HTML5_logo_and_wordmark.svg.png" alt="HTML" class="icon"> HTML</li>
        <li><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/320px-CSS3_logo_and_wordmark.svg.png" alt="CSS" class="icon"> CSS</li>
        <li><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/320px-MongoDB_Logo.svg.png" alt="MongoDB" class="icon"> MongoDB</li>
        <li><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/320px-Unofficial_JavaScript_logo_2.svg.png" alt="JavaScript" class="icon"> JavaScript</li>
    </ul>

    <h2>Deployment</h2>
    <p>Deployed on <a href="https://vercel.com/">Vercel</a> or <a href="https://aws.amazon.com/">AWS</a> (explain your deployment process here).</p>

    <h2>Contributors</h2>
    <ul>
        <li><a href="link_to_your_github_profile">Your Name</a></li>
    </ul>

    <h2>License</h2>
    <p>This project is licensed under the <a href="link_to_your_license_file">MIT License</a>.</p>
</body>
</html>
