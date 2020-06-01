import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient } from '../../../../models/patient.model';
import { PatientsService } from '../../../../services/patients/patients.service';

@Component({
    selector: 'app-create-dialog',
    templateUrl: './create-dialog.component.html',
    styleUrls: ['./create-dialog.component.sass']
})
export class CreateDialogComponent implements OnInit {
    // Default Status
    status: string[] = ['Suspect', 'Infected', 'Non Infected'];

    // Default Symptoms
    symptoms: string[] = ['cough',
        'fever',
        'shortness of breathe',
        'lack of smell',
        'lack of taste',
        'tiredness',
        'headaches',
        'diarrhea'
    ];

    // Default Observations
    observations: object[] = [
        { value: 'saude24', label: "Saúde 24" },
        { value: 'riskGroup', label: "Rizk Group" },
        { value: 'riskZone', label: "Risk Zone" }
    ];

    observationsToCreate= {
        saude24: false,
        riskGroup: false,
        riskZone: false,
    };

    currentObservations: any;

    realForm: FormGroup;
    patient: Patient;
    date;
    data: Patient;

    patientForm: FormGroup

    emailPattern = "^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$";

    constructor(private formBuilder: FormBuilder, public patients: PatientsService,
        public dialogRef: MatDialogRef<CreateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
    }


    ngOnInit(): void {

        this.patientForm = this.formBuilder.group({
            'name': ['', [
                Validators.required
            ]],
            'birthdayDate': ['', [
                Validators.required,
            ]],
            'patientNumber': ['', [
                Validators.required,
            ]],
            'status': ['', [
                Validators.required,
            ]],
            'phone': ['', [
                Validators.required,
            ]],
            'email': ['', [
                Validators.required,
                Validators.email,
                Validators.pattern(this.emailPattern)
            ]],
            'symptoms': ['', [
                Validators.required,
            ]],
            'observations': ['', [
                Validators.required,
            ]],
        })
    }


    save() {
        const formDate = new Date(this.patientForm.get('birthdayDate').value)
        this.currentObservations = this.patientForm.get('observations').value;

        for (let element in this.currentObservations) {
            if (this.currentObservations[element] === 'saude24') {
                this.observationsToCreate.saude24 = true;
            }
            if (this.currentObservations[element] === 'riskGroup') {
                this.observationsToCreate.riskGroup = true;
            }
            if (this.currentObservations[element] === 'riskZone') {
                this.observationsToCreate.riskZone = true;
            }
        }


        const formData = {
            name: this.patientForm.get('name').value,
            birthdayDate: new Date(`${formDate.getFullYear()}-${formDate.getMonth() + 1}-${formDate.getDate()}`),
            patientNumber: this.patientForm.get('patientNumber').value,
            status: this.patientForm.get('status').value,
            contacts: {
                phone: this.patientForm.get('phone').value,
                email: this.patientForm.get('email').value,
            },
            symptoms: this.patientForm.get('symptoms').value,
            observations: this.observationsToCreate,
        }
        this.patients.create(formData).subscribe();
        this.dialogRef.close()
    }

    onClose(): void {
        this.dialogRef.close();
    }
}