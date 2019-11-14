# Accenture Salesforce Lightning Web Components Assessment
### Choosing a Data Model
There are 2 primary objects created- Checklist and Checklist Items. 
Details of Checklist Object
Custom Fields on Checklist are Name a text field and Type a picklist field with values Development, Testing and Migration. This is the parent of the Checklist Object. Access to the Checklist Items object are decided based on the permission on Checklist Object. If a record on this object is deleted all its child objects are deleted as well.

Details of Checklist Items Object
Custom Fields on Checklist Itesm are Description a text area field, Status a checkbox field and Checklist which a master detail relationship to Checklist Object.

### LWC
There are 4 components used for this assessment.
ChecklistComponent lets the user to create new checklist record on click of the 'New Checklist' Button
ChecklistItemComponent lets the user to create new checklist Item record on click of the 'New Checklist Item' Button
dataTableComponent has all the records created by the user. It also allows the user to view the record, edit the record and delete the record.
MainComponent composes all the above component.
ALl the above components can be readily be used in Salesforce Communities by just dragging and dropping them on the builder.
Whereever possible I have used the standard components provided by Salesforce.

### Apex Controller
ChecklistItemController has a method called getCheckListItems which returns a list of checklist items owned by the logged-in user. 
ChecklistObjectTriggerHandler posses all the trigger logic.

### Apex trigger
ChecklistObjectTrigger fires before the record is inserted and presents the user with an error message preventing the user from creating another Checklist record if he already owns a checklist record.