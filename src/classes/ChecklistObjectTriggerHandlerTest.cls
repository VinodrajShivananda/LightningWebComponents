@isTest(SeeAllData=false)
public class ChecklistObjectTriggerHandlerTest {
	@isTest
    static void testMethodToCheckTheException(){
      	User u = new User(
             ProfileId = [SELECT Id FROM Profile WHERE Name = 'Standard User'].Id,
             LastName = 'last',
             Email = 'testUser@gmail.com',
             Username = 'testUser@gmail.com' + System.currentTimeMillis(),
             CompanyName = 'TEST',
             Title = 'title',
             Alias = 'alias',
             TimeZoneSidKey = 'America/Los_Angeles',
             EmailEncodingKey = 'UTF-8',
             LanguageLocaleKey = 'en_US',
             LocaleSidKey = 'en_US'
        );
        test.startTest();
        try{
            System.runAs(u){
                Checklist__c checklistRecord1 = new Checklist__c();
                checklistRecord1.Name = 'TestRecord';
                checklistRecord1.Type__c = 'Development';
                insert checklistRecord1; 
                
                Checklist__c checklistRecord2 = new Checklist__c();
                checklistRecord2.Name = 'TestRecord';
                checklistRecord2.Type__c = 'Testing';
                insert checklistRecord2;
            }
        }
        catch(Exception ex){
            Boolean expectedExceptionThrown =  ex.getMessage().contains('You already own a Checklist') ? true : false;
            system.debug('expectedExceptionThrown val ' + expectedExceptionThrown);
            System.AssertEquals(expectedExceptionThrown, true);               
        }
        test.stopTest();
    }
    @isTest
    static void testMethodToCheckNoException(){
        User u = new User(
             ProfileId = [SELECT Id FROM Profile WHERE Name = 'Standard User'].Id,
             LastName = 'last',
             Email = 'testUser@gmail.com',
             Username = 'testUser@gmail.com' + System.currentTimeMillis(),
             CompanyName = 'TEST',
             Title = 'title',
             Alias = 'alias',
             TimeZoneSidKey = 'America/Los_Angeles',
             EmailEncodingKey = 'UTF-8',
             LanguageLocaleKey = 'en_US',
             LocaleSidKey = 'en_US'
        );
        System.runAs(u){
            test.startTest();
            Checklist__c checklistRecord1 = new Checklist__c();
            checklistRecord1.Name = 'TestCh';
			checklistRecord1.Type__c = 'Development';
            insert checklistRecord1;
        	List<Checklist__c> listOfCheckLists =[select id from Checklist__c where id=: checklistRecord1.id];
            System.assertEquals(1, listOfCheckLists.size());
            test.stopTest();
    	}
    }
}