function getPatientName(pt) {
    if (pt.name) {
        var names = pt.name.map(function (name) {
            return name.given.join(" ") + " " + name.family.join(" ");
            // return name.given.join(" ") + " " + name.family;
        });
        return names.join(" / ")
    } else {
        return "anonymous";
    }
}

function getMedicationName(medCodings) {
    var coding = medCodings.find(function (c) {
        return c.system == "http://www.nlm.nih.gov/research/umls/rxnorm";
    });

    return coding && coding.display || "Unnamed Medication(TM)"
}

function displayPatient(pt) {
    document.getElementById('patient_name').innerHTML = getPatientName(pt);
}

var med_list = document.getElementById('med_list');

function displayMedication(medCodings) {
    med_list.innerHTML += "<li> " + getMedicationName(medCodings) + "</li>";
}

function displayObservation(observation) {
    var table = document.getElementById("obs_table");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = observation.code.coding[0].code;
    if (observation.code.text) {
        cell2.innerHTML = observation.code.text;
    } else if (observation.code.coding[0].display) {
        cell2.innerHTML = observation.code.coding[0].display;
    };
    if (observation.valueQuantity) {
        cell3.innerHTML = observation.valueQuantity.value;
        cell4.innerHTML = observation.valueQuantity.unit;
    } else if (observation.valueQuantity) {
        cell3.innerHTML = observation.valueQuantity.value;
    } else if (observation.valueCodeableConcept) {
        cell2.innerHTML = observation.valueCodeableConcept.code
        cell3.innerHTML = observation.valueCodeableConcept.value;
    } else if (observation.valueString) {
        cell3.innerHTML = observation.valueString.value;
    } else if (observation.valueBoolean) {
        cell3.innerHTML = observation.alueBoolean.value;
    } else if (observation.valueRange) {
        cell3.innerHTML = observation.valueRange.value;
    } else if (observation.valueRatio) {
        cell3.innerHTML = observation.valueRatio.value;
    } else if (observation.valueSampledData) {
        cell3.innerHTML = observation.valueSampledData.value;
    } else if (observation.valueAttachment) {
        cell3.innerHTML = observation.valueAttachment.value;
    } else if (observation.valueTime) {
        cell3.innerHTML = observation.valueTime.value;
    } else if (observation.valueDateTime) {
        cell3.innerHTML = observation.alueDateTime.value;
    } else if (observation.valuePeriod) {
        cell3.innerHTML = observation.valuePeriod.value;
    };
    if (observation.component) {
        console.log(observation.component.length);
        for (i = 0; i < observation.component.length; i++) {
            table = document.getElementById("obs_table");
            row = table.insertRow(-1);
            cell1 = row.insertCell(0);
            cell2 = row.insertCell(1);
            cell3 = row.insertCell(2);
            cell4 = row.insertCell(3);
            cell1.innerHTML = observation.component[i].code.coding[0].code;
            if (observation.component[i].code.text) {
                cell2.innerHTML = observation.component[i].code.text;
            } else if (observation.component[i].code.coding[0].display) {
                cell2.innerHTML = observation.component[i].display;
            }
            if (observation.component[i].valueQuantity.value) {
                cell3.innerHTML = observation.component[i].valueQuantity.value;
            }
            if (observation.component[i].valueQuantity.unit) {
                cell4.innerHTML = observation.component[i].valueQuantity.unit;
            }
        }
    }
}

FHIR.oauth2.ready(function (smart) {

    // Create a FHIR client (server URL, patient id in `demo`)
    // var smart = FHIR.client(demo),
    var pt = smart.patient;
    console.log("smart.patient", smart.patient);

    // Create a patient banner by fetching + rendering demographics
    smart.patient.read().then(function (pt) {
        displayPatient(pt);
    });

    // A more advanced query: search for active Prescriptions, including med details
    // DSTU2 use MedicationOrder
    // smart.patient.api.fetchAllWithReferences({ type: "MedicationOrder" }, ["MedicationOrder.medicationReference"]).then(function (results, refs) {

    //STU3 uses MedicationRequest
    // smart.patient.api.fetchAllWithReferences({ type: "MedicationRequest" }, ["MedicationRequest.medicationReference"]).then(function (results, refs) {
    //     results.forEach(function (prescription) {
    //         // console.log(prescription);
    //         if (prescription.medicationCodeableConcept) {
    //             displayMedication(prescription.medicationCodeableConcept.coding);
    //         } else if (prescription.medicationReference) {
    //             var med = refs(prescription, prescription.medicationReference);
    //             displayMedication(med && med.code.coding || []);
    //         }
    //     });
    // });

    // smart.patient.api.fetchAll({ type: "Observation" }).then(function (results) {
    //     results.forEach(function (observation) {
    //         console.log(observation);
    //         displayObservation(observation);
    //     });
    // });
});
