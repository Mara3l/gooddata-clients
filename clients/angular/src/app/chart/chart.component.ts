import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import invariant from 'invariant';
import { IInsightViewProps } from '@gooddata/sdk-ui-all';
import tigerFactory, {
  TigerTokenAuthProvider,
} from '@gooddata/sdk-backend-tiger';
import { InsightView } from '@gooddata/sdk-ui-ext';

const backend = tigerFactory()
  .onHostname('<GOODDATA-HOST>') // this should be the domain where the GoodData Cloud or GoodData.CN is hosted
  .withAuthentication(new TigerTokenAuthProvider('<GOODDATA-TOKEN>'));

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponent {
  @Input() workspace: string;

  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID}' not found!`);
    return node;
  }

  protected getProps(): IInsightViewProps {
    const { workspace } = this;
    return {
      workspace,
      insight: '<INSIGHT-ID>',
      backend,
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(
        React.createElement(InsightView, this.getProps()),
        this.getRootDomNode()
      );
    }
  }

  ngOnInit() {
    this.rootDomID = 'gooddata-chart';
  }

  ngOnChanges() {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {
    // Uncomment if Angular issue that ngOnDestroy is called AFTER DOM node removal is resolved
    // ReactDOM.unmountComponentAtNode(this.getRootDomNode())
  }
}
