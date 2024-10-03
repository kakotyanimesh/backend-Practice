const z = require('zod')

const signUpObject = z.object({
    email : z.string().email({message : 'provide a valid email address'}),
    password : z.string()
                .min(8, { message: 'Password must be at least 8 characters long.' })
                .max(20, { message: 'Password must not exceed 20 characters.' })
                .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
                .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
                .regex(/[\W_]/, { message: 'Password must contain at least one special character (e.g., !@#$%^&*()_+).' })
                .regex(/[0-9]/, { message: 'Password must contain at least one number.' }),
    username : z.string().min(5, { message : 'username must contains 10 character'}).max(20, {message : 'username must not exceed 20 character'}),
    fullName : z.string()
})


const signinObject = z.object({
    email : z.string().email({message: 'provide a valid email address'}),
    password : z.string()
                .min(8, { message: 'Password must be at least 8 characters long.' })
                .max(20, { message: 'Password must not exceed 20 characters.' })
                .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
                .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
                .regex(/[\W_]/, { message: 'Password must contain at least one special character (e.g., !@#$%^&*()_+).' })
                .regex(/[0-9]/, { message: 'Password must contain at least one number.' }),
})


const courseObject = z.object({
    title : z.string().min(10, {message : 'Min 25 character must'}).max(100, { message : 'Max 50 is allowed for title'}),
    description : z.string().min(30, { message : 'Min 30 char is must'}).max(300, { message : 'max 80 character is allowed in description'}),
    price : z.number()
})


module.exports = {
    signUpObject,
    signinObject,
    courseObject
}