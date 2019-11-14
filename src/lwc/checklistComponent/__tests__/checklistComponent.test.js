import { createElement } from 'lwc';
import checklistComponent from 'c/checklistComponent';
describe('c-checklist-Component', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders lightning-record-edit-form with given input values', () => {
        const HEADER = 'New Checklist'

        // Create initial element
        const element = createElement('c-checklist-Component', {
            is: checklistComponent
        });
        console.log('ele' + element);
        // Set public properties
        element.openModal();
        console.log(document.body.appendChild(element));

        // Query h2 element for header. We use a CSS selector to distinguish
        // between the h2 tag for a header that's set via a public property
        // vs a h2 tag that's set via the slot.
        const headerEl = element.shadowRoot.querySelector(
            'h2[class="slds-text-heading_medium slds-hyphenate"]'
        );
        console.log(headerEl + 'headerEl');
        expect(headerEl.textContent).toBe(HEADER);
    });
});