import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Users } from './entities/User'
import { Exception } from './utils'
import { Todo } from './entities/Todo'

export const createUser = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguos errors, the client needs to understand what went wrong
	if(!req.body.first_name) throw new Exception("Please provide a first_name")
	if(!req.body.last_name) throw new Exception("Please provide a last_name")
	if(!req.body.email) throw new Exception("Please provide an email")
	if(!req.body.password) throw new Exception("Please provide a password")

	const userRepo = getRepository(User)
	// fetch for any user with this email
	const user = await userRepo.findOne({ where: {email: req.body.email }})
    if(user) throw new Exception("Users already exists with this email")
    
    //crear un nuevo todo en la tabla Todo
	const newtodoDefault = getRepository(Todo).create()  
	newtodoDefault.label = "Ejemplo"
    newtodoDefault.done = false;

    const newUser = userRepo.create()
    newUser.first_name = req.body.first_name
    newUser.last_name = req.body.last_name
    newUser.email = req.body.email
    newUser.password = req.body.password
    newUser.todos = [newtodoDefault]
    const results = await userRepo.save(newUser)

    const newtodo = getRepository(Todo).create(todoDefault);
    await getRepository(Todo).save(newtodo);

    return res.json(results);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
		const users = await getRepository(User).find({relations:["todos"]});
		return res.json(users);
}

export const getTodo = async (req: Request, res: Response): Promise<Response> =>{
    const userActual = await getRepository(User).find({where: {id: req.params.id}})
    const todos = await getRepository(Todo).find({relations: ["user"]});
    console.log(todos)
    return res.json(todos);
}