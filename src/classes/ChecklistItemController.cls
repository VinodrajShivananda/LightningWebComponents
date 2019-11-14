public inherited sharing class ChecklistItemController {
    @AuraEnabled(Cacheable = true)
    public static List<Checklist_Item__c> getCheckListItems(){
        return [SELECT Description__c, Name,StatusDone__c, Checklist__r.Name FROM Checklist_Item__c];
    }
}