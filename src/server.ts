import { App } from "./app";

const app = new App();


const PORT = process.env.PORT ; 

app.getApp().listen(PORT,async () => {
     await app.connectDBForServing()
    console.log(`Server is running on port ${PORT}`);
});
