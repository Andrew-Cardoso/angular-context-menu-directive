import { EventEmitter, Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Style {
  top: string;
  left: string;
  right: string;
  bottom: string;
  transformOrigin: string;
}

interface TemplateRefParams {
  template?: TemplateRef<any>;
  style?: Style;
}

@Injectable({
  providedIn: 'root',
})
export class ContextMenuService {
  templateRef$ = new BehaviorSubject<TemplateRefParams>({});
  close$ = new EventEmitter<void>();

  constructor() {}
}
