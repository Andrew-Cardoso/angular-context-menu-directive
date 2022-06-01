import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ContextMenuService } from '../context-menu.service';

interface Style {
  top: string;
  left: string;
  right: string;
  bottom: string;
  transformOrigin: string;
}

@Component({
  selector: 'app-context-menu-container',
  templateUrl: './context-menu-container.component.html',
  styleUrls: ['./context-menu-container.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animate', [
      state(
        'open',
        style({
          transform: 'scale(1)',
        })
      ),
      state(
        'close',
        style({
          transform: 'scale(0)',
        })
      ),
      transition('close <=> open', animate(100)),
    ]),
  ],
})
export class ContextMenuContainerComponent implements OnInit, OnDestroy {
  @ViewChild('template', { read: ViewContainerRef, static: true })
  private template!: TemplateRef<any>;
  private subscriptions: Subscription[] = [];
  private timeout!: ReturnType<typeof setTimeout>;

  animationState = 'close';

  style: Style = {
    top: '0vh',
    left: '0vw',
    bottom: '100vh',
    right: '100vw',
    transformOrigin: 'center',
  };

  constructor(
    private contextMenuService: ContextMenuService,
    private changeDect: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.contextMenuService.templateRef$.subscribe({
        next: ({ template, style }) => {
          if (this.timeout) clearTimeout(this.timeout);
          (this.template as any).clear();
          if (template) this.template.createEmbeddedView(template);
          if (style) this.style = style;
          this.animationState = 'open';
          this.changeDect.detectChanges();
        },
      }),
      this.contextMenuService.close$.subscribe(() => this.close(1000))
    );
  }

  resetTimeout() {
    if (this.timeout) clearTimeout(this.timeout);
  }

  close(ms = 600) {
    this.resetTimeout();
    this.timeout = setTimeout(() => {
      this.animationState = 'close';
      this.changeDect.detectChanges();
      setTimeout(() => {
        (this.template as any).clear();
      }, 100);
    }, ms);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subs) => subs.unsubscribe());
  }
}
