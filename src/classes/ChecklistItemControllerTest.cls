@isTest(SeeAllData = false)
public class ChecklistItemControllerTest {
	@isTest
    static void testMethod1(){
     test.startTest();
     Checklist__c newChecklist = new Checklist__c();
     newChecklist.Name = 'TestChecklist';
     insert newChecklist;
     Id checklistId = newChecklist.Id;
     List<Checklist_Item__c> newChecklistItems = new List<Checklist_Item__c>();
     for(Integer i = 0; i<= 10; i++){
     	 Checklist_Item__c newCLI = new Checklist_Item__c();
         newCLI.Checklist__c = checklistId;
         newCLI.StatusDone__c  = true;
         newCLI.Description__c = 'Test Description' + i;
         newChecklistItems.add(newCLI);
     }
     insert newChecklistItems;
     List<CheckList_Item__c> returnedItemsList = ChecklistItemController.getCheckListItems();
     System.assertEquals(returnedItemsList.size(), 11);
     system.debug('Assertsize' + returnedItemsList.size());
     test.stopTest();
    }
}