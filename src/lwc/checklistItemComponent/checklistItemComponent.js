import { LightningElement, api, track, wire } from 'lwc';
import {fireEvent} from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import CHECKLISTITEM_OBJECT from '@salesforce/schema/Checklist_Item__c';
//import getChecklistRecords from '@salesforce/apex/ChecklistCOntroller.getChecklistRecords';
export default class checklistItemComponent extends LightningElement {
    // objectApiName is "Account" when this component is placed on an account record page
    @api objectApiName;
    objectApiName = CHECKLISTITEM_OBJECT;
    @track isModalOpen;
    @track name;
    @api openModal(){
        this.isModalOpen = true;
    }

    @wire(CurrentPageReference) CurrentPageReference;

    @api closeModal() {
        this.isModalOpen = false;
    }

    
    @api recordId;
    handleSuccess(event) {
        const evt = new ShowToastEvent({
            title: "Record created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.recordId = event.detail.id;
        this.dispatchEvent(evt);
        this.closeModal();
        fireEvent(this.CurrentPageReference, "refreshDataTable", this.tableRefresh);
    }
    
    handleCancel(event) {
        console.debug('canellled');
        this.closeModal();
        event.preventDefault();
    }
}
