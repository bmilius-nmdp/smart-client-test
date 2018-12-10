var smart = FHIR.client({
    serviceUrl: 'https://r2.smarthealthit.org',
    patientId: 'fdb4e56a-145b-4962-8a54-e056757832aa'
});

console.log("patient : \n", smart.patient);
console.log("user : \n", smart.user);

// Search for the current patient's conditions
// smart.patient.api.search({ type: 'Condition' });

// Search for the current patient's prescriptions
// smart.patient.api.search({ type: 'MedicationOrder' });


