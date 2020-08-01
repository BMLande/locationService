
const Location = require('../models/location.model')
var NodeGeocoder = require('node-geocoder');


var geocoder = NodeGeocoder({
    provider: 'opencage',
    apiKey: ''
});

module.exports = {
    /**
    *@AUTHOR : BHAGVAT LANDE ,DATE
    *@DESCRIPTION : ADDA A NEW OUTLER LOCATION IN DB 
    *@CHANGES : DONE_BY ,SUGGETSED_BY , DATE
    **/
    addOutletLocation: async (req, res, next) => {
        const { locationDetails } = req.body;
        let type = "";
        const keyNames = Object.keys(locationDetails);
        keyNames.includes("Point") == true ? type = "Point" : type = "Polygon";
        let coordicatesString = [];
        let coordicatesNumbers = [];
        if (type == "Point") {
            coordicatesString = locationDetails.Point.coordinates.split(",");
            for (loc of coordicatesString) {
                coordicatesNumbers.push(parseFloat(loc))
            }
        } else {
            coordicatesString = locationDetails.Polygon.outerBoundaryIs.LinearRing.coordinates.split(",0\n");
            for (let index = 0; index < coordicatesString.length; index++) {
                let __ss = coordicatesString[index].split(",");
                console.log(parseFloat(__ss[0]), parseFloat(__ss[1]));
                coordicatesNumbers.push([parseFloat(__ss[0]), parseFloat(__ss[1])])
            }
        }

        const outletLocation = new Location({
            "loc.name": locationDetails.name,
            "loc.description": "",
            "loc.type": type,
            "loc.coordinates": [coordicatesNumbers]
        });


        await outletLocation.save();
        return res.status(200).json({
            "status": "success",
            "message": "location added",
            "data": outletLocation
        })


    },


    /**
    *@AUTHOR : BHAGVAT LANDE ,DATE
    *@DESCRIPTION : FINDS NEAREST OUTLET FOR CUTOMER ADDRESS 
    *@CHANGES : DONE_BY ,SUGGETSED_BY , DATE
    *@ALGO : 
    *1>FIND  AND GET COORDINATES FOR CUSTOMER ADDREESS USING OPENCAGEDATA API
    *2>FIND NEAREST OUTLET USING MONGO GEOLOCATION QUERIES
    **/

    FindNearestOutlet: async (req, res, next) => {
        debugger
        const address = req.body.address;
        console.log(address);
        geocoder.geocode(address, async function (err, _res) {
            const lat = _res[0]['latitude'];
            const lon = _res[0]['longitude'];

           const nearestOutletDetails = await Location.findOne({
                "loc":
                {
                    $near:
                    {
                        $geometry: { type: "Point", coordinates: [lon, lat] }
                    }
                }
            })

            res.status(200).json({
                "data": nearestOutletDetails
            })
        });
    }

}
