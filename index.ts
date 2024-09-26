import exp, {Express} from 'express'
import 'dotenv/config'

import beepercontroller from './src/controllers/beeperController'
// import userController from './src/controllers/userController'
// import aothController from './src/controllers/authController'

const app:Express = exp()
app.use(exp.json())

app.use('/api/beepers',beepercontroller)
// app.use('/user',userController)
// app.use('auth',aothController)
// app.get('/', (req,res) => res.send('Hello Worldwwwwwwww!'))









app.listen(process.env.PORT, ():void =>console.log(`server is listen... ${process.env.PORT}`))