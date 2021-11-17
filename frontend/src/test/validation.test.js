import validate from '../validation/TextValidation'
import requirementValidation from '../validation/RequirementValidation'

describe('testing text validation', () => {

    describe('testing email', () => {
        it('testing valid email', () => {
            const email = 'hiroshi@qualime.com'
            expect(validate(email, 'email', []).isValid).toBeTruthy()
            // done()
        })

        it('testing email without @', () => {
            const email = 'hiroshiqualime.com'
            const val = validate(email, 'email', [])
            expect(val.isValid).toBeFalsy()
            expect(val.errorMessage).toEqual("Preencha um email válido")
        })

        it('testing email without .', () => {
            const email = 'hiroshi@qualimecom'
            const val = validate(email, 'email', [])
            expect(val.isValid).toBeFalsy()
            expect(val.errorMessage).toEqual("Preencha um email válido")
        })
    })

    describe('testing date validation', () => {
        it('testing valid date', () => {
            const date = '30/05/1999'
            expect(validate(date, 'date', []).isValid).toBeTruthy()
        })

        it('testing date without /', () => {
            const date = '30051999'
            const val = validate(date, 'date', [])
            expect(val.isValid).toBeFalsy()
            expect(val.errorMessage).toEqual("Preencha uma data válida no formato dd/mm/yyyy")
        })

        it('testing date in format d/mm/yyyy', () => {
            const date = '9/11/2001'
            const val = validate(date, 'date', [])
            expect(val.isValid).toBeFalsy()
            expect(val.errorMessage).toEqual("Preencha uma data válida no formato dd/mm/yyyy")
        })

        it('testing invalid date', () => {
            const date = '29/02/2009'
            const val = validate(date, 'date', [])
            expect(val.isValid).toBeFalsy()
            expect(val.errorMessage).toEqual("Preencha uma data válida no formato dd/mm/yyyy")
        })
    })

    describe('testing float validation', () => {
        it('testing valid float', () => {
            const f = 3.14
            expect(validate(f, 'float', { minValue: 0.5, maxValue: 4.5 }).isValid).toBeTruthy()
        })

        it('testing text instead of float', () => {
            const f = 'asdasdasd'
            const val = validate(f, 'float', { minValue: 0.5, maxValue: 4.5 })
            expect(val.isValid).toBeFalsy()
            expect(val.errorMessage).toEqual("Preencha um número decimal válido")
        })

        it('testing float out of bounds', () => {
            const f = 5.6
            const constraints = { minValue: 0.5, maxValue: 4.5 }
            const val = validate(f, 'float', constraints)
            const message = `Número tem que ser maior que ${constraints.minValue} e menor que ${constraints.maxValue} `
            expect(val.isValid).toBeFalsy()
            expect(val.errorMessage).toEqual(message)
        })
    })

    describe('testing integer validation', () => {
        it('testing valid integer', () => {
            const i = 10
            const constraints = { minValue: 5, maxValue: 14 }
            expect(validate(i, 'int', constraints).isValid).toBeTruthy()
        })

        it('testing text instead of integer', () => {
            const i = 'asdasd'
            const val = validate(i, 'int', { minValue: 5, maxValue: 14 })
            expect(val.isValid).toBeFalsy()
            expect(val.errorMessage).toEqual("Preencha um número inteiro válido")
        })

        it('testing float instead of integer', () => {
            const i = 3.14
            const val = validate(i, 'int', { minValue: 2, maxValue: 14 })
            expect(val.isValid).toBeFalsy()
            expect(val.errorMessage).toEqual("Preencha um número inteiro válido")
        })

        it('testing integer out of bounds', () => {
            const i = 2
            const constraints = { minValue: 5, maxValue: 14 }
            const val = validate(i, 'int', constraints)
            const message = `Número tem que ser maior que ${constraints.minValue} e menor que ${constraints.maxValue} `
            expect(val.isValid).toBeFalsy()
            expect(val.errorMessage).toEqual(message)
        })
    })
})


describe('testing requirement validation', () => {
    const answers = {
        name: {
            type: "text",
            value: "ola"
        },
        telephone: {
            type: "text",
            value: "tudo bem"
        },
        gender: {
            type: "select",
            value: {
                1: "Masculino"
            }
        },
        city: {
            type: "text",
            value: "São Luis"
        },
        email: {
            type: "text",
            value: "qualime"
        },
        birthday: {
            type: "text",
            value: "11111111222"
        }
    }

    const requirements = {
        city: [
            "São Paulo",
            "Rio de Janeiro",
            "Belo Horizonte",
            "Mogi das Cruzes",
            "Taubaté",
            "Curitiba",
            "Natal",
            "Fortaleza",
            "Tubarão"
        ]
    }


    it('testing invalid first page questions', () => {
        const val = requirementValidation(answers, requirements)
        expect(val).toBeFalsy()
    })

    it('testing valid first page questions', () => {
        answers.city = 'São Paulo'
        const val = requirementValidation(answers, requirements)
        expect(val).toBeTruthy()
    })
})