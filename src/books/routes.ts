import {Express, Request, Response, NextFunction} from 'express'

function routes(app: Express){
    app.get('/api/books/test', async (req: Request< {}, {name: string}, {}, {}>, res: Response, next: NextFunction) => {
        try {
            console.log("hi");
            console.log(req.body);  
            return res.send("hi");
        }
        catch(e){
            console.log(e)
            res.status(500).send(e + " | Error code 500")
        }

        
    });
};

export default routes;

