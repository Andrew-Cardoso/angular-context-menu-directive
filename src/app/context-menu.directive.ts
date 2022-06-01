import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  TemplateRef,
} from '@angular/core';
import { ContextMenuService } from './context-menu.service';

@Directive({
  selector: '[appContextMenu]',
})
export class ContextMenuDirective {
  @Input() appContextMenu!: TemplateRef<any>;

  constructor(
    private ref: ElementRef,
    private contextMenuService: ContextMenuService
  ) {}

  @HostListener('mouseenter') mouseenter() {
    const rect = this.ref.nativeElement.getBoundingClientRect();
    const style = this.buildStyle(rect);
    this.contextMenuService.templateRef$.next({
      template: this.appContextMenu,
      style,
    });
  }

  @HostListener('mouseleave') mouseleave() {
    this.contextMenuService.close$.emit();
  }

  private buildStyle = (rect: DOMRect): any => {
    const { innerHeight, innerWidth } = window;
    const topDistance = rect.top;
    const bottomDistance = innerHeight - rect.bottom;
    const leftDistance = rect.left;
    const rightDistance = innerWidth - rect.right;

    const [top, bottom] =
      topDistance < bottomDistance
        ? [rect.top + 'px', 'auto']
        : ['auto', bottomDistance + rect.height + 'px'];
    const [left, right, transformOrigin] =
      leftDistance < rightDistance
        ? [rect.left + 'px', 'auto', 'left']
        : ['auto', rightDistance + rect.width + 'px', 'right'];

    return { top, bottom, left, right, transformOrigin };
  };
}
