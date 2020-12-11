//// This function relay the position of a vehicule from transponder toward frontend ////
const TeamModel = require('../db/models/team');

let allPosition = [];

async function transmitVehiculePosition(req, res) {
    let alreadyRecorded = false;
    for (let i = 0; i < allPosition.length; i++) {
        if (allPosition[i].idVehicule === req.body.idVehicule) {
            allPosition[i] = req.body;
            alreadyRecorded = true;
        }
    }
    if (!alreadyRecorded) {
        let newCar = req.body;

        const findedCar = await TeamModel.findOne({ car_id: parseInt(req.body.idVehicule, 10) });

        console.log('CAR>>>>>>>>>>>>>>>', parseInt(req.body.idVehicule, 10));
        if (findedCar.category === "G/H/I") {
            newCar.color = "black"
        } else {
            newCar.color = "red"
        }

        allPosition.push(newCar)
    }
    req.dependencies.socketServer.emit('sendPositionToAll', { allPosition });
    console.log(req.body);
    res.json(req.body)
}

module.exports = transmitVehiculePosition;