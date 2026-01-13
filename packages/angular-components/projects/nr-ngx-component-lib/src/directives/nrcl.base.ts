import { Directive, ElementRef, HostBinding, inject, OnInit } from '@angular/core';

@Directive()
export class NrclBase implements OnInit {
    @HostBinding( 'class' )
    elementClass: string;

    elementRef = inject( ElementRef )

    ngOnInit() {
        const tagName = this.elementRef.nativeElement.tagName

        this.elementClass = `nrcl ${ tagName.toLowerCase() }`
    }
}
