import { ElementRef } from '@angular/core';
import { MockNativeElement } from './native-element.mock';

export class MockElementRef extends ElementRef {
    constructor() { super(new MockNativeElement()); }
}
