trigger ChecklistTrigger on Checklist__c (before insert) {
    if(trigger.isBefore){
        if(trigger.isInsert){
            ChecklistObjectTriggerHandler.beforeInsert(trigger.new);
        }
    }
}