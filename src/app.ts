import  express, {Express,NextFunction, Request, Response} from 'express'
import routes from './books/routes';
import helmet from 'helmet';
const app: Express = express();
app.use(express.json());
app.use(helmet());

const middleware = ({name}:{name: string}) => 
    (req: Request, res: Response, next: NextFunction) => {
        res.locals.name = name;
        console.log(name)
        next();
    };

app.use(middleware({name: "Rj"}));
// routes(app)
app.listen(3000, () => {
    console.log('listening on port 3000');
});