import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    inject,
    Input,
    OnChanges,
    Renderer2,
    SimpleChanges
} from "@angular/core";

@Component({
    selector: "nrcl-form-field",
    template: "<ng-content></ng-content>",
    styleUrl: "./form-field.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.required]': "required",
        '[class.readonly]': "readonly",
    }
})
export class FormFieldComponent implements OnChanges {
    @Input( { transform: booleanAttribute } ) required
    @Input( { transform: booleanAttribute } ) readonly

    element = inject( ElementRef )
    renderer = inject( Renderer2 )

    ngOnChanges( changes: SimpleChanges ): void {
        if ( changes.readonly ) {
            if ( this.readonly ) {
                makeFormFieldReadonly( this.renderer, this.element.nativeElement )
            }
            else {
                makeFormFieldNotReadonly( this.renderer, this.element.nativeElement )
            }
        }
    }
}

function makeFormFieldReadonly(renderer: Renderer2, formFieldEl: HTMLElement) {
    let editableElements;
    //make input element readonly
    let inputHtmlElement: HTMLInputElement;
    editableElements = formFieldEl.getElementsByTagName('input');
    if (editableElements && editableElements.length) {
        inputHtmlElement = editableElements[0];
        setTimeout(() => {
            renderer.setAttribute(inputHtmlElement, "readonly", "readonly");
        });
    }

    //make textarea element readonly
    let textareaHtmlElement: HTMLTextAreaElement;
    editableElements = formFieldEl.getElementsByTagName('textarea');
    if (editableElements && editableElements.length) {
        textareaHtmlElement = editableElements[0];
        setTimeout(() => {
            renderer.setAttribute(textareaHtmlElement, "readonly", "readonly");
        });
    }

    //make select element readonly
    let selectHtmlElement: HTMLSelectElement;
    editableElements = formFieldEl.getElementsByTagName('select');
    if (editableElements && editableElements.length) {
        selectHtmlElement = editableElements[0];
        setTimeout(() => {
            renderer.addClass(selectHtmlElement, "select-read-only-cursor");
            renderer.setAttribute(selectHtmlElement, "readonly", "readonly");
            for (let i = 0; i < selectHtmlElement.options.length; i++) {
                selectHtmlElement.options[i].disabled = true;
            }
        });
    }
}

function makeFormFieldNotReadonly(renderer: Renderer2, formFieldEl: HTMLElement) {
    // renderer.removeClass(formFieldEl, "readonly");
    let editableElements;
    //make input element readonly
    let inputHtmlElement: HTMLInputElement;
    editableElements = formFieldEl.getElementsByTagName('input');
    if (editableElements && editableElements.length) {
        inputHtmlElement = editableElements[0];
        setTimeout(() => {
            renderer.removeAttribute(inputHtmlElement, "readonly");
        });
    }

    //make textarea element readonly
    let textareaHtmlElement: HTMLTextAreaElement;
    editableElements = formFieldEl.getElementsByTagName('textarea');
    if (editableElements && editableElements.length) {
        textareaHtmlElement = editableElements[0];
        setTimeout(() => {
            renderer.removeAttribute(textareaHtmlElement, "readonly");
        });
    }

    //make select element readonly
    let selectHtmlElement: HTMLSelectElement;
    editableElements = formFieldEl.getElementsByTagName('select');
    if (editableElements && editableElements.length) {
        selectHtmlElement = editableElements[0];
        setTimeout(() => {
            renderer.removeClass(selectHtmlElement, "select-read-only-cursor");
            renderer.removeAttribute(selectHtmlElement, "readonly");
            for (let i = 0; i < selectHtmlElement.options.length; i++) {
                selectHtmlElement.options[i].disabled = undefined;
            }
        });
    }
}