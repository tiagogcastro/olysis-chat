import { serverHttp } from './app';

const port = 3333;
serverHttp.listen(port, () => console.log(`Server is runnig at port ${port}`));