
const Joi=require('@hapi/joi')
//register validatio

const registerValidation = (data) =>{

const schema= Joi.object({
    nameRegister:Joi.string().min(4).required(),
    emailRegister:Joi.string().min(8).required().email(),
    passwordRegister:Joi.string().min(4).required()
})
console.log(data)
return schema.validate(data)

}

const loginValidation = (data) =>{
    const schema= Joi.object({
        email:Joi.string().min(8).required().email(),
        password:Joi.string().min(4).required()
    })
    return schema.validate(data.body)
    
    }


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
