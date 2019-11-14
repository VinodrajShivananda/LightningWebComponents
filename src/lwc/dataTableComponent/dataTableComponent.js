import {LightningElement, track, wire} from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import { CurrentPageReference } from 'lightning/navigation'
import { registerListener,unregisterAllListeners } from 'c/pubsub'
// importing apex class methods
import { refreshApex } from '@salesforce/apex';
import getCheckListItems from '@salesforce/apex/ChecklistItemController.getCheckListItems';
// importing to show toast notifictions
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

// importing to refresh the apex if any record changes the datas
// row actions
const actions = [
    { label: 'Record Details', name: 'record_details'}, 
    { label: 'Edit', name: 'edit'}, 
    { label: 'Delete', name: 'delete'}
];

// datatable columns with row actions
const columns = [
    { label: 'Name', fieldName: 'Name' }, 
    { label: 'Description', fieldName: 'Description__c' },
    { label: 'Status', fieldName: 'StatusDone__c', type: 'boolean'}, 
    { label: 'Checklist', fieldName: 'Checklist__r.Name'}, 
    {
        type: 'action',
        typeAttributes: {
            rowActions: actions,
            menuAlignment: 'right'
        }
    }
];

export default class dataTableComponent extends LightningElement { 
    // reactive variable
    @track data;
    @track columns = columns;
    @track record = [];
    @track bShowModal = false;
    @track currentRecordId;
    @track isEditForm = false;
    @track showLoadingSpinner = false;
    @track recId;
    // non-reactive variables
    selectedRecords = [];
    refreshTable;
    error;
    
    @wire(CurrentPageReference) pageRef

    //refresh datatable when new checklistitem is created
    connectedCallback(){
        registerListener("refreshDataTable", this.handleTableRefresh, this);  
    }

    disconnectedCallback(){
        this.showLoadingSpinner = false;
        unregisterAllListeners(this);
    }

    handleTableRefresh(){
        return refreshApex(this.refreshTable);
    }

    handleSuccess() {
        this.showLoadingSpinner = false;
        return refreshApex(this.refreshTable);
    }

    @wire(getCheckListItems)
    wiredResults(result) {
        this.refreshTable = result;
    }

    // retrieving the data using wire service
    @wire(getCheckListItems)
    wiredChecklistItems({ error, data }) {
        //this.refreshTable = data;
        if (data) {
            let checklistItemsArray = [];

            for (let row of data) {
                const flattenedRow = {};

                let rowKeys = Object.keys(row);

                rowKeys.forEach(rowKey => {
                    const singleNodeValue = row[rowKey];

                    if (singleNodeValue.constructor === Object) {
                        //flatten it
                        this._flatten(singleNodeValue, flattenedRow, rowKey);
                    } else {
                        flattenedRow[rowKey] = singleNodeValue;
                    }
                });
                checklistItemsArray.push(flattenedRow);
            }
            this.data = checklistItemsArray;
        } else if (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    }

    _flatten = (nodeValue, flattenedRow, nodeName) => {
        let rowKeys = Object.keys(nodeValue);

        rowKeys.forEach(key => {
            let finalKey = nodeName + '.' + key;
            flattenedRow[finalKey] = nodeValue[key];
        });
    };


    handleRowActions(event) {
        let actionName = event.detail.action.name;

        window.console.log('actionName ====> ' + actionName);

        let row = event.detail.row;

        console.log('row ====> ' + row);

        // eslint-disable-next-line default-case
        switch (actionName) {
            case 'record_details':
                this.viewCurrentRecord(row);
                break;
            case 'edit':
                this.editCurrentRecord(row);
                break;
            case 'delete':
                this.deleteCurrentRecord(row);
                break;
        }
    }

    // view the current record details
    viewCurrentRecord(currentRow) {
        this.bShowModal = true;
        this.isEditForm = false;
        this.recordId = currentRow.Id;
    }

    // closing modal box
    closeModal() {
        this.bShowModal = false;
    }


    editCurrentRecord(currentRow) {
        // open modal box
        this.bShowModal = true;
        this.isEditForm = true;
        // assign record id to the record edit form
        this.currentRecordId = currentRow.Id;
    }

    // handleing record edit form submit
    handleSubmit(event) {
        // prevending default type sumbit of record edit form
        //event.preventDefault();
        this.showLoadingSpinner = true;
        // querying the record edit form and submiting fields to form
        this.template.querySelector('lightning-record-edit-form').submit(event.detail.fields);

        // closing modal
        this.bShowModal = false;

        // showing success message
        this.dispatchEvent(new ShowToastEvent({
            title: 'Success!!',
            message: 'Record updated Successfully!!.',
            variant: 'success'
        }),);
        return refreshApex(this.refreshTable);
    }

    // refreshing the datatable after record edit form success
    
    deleteCurrentRecord(currentRow) {
        this.showLoadingSpinner = true;
        deleteRecord(currentRow.Id)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record deleted',
                        variant: 'success'
                    })
                );
                this.showLoadingSpinner = false;
                return refreshApex(this.refreshTable);
            })
        }
}
