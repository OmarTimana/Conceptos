import {Router} from 'express'
import { verifySingup } from '../middlewares'
const router= Router()


import * as personCtrl from '../controllers/personaCargo.controller'
import * as authCtrl from '../controllers/auth.controllers'

//ingresar
router.post('/signin', authCtrl.signIn)

//registrar usuarios como super admin
router.post('/registeruser',verifySingup.checkDuplicatedCedorEmail,verifySingup.checkRolesExisted,verifySingup.checkDependenciaExist,
authCtrl.registrarUsuario)



//ruta para crear espacios, primero se verifica si el espacio o no y en base a esto se ejecuta el método crear espacio
router.post('/creardependencia', verifySingup.checkDepExCrear,authCtrl.crearDependencia)

//ruta para crear equipo
router.post('/crearequipo',verifySingup.checkEquipoExist,authCtrl.crearEquipo)

router.post('/creartabla',verifySingup.checkTablaExist,authCtrl.crearTabla)

router.delete('/removequipo/:id',authCtrl.removeEquipo)

router.post('/registerperson', verifySingup.checkDuplicatedCed,personCtrl.registrarPersona)

router.post('/registerfab',authCtrl.crearFabricante)

router.post('/registerdisk',authCtrl.crearDisco)
router.post('/registerproc',authCtrl.crearProcesador)
router.post('/registerefimp',authCtrl.crearRefimp)
router.post('/registeref',authCtrl.crearReferencia)


//ruta para obtener las dependencias
router.get('/dependencias', authCtrl.dependencias)
//ruta para obtener los tipos de espacios físicos
router.get('/tipodependencias',authCtrl.tipoDependencias)
//ruta para obtener los roles
router.get('/roles',authCtrl.roles)

router.get('/peoplecargo',authCtrl.personasCargo)

router.get('/modeqp/:id', authCtrl.updateEquipo)

router.post('/npass',authCtrl.changePassword);
router.get('/getfabs',authCtrl.fabricantes)
router.get('/getdisks',authCtrl.discosduro)
router.get('/getprocs',authCtrl.procesadores)
router.get('/getrefsimp',authCtrl.refsimp)
router.get('/getrefpc',authCtrl.refspc)
router.get('/peoplecargo',authCtrl.personasCargo)
export default router;