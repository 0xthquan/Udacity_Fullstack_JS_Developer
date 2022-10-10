# Image Processing API

### Getting Started

    npm install

#### Start the Server

    npm run start

### Using the App
#### Path
`/api/image`

http://localhost:3000/api/image

### Query string parameters

| Query string param    | Description |
|-------------|---------------|
| filename    | Any image available in the `assets/original` folder   |
| width    | Custom image width           |
| height | Custom image height          |

#### Example
http://localhost:3000/api/image?filename=bitcoin&width=900&height=600