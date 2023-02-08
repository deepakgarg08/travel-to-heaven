import express,{ Request, Response, NextFunction, json } from 'express'

const app = express();
app.use(json())
const PORT: string | number = process.env.PORT || 3000

app.get('/', (req, res) => res.status(200).send("Hello from Nodejs - Typescript"))


// Global Error Handling at one place
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({message: err.message})
})


try {
  app.listen(PORT, (): void => {
    console.log(`Connected successfully on port ${PORT}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}



