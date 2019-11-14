public class ChecklistObjectTriggerHandler {
    public static void beforeInsert(List<Checklist__c> newChecklistRecords){
        Integer countOfRecords = [select count() from Checklist__c where CreatedById =: UserInfo.getUserId()];
        if(countOfRecords >= 1){	
            for(Checklist__c checklistIterator: newChecklistRecords){
                checklistIterator.addError('You already own a Checklist');
            }   
        }
    }
}