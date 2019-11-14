import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import CHECKLIST_OBJECT from '@salesforce/schema/Checklist__c';
export default class checklistComponent extends LightningElement {
    // objectApiName is "Checklist__c"
    @api objectApiName;
    objectApiName = CHECKLIST_OBJECT;
    @track isModalOpen;
    @api recordId;

    @api openModal(){
        this.isModalOpen = true;
    }
    
    @api closeModal(){
        this.isModalOpen = false
    }

    handleError() {
        const evt = new ShowToastEvent({
            title: "",
            message: "You already own a Checklist",
            variant: "error"
        });
        this.dispatchEvent(evt);
    }
    //shows toast message on successful record save
    handleSuccess(event) {
        const evt = new ShowToastEvent({
            title: "Record created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(evt);
        this.closeModal();
    }
    //handles cancel action
    handleCancel(event) {
        this.closeModal()
        event.preventDefault();
    }
}
